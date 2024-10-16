import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [isLoanDetailsOpen, setIsLoanDetailsOpen] = useState(false);
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);

  const [customerDetails, setCustomerDetails] = useState([]);
  const [accountDetails, setAccountDetails] = useState([]);
  const [loanDetails, setLoanDetails] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);

  const handleOpenClick = async (row) => {
    // const base̥̥̥̥Url = process.env.BASE_URL
    // const x̥= 10
    if (row === "Customer Details") {
      if (!isCustomerDetailsOpen) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/customer"
          );
          console.log(response.data.data);
          setCustomerDetails(response.data.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      setIsCustomerDetailsOpen((prev) => !prev);
    } else if (row === "Account Details") {
      if (!isAccountDetailsOpen) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/account"
          );
          console.log(response.data.data);
          setAccountDetails(response.data.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      setIsAccountDetailsOpen((prev) => !prev);
    } else if (row === "Loan Details") {
      if (!isLoanDetailsOpen) {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/loan");
          console.log(response.data.data);
          setLoanDetails(response.data.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      setIsLoanDetailsOpen((prev) => !prev);
    } else {
      if (!isCardDetailsOpen) {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/card");
          console.log(response.data.data);
          setCardDetails(response.data.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      setIsCardDetailsOpen((prev) => !prev);
    }
  };

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="Home">
      <header>Manager Dashboard</header>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isCustomerDetailsOpen ? (
          <button onClick={() => handleOpenClick("Customer Details")}>-</button>
        ) : (
          <button onClick={() => handleOpenClick("Customer Details")}>+</button>
        )}
        <div>Customer Details</div>
        {isCustomerDetailsOpen && (
          <>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>customer ID</th>
                  <th>Customer Name</th>
                  <th>Phone number</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {customerDetails.map((item) => (
                  <tr key={item.Cust_id}>
                    <td>{item.Cust_id}</td>
                    <td>{item.Cust_name}</td>
                    <td>{item.Phone_number}</td>
                    <td>{item.Location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => {
                handleNavigate("add-customer");
              }}
            >
              Add Customer
            </button>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAccountDetailsOpen ? (
          <button onClick={() => handleOpenClick("Account Details")}>-</button>
        ) : (
          <button onClick={() => handleOpenClick("Account Details")}>+</button>
        )}
        <div>Account Details</div>
        {isAccountDetailsOpen && (
          <>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>customer ID</th>
                  <th>Account ID</th>
                  <th>Account type</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {accountDetails.map((item) => (
                  <tr key={item.Cust_id}>
                    <td>{item.Cust_id}</td>
                    <td>{item.Account_id}</td>
                    <td>{item.Account_type}</td>
                    <td>{item.Balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => {
                handleNavigate("add-account");
              }}
            >
              Add Account
            </button>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoanDetailsOpen ? (
          <button onClick={() => handleOpenClick("Loan Details")}>-</button>
        ) : (
          <button onClick={() => handleOpenClick("Loan Details")}>+</button>
        )}
        <div>Loan Details</div>
        {isLoanDetailsOpen && (
          <>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>customer ID</th>
                  <th>Loan_number</th>
                  <th>Loan_type</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {loanDetails.map((item) => (
                  <tr key={item.Cust_id}>
                    <td>{item.Cust_id}</td>
                    <td>{item.Loan_number}</td>
                    <td>{item.Loan_type}</td>
                    <td>{item.Balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => {
                handleNavigate("add-loan");
              }}
            >
              Add Loan
            </button>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isCardDetailsOpen ? (
          <button onClick={() => handleOpenClick("Card Details")}>-</button>
        ) : (
          <button onClick={() => handleOpenClick("Card Details")}>+</button>
        )}
        <div>Card Details</div>
        {isCardDetailsOpen && (
          <>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>customer ID</th>
                  <th>Card Number</th>
                  <th>Card Type</th>
                  <th>Max Limit</th>
                </tr>
              </thead>
              <tbody>
                {cardDetails.map((item) => (
                  <tr key={item.Cust_id}>
                    <td>{item.Cust_id}</td>
                    <td>{item.Card_number}</td>
                    <td>{item.Card_type}</td>
                    <td>{item.Max_limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => {
                handleNavigate("add-card");
              }}
            >
              Add Card
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
