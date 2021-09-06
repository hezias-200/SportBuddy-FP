import logolocation from '../logolocation.png'
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


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
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from './mapStyles'

const libraries = ["places"];
const mapContainerStyle = {
  height: "80vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 32.085300,
  lng: 34.781769,
};
const f=[]
function HomePage(props) {


  const { events } = props;

  // for (const [key, value] of Object.entries(events.events)) {
  //   f[key]['location']=events.events[key].location;
  // }
  // for (var key in events.events) {
  //    f[key]= events.events[key].location{
  //      latmap:events.events[key].location.latmap,
  //      lngmap:events.events[key].location.lngmap

  //     }
  // }
  // console.log(f);
  const [markers, setMarkers] = React.useState({
  });


  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBUR6P5mafV5z890WK7o9RIJnOHKIsVIwE",
    libraries,
  });

  const [selected, setSelected] = React.useState(null);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);



  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const { auth } = props;
  if (!auth.uid) return <Redirect to='/' />

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    f.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };


  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={handleOnLoad}

      >
        {/* {f.map((marker) => (
          
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              iconUrl: { logolocation },
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )) }

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null} */}
        {f.map((x)=>{
          console.log(x.latmap);
          <Marker
          position={x}/>
        }) }
      </GoogleMap>
    </div>
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
    <div className="search">
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
  return {
    auth: state.firebase.auth,
    events: state.firestore.ordered

  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'events' }
  ])
)(HomePage)