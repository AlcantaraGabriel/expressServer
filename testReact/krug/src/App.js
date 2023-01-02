import React, {Fragment} from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import Dashboard from './componentes/Dashboard/Dashboard';
import Preferences from './componentes/Preferences/Preferences';

function App() {
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
       <Fragment>
      	<Routes>
      		<Route path='/dashboard' element={<Dashboard />}/>
      		<Route path='/preferences' element={<Preferences />}/>	
  	    		
      	</Routes>
       </Fragment>
      </Router>
    </div>
  );
}

export default App;
