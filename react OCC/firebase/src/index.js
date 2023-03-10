import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-wKh6zmVyzIclmaPMHgiv1LvMAVEptXA',
  authDomain: 'coderhouse-d72e2.firebaseapp.com',
  projectId: 'coderhouse-d72e2',
  storageBucket: 'coderhouse-d72e2.appspot.com',
  messagingSenderId: '586580024797',
  appId: '1:586580024797:web:9cf0d3c8f1b53c276dea34',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
