import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './components/adminContext';
import { AuthProvider } from './components/userContext';
import { Wrapper } from "@googlemaps/react-wrapper";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Wrapper apiKey = {process.env.REACT_APP_MY_API_KEY} libraries={["places"]}>
    <AuthProvider>
      <AdminProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminProvider>
    </AuthProvider>
  </Wrapper>
);
