import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './components/adminContext';
import { AuthProvider } from './components/userContext';
import { Wrapper } from "@googlemaps/react-wrapper";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { db } from './components/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function saveUserToFirestore(email) {
  const newUserRef = doc(db, "users", email);
  const docSnap = await getDoc(newUserRef);
  if (docSnap.exists()) {
      return;
  } else {
      try {
          await setDoc(doc(db, "users", email), {
              admin: false
          });
      } catch (error) {
          console.log(error);
      }
  }    
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Wrapper apiKey = {process.env.REACT_APP_MY_API_KEY} libraries = {["places"]}>
    <AuthProvider>
      <AdminProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminProvider>
    </AuthProvider>
  </Wrapper>
);
