import React, { useState, useEffect } from 'react';

const AddressForm = () => {
    const [address, setAddress] = useState('');
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById("address-input"));
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    setLng(place.geometry.location.lng());
                    setLat(place.geometry.location.lat());
                    setAddress(place.formatted_address); 
                }
            });
        }
    }, []);

    return (
        <div>
            <label htmlFor="address-input">Address</label>
            <input
                id="address-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2"
            />
            <div>
                <label>Longitude: </label>
                <input
                    type="text"
                    value={lng}
                    readOnly
                    className="border p-2"
                />
                <label>Latitude: </label>
                <input
                    type="text"
                    value={lat}
                    readOnly
                    className="border p-2"
                />
            </div>
        </div>
    );
};

export default AddressForm;
