import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DOMPurify from 'dompurify';

export default function NewTransaction() {
    // Initialize form state with default values
    const [form, setForm] = useState({
        accountnum: "",
        transactionAmount: "",
        transactionAddress: "",
        transactionStatus: "Pending",  // Default status
        currency: "USD", // Default currency
    });
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt"); // Get token from localStorage

    // Fetch account number from localStorage on component mount
    useEffect(() => {
        const accountnum = localStorage.getItem("accountnum");
        console.log(accountnum); // Log account number
        if (accountnum) {
            setForm((prev) => ({ ...prev, accountnum: accountnum }));
        }
    }, []);

    // Update form state for specific field
    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
    }

    // Handle form submission and send data to API
    async function onSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        console.log("Form state on submit:", form);

        // Sanitize form data to prevent XSS attacks
        const sanitizedForm = {
            accountnum: DOMPurify.sanitize(form.accountnum),
            transactionAmount: DOMPurify.sanitize(form.transactionAmount),
            transactionAddress: DOMPurify.sanitize(form.transactionAddress),
            transactionStatus: DOMPurify.sanitize(form.transactionStatus),
            currency: DOMPurify.sanitize(form.currency),
        };

        try {
            // Send sanitized form data to backend
            const response = await fetch("https://localhost:3001/transaction/newtransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(sanitizedForm),
            });

            // If response is not OK, throw error
            if (!response.ok) {
                throw new Error("Transaction failed");
            }

            // Parse response and reset form on success
            const data = await response.json();
            const { token: newToken, accountnum } = data;
            console.log(`Account Num: ${accountnum}\nToken: ${newToken}`);

            // Clear form fields and navigate to view transactions
            setForm({ accountnum: accountnum, transactionAmount: "", transactionAddress: "", currency: "USD" });
            navigate("/viewtransactions");
        } catch (error) {
            window.alert(error); // Show error alert if transaction fails
        }
    }

    return (
        <div className="App-header" style={{
            backgroundImage: `url("https://media.istockphoto.com/id/1432744240/vector/concept-of-banking-and-finance.jpg?s=612x612&w=0&k=20&c=5YCtZpM5o1_MUnYqKvvCYA4ceby3JcU6faq7nUafhRI=")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px'
        }}>
            <div className="transaction-container">
                <h2 className="App"> New Transaction</h2>
                <form onSubmit={onSubmit}>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Transaction Amount</th>
                                <th>Transaction Address</th>
                                <th>Currency</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        value={form.accountnum} 
                                        readOnly  // Account number is read-only
                                        style={{ backgroundColor: '#f0f0f0', color: '#333', padding: '10px', borderRadius: '5px' }} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={form.transactionAmount} 
                                        onChange={(e) => updateForm({ transactionAmount: e.target.value })} 
                                        placeholder="Enter amount" 
                                        style={{ padding: '8px', borderRadius: '5px', width: '100%' }}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={form.transactionAddress} 
                                        onChange={(e) => updateForm({ transactionAddress: e.target.value })} 
                                        placeholder="Enter SWIFT Code" 
                                        style={{
                                            padding: '8px', 
                                            borderRadius: '5px', 
                                            width: '100%',
                                            borderColor: form.transactionAddress ? '#ccc' : 'red', // Red border if empty
                                            backgroundColor: '#fff'
                                        }} 
                                    />
                                </td>
                                <td>
                                    <select 
                                        value={form.currency} 
                                        onChange={(e) => updateForm({ currency: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '5px', width: '100%' }}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="ZAR">ZAR</option>
                                        <option value="INR">INR</option>
                                        <option value="AUD">AUD</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="submit" style={{
                                        backgroundColor: '#4CAF50', 
                                        color: 'white', 
                                        padding: '10px 15px', 
                                        border: 'none', 
                                        borderRadius: '5px', 
                                        cursor: 'pointer'
                                    }}>Pay Now</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}
