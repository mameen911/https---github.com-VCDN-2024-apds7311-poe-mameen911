import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate(); // Initialize navigate function

  const backgroundStyle = {
    backgroundImage: 'url("https://media.istockphoto.com/id/1432744240/vector/concept-of-banking-and-finance.jpg?s=612x612&w=0&k=20&c=5YCtZpM5o1_MUnYqKvvCYA4ceby3JcU6faq7nUafhRI=")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw', // Full width of the viewport
    height: '100vh', // Full height of the viewport
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for readability
    zIndex: 0,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light overlay for content
    borderRadius: '10px',
  };

  // Handle navigation to the login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1>Welcome to the International Payments Portal</h1>
        <p>Your secure and reliable platform for making global transactions with ease.</p>
        <section className="about">
          <h2>About the Portal</h2>
          <p>
            Our International Payments Portal enables individuals and businesses to send and receive payments
            securely across borders. With features like multiple currency support, advanced security measures, 
            and quick processing times, we ensure that your transactions are smooth, secure, and hassle-free.
          </p>
          <p>
            Whether you're sending money to family or making a business payment, our portal offers a reliable 
            solution for all your international payment needs.
          </p>
        </section>
        {/* Login Button */}
        <button onClick={handleLoginClick} style={buttonStyle}>Login</button>
        <footer className="footer">
          <div className="footer-links">
            <a href="#" style={{ color: 'white', marginRight: '10px' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'white', marginRight: '10px' }}>Terms of Service</a>
            <a href="#" style={{ color: 'white' }}>Contact Us</a>
          </div>
          <p>&copy; {new Date().getFullYear()} TrustedBank. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#4CAF50', // Green background for the button
  color: 'white', // White text
  border: 'none', // Remove border
  padding: '10px 20px', // Padding
  fontSize: '16px', // Font size
  cursor: 'pointer', // Pointer cursor on hover
  borderRadius: '5px', // Rounded corners
  marginTop: '20px', // Space above the button
};

export default HomePage;
