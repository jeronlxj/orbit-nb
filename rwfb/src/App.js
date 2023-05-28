import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import { LoginContextProvider } from './LoginContext';

function App() {

  return (
    <div className="App">    
      <LoginContextProvider>
      <Routes>
        <Route exact path="/" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/room"/>
        <Route path="*" element={<h1> you inserted an invalid url</h1>} />
      </Routes>
      </LoginContextProvider>
    </div>
  );
}

export default App;


