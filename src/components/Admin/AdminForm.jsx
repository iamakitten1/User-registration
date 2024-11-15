import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const fields = [
        { name: 'firstName', label: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', required: false },
        { name: 'pid', label: 'PID', required: true },
        { name: 'phoneNumber', label: 'Phone Number', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'profileImage', label: 'Profile Image', type: 'file', required: false },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://crudapi.co.uk/api/v1/admins';  // URL endpoint for creating admin

        try {
            // Log values for debugging
            console.log('Submitting values:', values);

            // Prepare the data to send to the API
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            // Send the POST request
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    // 'Authorization': `Bearer ${yourToken}`,
                },
                body: JSON.stringify({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    pid: values.pid,
                    phoneNumber: values.phoneNumber,
                    email: values.email,
                    password: values.password,
                    // profileImage is optional, check if it's present
                    profileImage: values.profileImage,
                }),
            });

            // Parse the response data
            const data = await response.json();

            // Handle unsuccessful registration
            if (!response.ok) {
                setErrors({ form: data.message || 'Registration failed! Please try again.' });
                return;
            }

            // If successful, store the token and navigate to the dashboard
            localStorage.setItem('token', data.token);
            navigate('/admin-dashboard');
        } catch (error) {
            console.error('Error submitting registration:', error);
            setErrors({ form: 'Registration failed. Please try again.' });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
        >
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Admin Registration
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
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type || 'text'}
                            required={field.required}
                            value={values[field.name] || ''}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
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

export default AdminForm;
