import React, { useState, useEffect } from 'react';

const UserForm = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [location, setLocation] = useState({ lng: '', lat: '' }); // Geolocation state

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Get user's geolocation (lng and lat)
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Geolocation error: ", error);
                }
            );
        }
    }, []);

    const fields = [
        { name: 'firstName', label: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', required: false },
        { name: 'pid', label: 'PID', required: true },
        { name: 'phoneNumber', label: 'Phone Number', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'profileImage', label: 'Profile Image', type: 'file', required: false },
        { name: 'address', label: 'Address (Lng, Lat)', required: true, value: `${location.lng}, ${location.lat}` }, // Displaying the geolocation
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <form>
            {fields.map((field) => (
                <div key={field.name}>
                    <label>{field.label}</label>
                    {field.name === 'address' ? (
                        // Display the current geolocation (lng, lat) in the address field
                        <input
                            type="text"
                            name={field.name}
                            value={field.value || ''}
                            readOnly
                            className="border p-2"
                        />
                    ) : (
                        <input
                            type={field.type || 'text'}
                            name={field.name}
                            onChange={handleChange}
                            className="border p-2"
                        />
                    )}
                </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
        </form>
    );
};

export default UserForm;
