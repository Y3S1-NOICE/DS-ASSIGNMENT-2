import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NavBar from './components/Navbar';
import Typography from '@mui/material/Typography';
import { Toaster } from 'react-hot-toast';

const style = {
  backgroundColor: "#232B2B",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "20px",
  width: "100%",
  color: "white",
  fontSize: "14px"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Typography>
      <Toaster />
      <NavBar />
      <App />
      <br/><br/><br/>
      <div style={style}>@Copyright 2022 RSP APP</div>
    </Typography>
  </React.StrictMode>
);

