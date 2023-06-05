import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import BookForm from "./components/book_form";
import WrongUrl from "./components/404";
import { LoginContextProvider } from './LoginContext';

function App() {

  return (
    <div className="App">    
      <LoginContextProvider>
      <Routes>
        <Route exact path="/" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/book_form" element={<BookForm/>} />
        <Route path="*" element={<WrongUrl/>} />
      </Routes>
      </LoginContextProvider>
    </div>
  );
}

export default App;


