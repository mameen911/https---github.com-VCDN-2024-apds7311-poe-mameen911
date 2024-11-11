import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./signup.css"; // Import custom styles

export default function Signup() {
    // Initial state for the form, including default values
    const [form, setForm] = useState({
        name: "",
        accountnum: generateAccountNum(), // Generate random account number
        idNumber: "", 
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate(); // Hook for navigation after form submission

    // Update form state with new values
    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
    }

    // Generate a random account number (default length: 10)
    function generateAccountNum(length = 10) {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    // Handle form submission: send data to backend
    async function onSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        const newPerson = { ...form }; // Copy form data

        try {
            const response = await fetch("https://localhost:3001/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Sending JSON data
                },
                body: JSON.stringify(newPerson), // Convert form data to JSON
            });

            if (!response.ok) { // Check if the response is successful
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            // Reset form after successful submission
            setForm({ name: "", accountnum: generateAccountNum(), idNumber: "", password: "", confirmPassword: "" });
            navigate("/login"); // Redirect to login page
        } catch (error) {
            window.alert(error); // Show alert if error occurs
            console.log(error); // Log error for debugging
        }
    }

    return (
        <div className="signup-container">
            {/* Logo */}
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg"
                alt="Bank Logo"
                className="signup-logo"
            />
            <h2>Sign Up</h2>
            <form onSubmit={onSubmit}>
                {/* Full Name input */}
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                {/* ID Number input */}
                <div className="form-group">
                    <label htmlFor="idNumber">ID Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idNumber"
                        value={form.idNumber}
                        onChange={(e) => updateForm({ idNumber: e.target.value })}
                    />
                </div>
                {/* Account Number (read-only) */}
                <div className="form-group">
                    <label htmlFor="accountnum">Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="accountnum"
                        value={form.accountnum}
                        readOnly
                    />
                </div>
                {/* Password input */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                {/* Confirm Password input */}
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={(e) => updateForm({ confirmPassword: e.target.value })}
                    />
                </div>
                {/* Submit button */}
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Profile"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
