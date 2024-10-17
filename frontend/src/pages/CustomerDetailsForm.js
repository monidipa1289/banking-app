import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDetailsForm.css";

const CustomerDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const payload = {
      Cust_name: formData.name,
      Phone_number: formData.phone,
      Location: formData.location,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addCustomer",
        payload
      );

      if (response.status === 201) {
        alert("Customer details submitted successfully!");
      } else {
        alert("Failed to submit customer details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>Customer Details Form</header>
        <div>
          <label>Customer name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
