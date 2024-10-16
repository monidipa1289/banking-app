import { ApiError } from "../middlewares/Apierror.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import connectDB from "../db/index.js";

const accountInfo = async (req, res) => {
  const connection = await connectDB();
  const [rows] = await connection.execute("SELECT * FROM AccountDetails");
  if (rows.length === 0) {
    throw new ApiError(404, "No Account details found");
  }
  const response = new ApiResponse(
    200,
    rows,
    "Account data fetched successfully"
  );
  res.status(response.statusCode).json(response);
};

const addAccount = async (req, res) => {
  const { Cust_id, Account_id, Account_type, Balance } = req.body;
  console.log(Cust_id);
  if (!Cust_id || !Account_id || !Account_type || Balance === undefined) {
    throw new ApiError(400, "All fields are required");
  }

  const connection = await connectDB();
  console.log(Cust_id);
  const [customerRows] = await connection.execute(
    "SELECT * FROM CustomerDetails WHERE Cust_id = ?",
    [Cust_id]
  );

  if (customerRows.length === 0) {
    throw new ApiError(404, "Customer not found");
  }

  const query =
    "INSERT INTO AccountDetails (Cust_id, Account_id, Account_type, Balance) VALUES (?, ?, ?, ?)";

  const [result] = await connection.execute(query, [
    Cust_id,
    Account_id,
    Account_type,
    Balance,
  ]);

  const response = new ApiResponse(
    201,
    { Account_id },
    "Account Added Successfully "
  );
  res.status(response.statusCode).json(response);
};

export { accountInfo, addAccount };
