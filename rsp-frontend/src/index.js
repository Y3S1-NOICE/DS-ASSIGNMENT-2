import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NavBar from './components/Navbar';
import Typography from '@mui/material/Typography';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Typography>
      <NavBar />
      <App />
    </Typography>
  </React.StrictMode>
);

