//imports
import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";
import users from "./ROUTES/user.mjs";
import tellers from "./ROUTES/teller.mjs";
import transactions from "./ROUTES/transaction.mjs";

//vars
const PORT = 3001;
const app = express();
const options = {
    key: fs.readFileSync('KEYS/privatekey.pem'),
    cert: fs.readFileSync('KEYS/certificate.pem')
};

//server code
app.use(cors());
app.use(express.json());

// Middleware to set security headers
app.use((req, res, next) => {
    // res.setHeader("X-Frame-Options", "DENY");
    // res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    next();
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

// Add health check endpoint
app.get('/healthcheck', (req, res) => {
    res.status(200).send('Server is healthy');
});

app.use("/user", users);
app.route("/user", users);
app.use("/teller", tellers);
app.route("/teller", tellers);
app.use("/transaction", transactions);
app.route("/transaction", transactions);

let server = https.createServer(options, app);
console.log(`${PORT} is running server successfully`);
server.listen(PORT);
