import React, { useEffect, useState } from "react";
import axios from 'axios'

const CardDetailsForm = () => {
    const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

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
        <header>Card Details Form</header>
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
          <label>Card Number</label>
          <input type="number" placeholder="Enter card number" />
        </div>
        <div>
          <label>Card Type</label>
          <select>
            <option>Card Type</option>
            <option>Movie Credit Card</option>
            <option>Petrol Credit Card</option>
            <option>Regular Credit Card</option>
          </select>
        </div>
        <div>
          <label>Maximum limit</label>
          <input type="number" placeholder="Enter maximum limit" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CardDetailsForm;
