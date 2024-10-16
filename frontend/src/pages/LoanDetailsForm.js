import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoanDetailsForm = () => {
  const [options, setOptions] = useState([]); // For customer options
  const [selectedOption, setSelectedOption] = useState(""); // For selected customer
  const [formData, setFormData] = useState({
    loanNumber: "",
    loanType: "",
    loanAmount: "",
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
      loan_number: formData.loanNumber,
      loan_type: formData.loanType,
      loan_amount: formData.loanAmount,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addLoan",
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
        <header>Loan Details Form</header>
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
          <label>Loan Number</label>
          <input
            type="number"
            name="loanNumber"
            placeholder="Enter Loan Number"
            value={formData.loanNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Loan Type</label>
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleInputChange}
            required
          >
            <option value="">Loan Type</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Home Loan">Home Loan</option>
          </select>
        </div>
        <div>
          <label>Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            placeholder="Enter Loan Amount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoanDetailsForm;
