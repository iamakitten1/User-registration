
import React, { useState } from 'react';

const BaseFormElement = ({ fields, onSubmit }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type || 'text'}
            name={field.name}
            onChange={handleChange}
            className="border p-2"
          />
          {errors[field.name] && <p className="text-red-500">{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default BaseFormElement;
