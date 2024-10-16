import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AccountDetailsForm.css";
const AccountDetailsForm = () => {
  const [options, setOptions] = useState([]); // For customer options
  const [selectedOption, setSelectedOption] = useState(""); // For selected customer
  const [formData, setFormData] = useState({
    accountId: "",
    accountType: "",
    balance: "",
  });

  // Fetch customer options using GET API when component mounts
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

  // Handle form data input changes
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
      Account_id: formData.accountId,
      Account_type: formData.accountType,
      Balance: formData.balance,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addAccount",
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
        <header>Account Details Form</header>

        {/* Customer Select Dropdown */}
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

        {/* Account ID Input */}
        <div>
          <label>Account ID</label>
          <input
            type="number"
            name="accountId"
            placeholder="Enter Account ID"
            value={formData.accountId}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Account Type Select */}
        <div>
          <label>Account Type</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="FD">FD</option>
            <option value="RD">RD</option>
          </select>
        </div>

        {/* Balance Input */}
        <div>
          <label>Balance</label>
          <input
            type="number"
            name="balance"
            placeholder="Enter Balance"
            value={formData.balance}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
