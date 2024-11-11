import checkauth from "../check-auth.mjs";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { RegEx } from "../regex.mjs";
import dotenv from "dotenv";
import checkauthEmployee from "../check-auth-teller.mjs";

dotenv.config(); // Load environment variables from .env file
const mongoURI = process.env.ATLAS_URI || ""; // MongoDB URI from environment variable
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const router = express.Router(); // Create a new Express router

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect(); // Establish MongoDB connection
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  }
}
connectToDB();

// Close MongoDB connection on application termination
process.on('SIGINT', async () => {
  await client.close();
  console.log('Connection to MongoDB closed due to application termination');
  process.exit(0);
});

// Route to get all transactions for a user
router.get("/transactions/userlist", checkauth, async (req, res) => {
  try {
    const accountnum = req.query.accountnum; // Get account number from query parameters
    const collection = client.db("users").collection("transactions");
    let transactions;
    if (accountnum != null) {
      transactions = await collection.find({ accountnum }).toArray(); // Filter by account number if provided
    } else {
      transactions = await collection.find().toArray(); // Get all transactions
    }
    res.status(200).send(transactions); // Return transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send({ error: "An error occurred while fetching transactions." });
  }
});

// Route to get all pending transactions (for employees)
router.get("/transactions", checkauthEmployee, async (req, res) => {
  try {
    const collection = client.db("users").collection("transactions");
    const transactions = await collection.find({ transactionStatus: "Pending" }).toArray(); // Filter pending transactions
    res.status(200).send(transactions); // Return pending transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send({ error: "An error occurred while fetching transactions." });
  }
});

// Route to get all transactions (for employees)
router.get("/alltransactions", checkauthEmployee, async (req, res) => {
  try {
    const collection = client.db("users").collection("transactions");
    const transactions = await collection.find().toArray(); // Get all transactions
    res.status(200).send(transactions); // Return transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send({ error: "An error occurred while fetching transactions." });
  }
});

// Route to create a new transaction
router.post("/newtransaction", checkauth, async (req, res) => {
  try {
    // Log the incoming request body
    console.log("Request Body:", req.body);

    // Validate inputs using regular expressions
    const isValidUser = RegEx.testAlphanumerical(req.body.accountnum);
    const isValidTransactionAmount = RegEx.testNumbers(req.body.transactionAmount);
    const isValidTransactionAddress = RegEx.testAlphanumerical(req.body.transactionAddress);

    // Log validation results
    console.log("Validation Results:", {
      isValidUser,
      isValidTransactionAmount,
      isValidTransactionAddress,
    });

    // Check if all validations pass
    if (!isValidUser || !isValidTransactionAmount || !isValidTransactionAddress) {
      return res.status(400).send({ error: "Invalid input data" });
    }

    // Create the new transaction document
    let newDocument = {
      accountnum: req.body.accountnum,
      transactionAmount: req.body.transactionAmount,
      transactionAddress: req.body.transactionAddress,
      transactionStatus: "Pending",
    };

    // Log the new transaction document
    console.log("New Document:", newDocument);

    const collection = client.db("users").collection("transactions");
    let result = await collection.insertOne(newDocument); // Insert the new transaction into the database

    // Log the insertion result
    console.log("Insertion Result:", result);

    // Send success response with transaction details and authorization token
    res.status(201).send({
      message: "Transaction successfully created",
      transaction: newDocument,
      token: req.headers.authorization.split(" ")[1], // Extract token from authorization header
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "An error occurred while processing the transaction." });
  }
});

// Route to update a transaction status
router.patch('/transactions/:id', async (req, res) => {
  console.log('PATCH /transactions/:id called with ID:', req.params.id);
  try {
    const { transactionStatus } = req.body; // Get new status from request body
    const { id } = req.params; // Get transaction ID from request parameters

    let transaction;
    try {
      const objectId = new ObjectId(id); // Convert ID to ObjectId format
      const collection = client.db("users").collection("transactions");
      transaction = await collection.findOne({ _id: objectId }); // Find the transaction by ID

      if (!transaction) {
        console.log('Transaction not found for ID:', id);
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Update the transaction status
      const updatedTransaction = await collection.updateOne(
        { _id: objectId },
        { $set: { transactionStatus: transactionStatus } }
      );

      console.log('Transaction updated:', updatedTransaction);
      res.status(200).json(updatedTransaction); // Return updated transaction
    } catch (e) {
      console.log('Invalid ObjectId format:', id);
      return res.status(400).json({ message: 'Invalid ObjectId format' });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Error updating transaction status', error });
  }
});

export default router;
