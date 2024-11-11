import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function Login() {
    const [form, setForm] = useState({
        tellerID: "",
        password: "",
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newPerson = { ...form };

        try {
            console.log("Sending request to backend");
            const response = await fetch("https://localhost:3001/teller/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            });
            console.log("Request sent");
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const data = await response.json();
            console.log(data);
            const { token, tellerID } = data;
            login(token);
            console.log(`Name: ${tellerID}\nToken: ${token}`);

            localStorage.setItem("jwt", token);
            localStorage.setItem("accountnum", tellerID);

            setForm({ tellerID: "", password: "" });
            navigate("/transactionApproval");
        } catch (error) {
            window.alert(error);
            console.log(error);
        }
    }

    return (
        <div
            className="App-header"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.istockphoto.com/id/1432744240/vector/concept-of-banking-and-finance.jpg?s=612x612&w=0&k=20&c=5YCtZpM5o1_MUnYqKvvCYA4ceby3JcU6faq7nUafhRI=")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="login-container"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)", // black background
                    color: "white", // text color white for contrast
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg"
                    alt="Bank Logo"
                    style={{
                        width: "100px",
                        height: "100px", // Keep height same as width to maintain round shape
                        borderRadius: "50%", // Make the logo rounded
                        marginBottom: "20px", // space between logo and form
                    }}
                />
                <h2 style={{ marginBottom: "20px" }}>Employee Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label htmlFor="name">Employee Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.tellerID}
                            onChange={(e) => updateForm({ tellerID: e.target.value })}
                            style={{
                                padding: "10px", // Add padding for better spacing
                                borderRadius: "5px", // Rounded corners
                                width: "100%", // Full width
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                width: "100%", // Full width
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-primary"
                            style={{
                                width: "100%",
                                padding: "10px", // Add padding for the button
                                borderRadius: "5px", // Rounded corners
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
