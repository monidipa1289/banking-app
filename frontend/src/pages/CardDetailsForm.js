import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardDetailsForm = () => {
  const [options, setOptions] = useState([]); // For customer options
  const [selectedOption, setSelectedOption] = useState(""); // For selected customer
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardType: "",
    maxLimit: "",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/customer"
        ); // Replace with your actual GET API endpoint
        console.log("🚀 ~ fetchOptions ~ response:", response.data);

        // Assuming the response contains an array of customers
        setOptions(response.data.data);
      } catch (error) {
        console.error("Error while fetching customer data: ", error);
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare data to be submitted
    const dataToSubmit = {
      Cust_id: selectedOption,
      card_number: formData.cardNumber,
      card_type: formData.cardType,
      max_limit: formData.maxLimit,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addCard",
        dataToSubmit
      ); // Replace with your actual POST API endpoint
      console.log("Form submission success:", response.data);
      alert("Account details submitted successfully!");
    } catch (error) {
      console.error("Error while submitting form data:", error);
      alert("Failed to submit account details.");
    }
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>Card Details Form</header>
        <div>
          <label>Select Customer</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            required
          >
            <option value="">Select option</option>
            {options.map((option, index) => (
              <option key={index} value={option.Cust_id}>
                {option.Cust_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Card Number</label>
          <input
            type="number"
            name="cardNumber"
            placeholder="Enter Card Number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Card Type</label>
          <select
            name="cardType"
            value={formData.cardType}
            onChange={handleInputChange}
            required
          >
            <option value="">Card Type</option>
            <option value="Movie Credit Card">Movie Credit Card</option>
            <option value="Petrol Credit Card">Petrol Credit Card</option>
            <option value="Regular Card">Regular Card</option>
          </select>
        </div>
        <div>
          <label>Maximum Limit</label>
          <input
            type="number"
            name="maxLimit"
            placeholder="Enter maximum limit"
            value={formData.maxLimit}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CardDetailsForm;
