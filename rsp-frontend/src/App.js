import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PaymentGateway from './pages/payment/PaymentGateway';
import RegisteredCards from './pages/payment/RegisteredCards';
import Users from './pages/users';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login /> }/> 
      <Route path="/users" element={ <Users/> }/> 

      <Route path="/cards" element={ <RegisteredCards/> }/> 
      <Route path="/payments" element={ <PaymentGateway/> }/> 

    </Routes>
  </BrowserRouter>
  );
}

export default App;
