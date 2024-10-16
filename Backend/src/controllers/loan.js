import { ApiError } from "../middlewares/Apierror.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import connectDB from "../db/index.js";

const loanInfo = async (req, res) => {
  const connection = await connectDB();
  const [rows] = await connection.execute("SELECT * FROM LoanDetails");
  if (rows.length === 0) {
    throw new ApiError(404, "No Loan details found");
  }
  const response = new ApiResponse(200, rows, "Loan data fetched successfully");
  res.status(response.statusCode).json(response);
};

const addLoan = async (req, res) => {
  const { Cust_id, Loan_number, Loan_type, Balance } = req.body;
  console.log(Cust_id);
  if (
    !Cust_id ||
    Loan_number === undefined ||
    !Loan_type ||
    Balance === undefined
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const connection = await connectDB();

  const [customerRows] = await connection.execute(
    "SELECT * FROM CustomerDetails WHERE Cust_id = ?",
    [Cust_id]
  );

  if (customerRows.length === 0) {
    throw new ApiError(404, "Customer not found");
  }

  const query =
    "INSERT INTO LoanDetails (Cust_id, Loan_number, Loan_type, Balance) VALUES (?, ?, ?, ?)";

  const [result] = await connection.execute(query, [
    Cust_id,
    Loan_number,
    Loan_type,
    Balance,
  ]);

  const response = new ApiResponse(
    201,
    { Loan_number },
    "Loan Added Successfully "
  );
  res.status(response.statusCode).json(response);
};

export { loanInfo, addLoan };
