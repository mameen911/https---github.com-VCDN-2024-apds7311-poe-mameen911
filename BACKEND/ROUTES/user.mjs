import express from "express";
import db from "../DB/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";
import { RegEx } from "../regex.mjs";

const router = express.Router();
var store = new ExpressBrute.MemoryStore(); // Memory store for brute force protection
var bruteforce = new ExpressBrute(store); // Brute force protection middleware

// Sign-up method
router.post("/signup", async (req, res) => {
    const { name, accountnum, password, confirmPassword } = req.body;

    // Validate name and account number
    if (!RegEx.testAlphabet(name)) {
        return res.status(400).json({ message: "Invalid name format" });
    }
    if (!RegEx.testAlphanumerical(accountnum)) {
        return res.status(400).json({message: "Invalid ID format" });
    }
    
    const passwordStrong = RegEx.testPassword(password); // Check password strength
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    let newDocument = { name, accountnum, password: hashedPassword, role: "user" };

    if (passwordStrong) {
        if(password == confirmPassword) { // Check password match
            try {
                const collection = await db.collection("users");
                let result = await collection.insertOne(newDocument); // Insert new user
                res.status(201).send(result);
            } catch (error) {
                console.error("Signup error: ", error);
                res.status(500).json({ message: "Something went wrong, please try again." });
            }
        } else {
            res.status(500).json({ message: "Passwords don't match" }); // Password mismatch error
        }
    } else {
        res.status(500).json({ message: "Password too weak" }); // Weak password error
    }
});

// Login method with brute force protection
router.post("/login", bruteforce.prevent, async (req, res) => {
    const { name, accountnum, password } = req.body;
    console.log(name + " trying to sign in");

    try {
        const collection = await db.collection("users");
        const user = await collection.findOne({ accountnum });

        if (!user) {
            return res.status(401).json({ message: "Account number invalid" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password); // Compare password
        if (!passwordMatch) {
            return res.status(401).json({ message: "Password incorrect" });
        }

        // Generate JWT token upon successful login
        const token = jwt.sign(
            { username: req.body.accountnum, password: req.body.password },
            "asdFASFLkasdASdASdAfSGASAsfjsSjkdAKJnsdjImCryingkjasDkASd",
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Sign in successful", token, accountnum: req.body.accountnum });
        console.log("Session token: ", token);
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ message: "Something went wrong, please try again." });
    }
});

// Check user role based on account number
router.get('/checkUser', async (req, res) => { 
    console.log("Checking user");
    const accountnum = req.query.accountnum; 

    try {
        const collection = db.collection("users");
        const user = await collection.findOne({ accountnum: accountnum });

        if (user) {
            return res.status(200).json({ 
                message: "User found", 
                role: user.role 
            });
        } else {
            return res.status(200).json({ 
                message: "Teller found", 
                role: "teller"
            });
        }
    } catch (error) { 
        console.error("Error checking user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// JWT authentication middleware
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract token from header

        // Verify the JWT token
        jwt.verify(token, "asdFASFLkasdASdASdAfSGASAsfjsSjkdAKJnsdjImCryingkjasDkASd", (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }

            req.user = user; // Attach user data to request
            next(); // Continue to next middleware
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token present
    }
}

export default router;
