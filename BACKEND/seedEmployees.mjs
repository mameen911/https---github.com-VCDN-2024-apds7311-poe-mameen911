const bcrypt = require('bcrypt');
const db = require('./DB/conn'); // Adjust the path if necessary

(async () => {
    try {
        const employees = [
            {
                name: "Alice",
                tellerID: "001",
                password: await bcrypt.hash("Password123!", 10),
                role: "teller"
            },
            {
                name: "Bob",
                tellerID: "002",
                password: await bcrypt.hash("SecurePass456$", 10),
                role: "teller"
            }
        ];

        const collection = await db.collection("tellers");
        await collection.insertMany(employees);
        console.log("Sample employees inserted successfully");
    } catch (error) {
        console.error("Error inserting employees:", error);
    } finally {
        process.exit();
    }
})();
