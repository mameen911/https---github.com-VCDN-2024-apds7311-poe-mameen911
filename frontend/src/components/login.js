import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function Login() {
    // Initialize form state for username, account number, and password
    const [form, setForm] = useState({
      username: "", 
      accountnum: "",
      password: "",
    });

    // Access login function from AuthProvider
    const { login } = useAuth();
    const navigate = useNavigate(); // Navigation hook for redirection

    // Update form state with new values
    function updateForm(value) {
      setForm((prev) => ({ ...prev, ...value }));
    }

    // Handle form submission: send login data to backend
    async function onSubmit(e) {
      e.preventDefault(); // Prevent default form submission behavior
  
      try {
        console.log("Sending request to backend");
        // Send POST request with login data to backend API
        const response = await fetch("https://localhost:3001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        console.log("Request sent");

        // If response is not successful, throw error
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed"); 
        }

        // Handle successful login response
        const data = await response.json();
        const { token, accountnum } = data;
  
        login(token, accountnum); // Call login function from context

        // Reset form and navigate to new transaction page
        setForm({ username: "", accountnum: "", password: "" });
        navigate("/newtransaction");
      } catch (error) {
        window.alert(error); // Show alert if error occurs
        console.log(error);  // Log error for debugging
      }
    }

    return (
        <div 
          className="App-header" 
          style={{
            backgroundImage: `url("https://media.istockphoto.com/id/1432744240/vector/concept-of-banking-and-finance.jpg?s=612x612&w=0&k=20&c=5YCtZpM5o1_MUnYqKvvCYA4ceby3JcU6faq7nUafhRI=")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px'
          }}
        >
            <div className="login-container">
                {/* Bank logo */}
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg"
                    alt="Bank Logo"
                    className="signup-logo"
                />
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    {/* Username input field */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={form.username}
                            onChange={(e) => updateForm({ username: e.target.value })}
                        />
                    </div>
                    {/* Account Number input field */}
                    <div className="form-group">
                        <label htmlFor="accountnum">Account Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="accountnum"
                            value={form.accountnum}
                            onChange={(e) => updateForm({ accountnum: e.target.value })}
                        />
                    </div>
                    {/* Password input field */}
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
                    {/* Submit button */}
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
