import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Approve from "./components/Approve";
import BookForm from "./components/Book/book_form";
import UserStatusEditor from './components/Staff';
import BookDropdown from "./components/Book/book_dropdown";
import BookCalendar from "./components/Book/book_calendar";
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
        <Route path="/book_calendar" element={<BookCalendar/>} />
        <Route path="/book_dropdown" element={<BookDropdown/>} />
        <Route path="/approve" element={<Approve/>} />
        <Route path="/staff" element={<UserStatusEditor/>} />
        <Route path="*" element={<h1>You have entered a wrong url</h1>} />
      </Routes>
      </LoginContextProvider>
    </div>
  );
}

export default App;


