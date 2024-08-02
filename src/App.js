import React, { useState } from 'react';
import './App.css';

function App() {
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://2i5qazsaek.execute-api.eu-north-1.amazonaws.com/prod/ProductCheckFunction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      // Adjust this based on the exact structure of the response
      if (data.message) {
        setMessage(data.message);
      } else {
        setMessage('Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Manufacturing Checker</h1>
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            value={productName} 
            onChange={handleInputChange} 
            placeholder="Enter product name" 
            required 
          />
          <button type="submit">Check Product</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
