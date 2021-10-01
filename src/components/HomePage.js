import logolocation from '../logolocation.png'
import React, { useEffect, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { firestoreConnect, firebase } from 'react-redux-firebase';
import { compose } from 'redux';

import { formatRelative } from 'date-fns'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const libraries = ["places"];
const mapContainerStyle = {
  height: "100vw",
  width: "100vw",
};
const options = {
  mapId: 'b154b0fd351ffa30',
  disableDefaultUI: true,
  zoomControl: true,
};

export let clickedEvents = [];

const HomePage = ({ event, auth, events, ...props }) => {
  console.log(auth.displayName);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBUR6P5mafV5z890WK7o9RIJnOHKIsVIwE",
    libraries,
  });

  const [mapRef, setMapRef] = useState(null);
  const [center, setCenter] = useState({
    lat: 32.085300,
    lng: 34.781769,
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);






  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    events.map(place => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const panTo = useCallback(({ lat, lng }) => {
    setCenter({ lat, lng })
  }, []);

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);
    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    // setCenter(place.pos)
  };

  const handleOnLoad = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);

  };



  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  if (!auth.uid) return <Redirect to='/' />

  const handleJoin = (clickEvent) => {
    // console.log(auth);
    // console.log(clickEvent);

    events.map(e => {
      if (e.id == clickEvent.id) {
        props.firestore.collection('events').doc(e.id).update({
          "numberOfParticipants": [...e.numberOfParticipants, auth.uid]

        })
      }
    })
  }
  return (
    <>
      <Search panTo={panTo} />
      <Locate  panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={handleOnLoad}

      >
        {events.map(place => (
          <Marker
            key={place.id}
            position={place.pos}
            onLoad={marker => markerLoadHandler(marker, place)}
            onClick={(event) => markerClickHandler(event, place)}
            // Not required, but if you want a custom icon:
            icon={{
              path:
                "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
              fillColor: "#0000ff",
              fillOpacity: 1.0,
              strokeWeight: 0,
              scale: 1.25
            }}
          />
        ))}
        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div>
              <h3>{selectedPlace.eventName}</h3>
              <p>התחלה: {selectedPlace.startWorkOut} </p>
              <p>תיאור: {selectedPlace.description}</p>
              <p>מספר משתתפים: {selectedPlace.numberOfParticipants.length}</p>
              <p>גיל מינימום: {selectedPlace.minAge}</p>
              {(selectedPlace.authorId != auth.uid) ? <button onClick={() => handleJoin(selectedPlace)}>Join Me</button> : null}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}
function Locate({ panTo }) {
  return (
    <button 
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={logolocation} alt="mylocation" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 32.085300, lng: () => 34.781769 },
      radius: 200 * 1000,


    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div class="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (

              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
const mapStateToProps = (state) => {

  const { events } = state.firestore.data
  console.log(events);
  let tempEvents = [];
  if (events) {
    for (let key in events) {
      if (events[key].location)
        tempEvents.push(
          {
            id: key,
            authorId: events[key].authorId,
            authorName: events[key].authorName,
            eventName: events[key].eventName,
            description: events[key].description,
            pos: { lat: events[key].location.latmap, lng: events[key].location.lngmap },
            startWorkOut: events[key].startWorkOut,
            numberOfParticipants: events[key].numberOfParticipants,
            minAge: events[key].minAge
          }
        )
    }
  }
  return {
    auth: state.firebase.auth,
    events: tempEvents || []


  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'events' }
  ])
)(HomePage)






