import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material';
import './App.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import CalendarScreen from './components/Calendar';
import Stats from './components/Stats';
import { Style } from './navigationLinkStyle';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppBar>
      <Toolbar className='toolbar'>
        <NavLink to='/' style= {Style} className='link'>Customers </NavLink>
        <NavLink to='/trainings' style={Style} className='link'>Trainings</NavLink>
        <NavLink to='/calendar' style={Style} className='link'>Calendar</NavLink>
        <NavLink to='/stats' style={Style} className='link'>Stats</NavLink>
        
      </Toolbar>
    </AppBar>
      <Routes>
        <Route exact path='/' element={<Customers />} />
        <Route exact path='/trainings' element={<Trainings />} />
        <Route exact path='/calendar' element={<CalendarScreen />} />
        <Route exact path='/stats' element={<Stats />} />
              
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;