import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AddCard from './pages/payment/AddCard';
import Users from './pages/users';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login /> }/> 
      <Route path="/users" element={ <Users/> }/> 

      <Route path="/cards/:cardId" element={ <AddCard/> }/> 

    </Routes>
  </BrowserRouter>
  );
}

export default App;
