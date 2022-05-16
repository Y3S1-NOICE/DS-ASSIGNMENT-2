import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ListOfReservations from './pages/reservations-customer/list';
import CustomerReservationsList from './pages/reservations-hotel/customersList';
import Reservations from './pages/reservations-hotel/reservationList';
import PaymentGateway from './pages/payment/PaymentGateway';
import RegisteredCards from './pages/payment/RegisteredCards';
import Users from './pages/users';
import BillList from './pages/payment/BillList';
import Signup from './pages/Signup';
import Home from './pages/home/Home';
import MyReservations from './pages/reservations-customer/myReservations';
import Taxis from './pages/taxi-service/manage-taxi';
import CreateTaxi from './pages/taxi-service/AddTaxi';
import ManageTaxiCustomerView from './pages/taxi-service/manage-taxi-customer';
import MyBookedTaxis from './pages/taxi-service/BookedTaxis';
import AllBookedTaxis from './pages/taxi-service/CustomerBookedTaxis';

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
        <Route path="/cards" element={ <RegisteredCards/> }/> 
        <Route path="/payments/:id" element={ <PaymentGateway/> }/> 
        <Route path="/bills" element={ <BillList/> }/> 
        <Route path="/my-reservations" element={ <MyReservations/> }/>
        <Route path="/manage-taxis" element={ <Taxis/> }/>
        <Route path="/addTaxi" element={ <CreateTaxi/> }/>
        <Route path="/taxi" element={ <ManageTaxiCustomerView/> }/>
        <Route path="/my-taxi" element={ <MyBookedTaxis/> }/>
        <Route path="/all-bookedTaxis" element={ <AllBookedTaxis/> }/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
