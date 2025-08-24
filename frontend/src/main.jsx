import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { DonationProvider } from './context/DonationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DonationProvider>
        <App />
      </DonationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
