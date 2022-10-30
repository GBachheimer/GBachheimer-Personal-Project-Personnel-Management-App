
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

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route element = {<GeneralPrezentation/>} path = "/"/>
          <Route element = {<Overview/>} path = "/overview"/>
          <Route element = {<SignUp/>} path = "/signup"/>
          <Route element = {<Login/>} path = "/login"/>
          <Route element = {<PositionsTree/>} path = "/tree"/>
          <Route element = {<Statistics/>} path = "/statistics"/>
          <Route element = {<Deadlines/>} path = "/deadlines"/>
          <Route element = {<AddCompany/>} path = "/addCompany"/>
          <Route element = {<ResetPassword/>} path = "/resetPassword"/>
        </Routes>
    </div>
  );
}

export default App;
