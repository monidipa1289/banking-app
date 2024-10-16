import axios from "axios";
import React, { useEffect, useState } from "react";

const LoanDetailsForm = () => {
    const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response= await axios.get("");
        console.log("🚀 ~ fetchOptions ~ response:", response)

        // setOptions(response);
      } catch (error) {
        console.log("Error while fetching customer data. ",error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div>
      <form>
        <header>Loan Details Form</header>
        <div>
          <label>Select Customer</label>
          <select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          >
            <option value="">Select option</option>
            {options.map((option)=>{
                return <option value={option}>{option}</option>
            })}
          </select>
        </div>
        <div>
          <label>Loan Number</label>
          <input type="number" placeholder="Enter Loan number" />
        </div>
        <div>
          <label>Loan Type</label>
          <select>
            <option>Loan Type</option>
            <option>Car Loan</option>
            <option>Personal Loan</option>
            <option>Home Loan</option>
          </select>
        </div>
        <div>
          <label>Loan Amount</label>
          <input type="number" placeholder="Enter Loan amount" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoanDetailsForm;
