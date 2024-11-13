import React, { useState, useEffect } from 'react';

const UserForm = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [location, setLocation] = useState({ lng: '', lat: '' });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
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
        { name: 'address', label: 'Address (Lng, Lat)', required: true, value: `${location.lng}, ${location.lat}` },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <form className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                User Registration
            </h1>
            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            {field.label}
                        </label>
                        {field.name === 'address' ? (
                            <input
                                id={field.name}
                                type="text"
                                name={field.name}
                                value={field.value || ''}
                                readOnly
                                className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 bg-gray-100"
                            />
                        ) : (
                            <input
                                id={field.name}
                                type={field.type || 'text'}
                                name={field.name}
                                required={field.required}
                                onChange={handleChange}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        )}
                    </div>
                ))}
            </div>
            {errors.form && (
                <p className="mt-4 text-red-500 text-sm text-center">
                    {errors.form}
                </p>
            )}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-6"
            >
                Register
            </button>
        </form>
    );
};

export default UserForm;
