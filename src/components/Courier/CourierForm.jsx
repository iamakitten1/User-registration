import React, { useState } from 'react';
import BaseFormElement from '../BaseFormElement';

const CourierForm = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [workingDays, setWorkingDays] = useState([{ day: '', startHours: '', endHours: '' }]);

    const fields = [
        { name: 'firstName', label: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', required: false },
        { name: 'pid', label: 'PID', required: true },
        { name: 'phoneNumber', label: 'Phone Number', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'profileImage', label: 'Profile Image', type: 'file', required: false },
        { name: 'vehicle', label: 'Vehicle', required: true },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleWorkingDayChange = (index, field, value) => {
        const newWorkingDays = [...workingDays];
        newWorkingDays[index][field] = value;
        setWorkingDays(newWorkingDays);
    };

    const addWorkingDay = () => {
        if (workingDays.length < 7) {
            setWorkingDays([...workingDays, { day: '', startHours: '', endHours: '' }]);
        }
    };

    const validateForm = () => {
        const filledDays = workingDays.filter(day => day.day && day.startHours && day.endHours);
        if (filledDays.length < 5) {
            setErrors(prevErrors => ({
                ...prevErrors,
                workingDays: 'Please fill out at least 5 working days.',
            }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, workingDays: '' }));
        }
    };

    return (
        <form className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Courier Registration
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
                            type={field.type || 'text'}
                            name={field.name}
                            required={field.required}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Working Days</h3>
                {workingDays.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 mb-4 border p-4 rounded-md"
                    >
                        <select
                            value={day.day}
                            onChange={(e) => handleWorkingDayChange(index, 'day', e.target.value)}
                            required
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        >
                            <option value="">Select Day</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                        <select
                            value={day.startHours}
                            onChange={(e) => handleWorkingDayChange(index, 'startHours', e.target.value)}
                            required
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        >
                            <option value="">Start Time</option>
                            {[...Array(48)].map((_, i) => {
                                const hour = String(Math.floor(i / 2)).padStart(2, '0');
                                const minutes = i % 2 === 0 ? '00' : '30';
                                return (
                                    <option key={i} value={`${hour}:${minutes}`}>
                                        {`${hour}:${minutes}`}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            value={day.endHours}
                            onChange={(e) => handleWorkingDayChange(index, 'endHours', e.target.value)}
                            required
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        >
                            <option value="">End Time</option>
                            {[...Array(48)].map((_, i) => {
                                const hour = String(Math.floor(i / 2)).padStart(2, '0');
                                const minutes = i % 2 === 0 ? '00' : '30';
                                return (
                                    <option key={i} value={`${hour}:${minutes}`}>
                                        {`${hour}:${minutes}`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                ))}
                {errors.workingDays && (
                    <p className="text-red-500 text-sm">{errors.workingDays}</p>
                )}
                <button
                    type="button"
                    onClick={addWorkingDay}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mt-4"
                >
                    + Add Working Day
                </button>
            </div>
            <button
                type="button"
                onClick={validateForm}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-6"
            >
                Submit
            </button>
        </form>
    );
};

export default CourierForm;
