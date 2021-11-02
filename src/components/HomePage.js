import logolocation from '../logolocation.png'
import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from "@reach/combobox";


import "@reach/combobox/styles.css";
import { format } from 'date-fns';
const libraries = ["places"];
const mapContainerStyle = {
  height: "100vw",
  width: "100vw",
};

const options = {
  mapId: 'b154b0fd351ffa30',
  disableDefaultUI: true,
  zoomControl: true
};
export let clickedEvents = [];
const HomePage = ({ event, auth, events, ...props }) => {     
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBUR6P5mafV5z890WK7o9RIJnOHKIsVIwE",
    libraries,
  });
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
    setSelectedPlace(place);
    if (infoOpen) {
      setInfoOpen(false);
    }
    else
      setInfoOpen(true);
    if (zoom < 13) {
      setZoom(13);
    }
  };
  
  const handleOnLoad = (map) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );


    }

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  if (!auth.uid) return <Redirect to='/' />
  return (
    <>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={handleOnLoad}

      >
        <Search panTo={panTo} />
        <Locate panTo={panTo} />

        {events.map(place => (
          format(new Date(), 'yyyy-MM-dd') != place.startDate ? null :
            place.freeTraining ?
              <Marker
                key={place.id}
                position={place.pos}
                onLoad={marker => markerLoadHandler(marker, place)}
                onClick={(event) => markerClickHandler(event, place)}
                //https://www.shareicon.net/data/512x512/2015/09/21/644104_sport_512x512.png
                // https://static.thenounproject.com/png/777035-200.png
                //https://static.thenounproject.com/png/777025-200.png
                // https://images.vexels.com/media/users/3/141359/isolated/lists/4aff80f43aa783ac5071aace4a4e0c3a-triathlon-square-icon.png
                icon={{
                  url: 'https://www.shareicon.net/data/512x512/2015/09/21/644104_sport_512x512.png',
                  scaledSize: new window.google.maps.Size(40, 40), // scaled size
                }}
              /> :
              <div>
                <Marker
                  key={place.id}
                  position={place.pos}
                  onLoad={marker => markerLoadHandler(marker, place)}
                  onClick={(event) => markerClickHandler(event, place)}
                  //https://www.shareicon.net/data/512x512/2016/01/26/709382_bank_512x512.png
                  //https://static.thenounproject.com/png/1380878-200.png
                  icon={{
                    url: 'https://www.shareicon.net/data/512x512/2016/01/26/709382_bank_512x512.png',
                    scaledSize: new window.google.maps.Size(35, 40), // scaled size
                  }}
                />
              </div>
        ))}
        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div style={{ height: 'auto' }}>
              <div style={{ height: '50%' }}  >
                {(!selectedPlace.freeTraining) ?
                  <div>
                    <span class="input-group-text" style={{ height: 'auto', width: 'auto' }}>
                      <i className="fas fa-comment-dollar"></i>
                      <i style={{ marginLeft: '2%' }}>Costs Money</i>
                    </span>
                  </div> : null}
                <h3>{selectedPlace.eventName}</h3>
              </div>
              <p>Autor Name: {selectedPlace.authorName} </p>
              <p>Time: {selectedPlace.startWorkOut}-{selectedPlace.endWorkOut} </p>
              <p>Date: {selectedPlace.startDate} </p>
              <p>Descrption: {selectedPlace.description}</p>
              <p>Number Of Participants: {selectedPlace.numberOfParticipants}</p>
              <p>Min Age: {selectedPlace.minAge}</p>
              {(selectedPlace.authorId != auth.uid) ?
                <div style={{display:"flex",width:'100px'}}>
                  <a
                    href={`https://wa.me/${selectedPlace.phone}`}
                    class="whatsapp_float"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <div class="callus">
                    <a style={{marginLeft:"8px"}} href={`tel:${selectedPlace.phone}`}>
                      <i class="fa fa-phone fab" ></i>
                    </a>
                  </div>
                </div>
                : null}
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
    <div  class="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput 
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search a location"
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
            minAge: events[key].minAge,
            phone: events[key].phone,
            freeTraining: events[key].freeTraining,
            startDate: events[key].startDate,
            endWorkOut: events[key].endWorkOut
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






