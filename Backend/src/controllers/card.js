import { ApiError } from "../middlewares/Apierror.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import connectDB from "../db/index.js";

const cardInfo = async (req, res) => {
  const connection = await connectDB();
  const [rows] = await connection.execute("SELECT * FROM cardDetails");
  if (rows.length === 0) {
    throw new ApiError(404, "No card details found");
  }
  const response = new ApiResponse(200, rows, "Card data fetched successfully");
  res.status(response.statusCode).json(response);
};

const addCard = async (req, res) => {
  const { Cust_id, Card_number, Card_type, Max_limit } = req.body;
  console.log(Cust_id);
  if (
    !Cust_id ||
    Card_number === undefined ||
    !Card_type ||
    Max_limit === undefined
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
    "INSERT INTO CardDetails (Cust_id, Card_number, Card_type, Max_limit) VALUES (?, ?, ?, ?)";

  const [result] = await connection.execute(query, [
    Cust_id, Card_number, Card_type, Max_limit
  ]);

  const response = new ApiResponse(
    201,
    { Card_number },
    "Card Added Successfully "
  );
  res.status(response.statusCode).json(response);
};

export { cardInfo, addCard };
