
import './App.css';
import Navbar from './components/navbar/navbar';
import GeneralPrezentation from './routes/generalPrezentation';
import { Route, Routes } from 'react-router-dom';
import Overview from './routes/overview/overview';
import SignUp from './routes/signup/signup';
import Login from './routes/login/login';
import PositionsTree from './routes/positions/positionsTree';
import Statistics from './routes/statistics';
import CrudCompanies from './routes/companies/crudCompanies';
import ResetPassword from './routes/login/resetPassword';
import Admin from './routes/admins/admin';
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
          <Route element = {<ResetPassword/>} path = "/resetPassword"/>
          {user && <Route element = {<PositionsTree/>} path = "/positions"/>}
          {user && <Route element = {<Statistics/>} path = "/statistics"/>}
          {user && <Route element = {<Overview/>} path = "/overview"/>}
          {user && admin && <Route element = {<CrudCompanies/>} path = "/companies"/>}
          {user && admin && <Route element = {<Admin/>} path = "/admins"/>}
        </Routes>
    </div>
  );
}

export default App;
