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
        { name: 'vehicle', label: 'Vehicle', required: true }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
// ფუნქცია განაახლებს workingDays მასივს. თითოეული ველის ცვლილებისას, შესაბამისი ობიექტი განახლდება.
    const handleWorkingDayChange = (index, field, value) => {
        const newWorkingDays = [...workingDays];
        newWorkingDays[index][field] = value;
        setWorkingDays(newWorkingDays);
    };
    // ამატებს ახალ სამუშაო დღის ველს, მაგრამ არაუმეტეს 7-ს
    const addWorkingDay = () => {
        if (workingDays.length < 7) { // შეზღუდვა, რომ მხოლოდ კვირის 7 დღეზე ნაკლები დაემატოს
            setWorkingDays([...workingDays, { day: '', startHours: '', endHours: '' }]);
        }
    };
    // ამოწმებს, რომ მინიმუმ 5 სამუშაო დღე შევსებულია ვალიდურად.
    const validateForm = () => {
        const filledDays = workingDays.filter(day => day.day && day.startHours && day.endHours);
        if (filledDays.length < 5) {
            setErrors(prevErrors => ({
                ...prevErrors,
                workingDays: 'Please fill out at least 5 working days.'
            }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, workingDays: '' }));
        }
    };

    return (
        <div>
            <BaseFormElement fields={fields} onChange={handleChange} values={values} errors={errors} />
{/*  სამუშაო საათების დაწყების და დასრულების დროზე ინფორმაციას. */}
            <h3>Working Days</h3>     
            {workingDays.map((day, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <select
                        value={day.day}
                        onChange={(e) => handleWorkingDayChange(index, 'day', e.target.value)}
                        required
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
                    >
                        <option value="">Start Time</option>
                        {[...Array(48)].map((_, i) => {
                            const hour = String(Math.floor(i / 2)).padStart(2, '0');
                            const minutes = i % 2 === 0 ? '00' : '30';
                            return <option key={i} value={`${hour}:${minutes}`}>{`${hour}:${minutes}`}</option>;
                        })}
                    </select>

                    <select
                        value={day.endHours}
                        onChange={(e) => handleWorkingDayChange(index, 'endHours', e.target.value)}
                        required
                    >
                        <option value="">End Time</option>
                        {[...Array(48)].map((_, i) => {
                            const hour = String(Math.floor(i / 2)).padStart(2, '0');
                            const minutes = i % 2 === 0 ? '00' : '30';
                            return <option key={i} value={`${hour}:${minutes}`}>{`${hour}:${minutes}`}</option>;
                        })}
                    </select>
                </div>
            ))}
            {errors.workingDays && <span style={{ color: 'red' }}>{errors.workingDays}</span>}
            
            <button type="button" onClick={addWorkingDay}>+ Add Working Day</button>
            <button type="button" onClick={validateForm}>Submit</button>
        </div>
    );
};

export default CourierForm;

