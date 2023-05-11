import { useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const GMapAutoComplete = (props) => {
  const { bounds, setMapAddress, mapAddressError } = props;
  // var strictBounds = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(49.90878, -7.69042),
  //   new google.maps.LatLng(60.8877, -0.83496),
  // );
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: {
        country: ['vn'],
      },
      region: 'vn',
      language: 'vi',
      locationRestriction: bounds,
      // bounds: bounds,
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    setMapAddress(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setMapAddress(description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('📍 Coordinates: ', { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li className="py-2 px-3 hover:bg-gray-100 cursor-pointer" key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div className="relative">
      <input
        value={value}
        onChange={handleInput}
        // disabled={!ready}
        disabled={ready ? (bounds ? false : true) : true}
        placeholder="Địa chỉ nhận hàng"
        className={` w-full h-[47px] ${mapAddressError ? 'mb-[5px]' : 'mb-[20px]'} ${
          bounds ? '' : 'cursor-not-allowed'
        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <ul className="bg-white shadow-md absolute w-full top-12 rounded-[5px]">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default GMapAutoComplete;
