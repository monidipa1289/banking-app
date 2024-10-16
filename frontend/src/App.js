import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AccountDetailsForm from "./pages/AccountDetailsForm";
import CustomerDetailsForm from "./pages/CustomerDetailsForm";
import LoanDetailsForm from "./pages/LoanDetailsForm";
import CardDetailsForm from "./pages/CardDetailsForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-customer" element={<CustomerDetailsForm />} />
        <Route path="/add-account" element={<AccountDetailsForm />} />
        <Route path="/add-loan" element={<LoanDetailsForm />} />
        <Route path="/add-card" element={<CardDetailsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
