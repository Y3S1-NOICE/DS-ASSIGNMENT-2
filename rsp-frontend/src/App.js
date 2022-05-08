import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ListOfReservations from './pages/reservations-customer/list';
import Reservations from './pages/reservations-hotel/reservationList';
import Users from './pages/users';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login /> }/> 
      <Route path="/users" element={ <Users/> }/> 
      <Route path="/hotel/reservations" element={ <Reservations/> }/> 
      <Route path="/users/reservations" element={ <ListOfReservations/> }/> 

    </Routes>
  </BrowserRouter>
  );
}

export default App;
