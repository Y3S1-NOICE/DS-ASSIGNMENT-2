import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ListOfReservations from './pages/reservations-customer/list';
import CustomerReservationsList from './pages/reservations-hotel/customersList';
import Reservations from './pages/reservations-hotel/reservationList';
import PaymentGateway from './pages/payment/PaymentGateway';
import RegisteredCards from './pages/payment/RegisteredCards';
import Users from './pages/users';
import BillList from './pages/payment/BillList';
import MyReservations from './pages/reservations-customer/myReservations';
import Signup from './pages/Signup';
import Home from './pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/> 
        <Route path="/login" element={ <Login /> }/> 
        <Route path="/signup" element={ <Signup/> }/> 
        <Route path="/users" element={ <Users/> }/> 
        <Route path="/hotel/reservations" element={ <Reservations/> }/> 
        <Route path="/hotel/customer-reservations" element={ <CustomerReservationsList/> }/> 
        <Route path="/users/reservations" element={ <ListOfReservations/> }/> 
        <Route path="/my-reservations" element={ <MyReservations/> }/>
        <Route path="/cards" element={ <RegisteredCards/> }/> 
        <Route path="/payments" element={ <PaymentGateway/> }/> 
        <Route path="/bills" element={ <BillList/> }/> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;
