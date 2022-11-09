
import './App.css';
import Navbar from './components/navbar';
import GeneralPrezentation from './components/generalPrezentation';
import { Route, Routes } from 'react-router-dom';
import Overview from './routes/overview';
import SignUp from './routes/signup';
import Login from './routes/login';
import PositionsTree from './routes/positionsTree';
import Statistics from './routes/statistics';
import Deadlines from './routes/deadlines';
import AddCompany from './routes/addCompany';
import ResetPassword from './routes/resetPassword';
import Admin from './routes/admin';
import { AuthContext } from './components/userContext';
import { useContext } from 'react';
import { AdminContext } from './components/adminContext';
import WrongPage from './routes/wrongPage';

function App() {
  const {user} = useContext(AuthContext);
  const {admin} = useContext(AdminContext);

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route element = {<SignUp/>} path = "/signup"/>
          <Route element = {<Login/>} path = "/login"/>
          <Route element = {<GeneralPrezentation/>} path = "/"/>
          <Route element = {<WrongPage/>} path = "*"/>
          {user && <Route element = {<PositionsTree/>} path = "/tree"/>}
          {user && <Route element = {<Statistics/>} path = "/statistics"/>}
          {user && <Route element = {<ResetPassword/>} path = "/resetPassword"/>}
          {user && <Route element = {<Deadlines/>} path = "/deadlines"/>}
          {user && <Route element = {<Overview/>} path = "/overview"/>}
          {user && admin && <Route element = {<AddCompany/>} path = "/addCompany"/>}
          {user && admin && <Route element = {<Admin/>} path = "/admin"/>}
        </Routes>
    </div>
  );
}

export default App;
