import { ApiError } from "../middlewares/Apierror.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import connectDB from "../db/index.js";

const customerInfo = async (req, res) => {
  const connection = await connectDB();
  const [rows] = await connection.execute("SELECT * FROM CustomerDetails");
  if (rows.length === 0) {
    throw new ApiError(404, "No Customer details found");
  }
  const response = new ApiResponse(
    200,
    rows,
    "Customer data fetched successfully"
  );
  res.status(response.statusCode).json(response);
};

const addCustomer = async (req, res) => {
  const { Cust_name, Phone_number, Location } = req.body;
  console.log(Cust_name);
  console.log(Phone_number);
  console.log(Location);
  console.log(req.body);
  if (!Cust_name || !Phone_number || !Location) {
    throw new ApiError(400, "All fields are required");
  }

  const connection = await connectDB();
  const query =
    "INSERT INTO CustomerDetails (Cust_name, Phone_number, Location) VALUES (?, ?, ?)";

  const [result] = await connection.execute(query, [
    Cust_name,
    Phone_number,
    Location,
  ]);

  const response = new ApiResponse(
    201,
    { Cust_id: result.insertId },
    "Customer Added Successfully "
  );
  res.status(response.statusCode).json(response);
};

export { customerInfo, addCustomer };
