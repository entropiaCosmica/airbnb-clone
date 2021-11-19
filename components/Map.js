import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react'
import { getCenter } from 'geolib'

function Map({ searchResults }) {
  const coordinates = searchResults.map(({ long, lat }) => ({
    longitude: long,
    latitude: lat
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 8
  })

  const [selectedLocation, setSelectedLocation] = useState({})

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/gelatina/ckw6huub30ixf14mbsk2zpj8e"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((location) => (
        <div key={location.long}>
          <Marker
            longitude={location.long}
            latitude={location.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(location)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>
          {selectedLocation.long === location.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={location.lat}
              longitude={location.long}
            >
              {location.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))
      }
    </ReactMapGL >
  )
}

export default Map
