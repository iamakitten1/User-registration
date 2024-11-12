import React, { useState } from 'react';
import BaseFormElement from '../BaseFormElement';
import { useNavigate } from 'react-router-dom'; // React Router-ისთვის

const AdminForm = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Redirect ფუნქციისთვის

    const fields = [
        { name: 'firstName', label: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', required: false },
        { name: 'pid', label: 'PID', required: true },
        { name: 'phoneNumber', label: 'Phone Number', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'profileImage', label: 'Profile Image', type: 'file', required: false }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ფორმის განახლების თავიდან ასარიდებლად

        try {
            const response = await fetch('https://your-api-endpoint.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Registration failed!');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // შენახვა ტოკენის
            navigate('/AdminDashbooard'); // გადამისამართება დაშბორდზე
        } catch (error) {
            console.error(error);
            setErrors({ form: 'Registration failed. Please try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <BaseFormElement fields={fields} onChange={handleChange} values={values} errors={errors} />
            <button type="submit">Register</button>
            {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
        </form>
    );
};

export default AdminForm;
