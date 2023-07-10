import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Approve from "./components/Approve";
import BookForm from "./components/Book/book_form";
import UserStatusEditor from './components/Staff/Staff';
import BookDropdown from "./components/Book/book_dropdown";
import BookCalendar from "./components/Book/book_calendar";
import Profile from "./components/profile/Profile";
import EditPasword from "./components/profile/EditPassword";
import EditDetails from './components/profile/EditDetails';
import BookEdit from './components/Book/book_edit';
import StaffHome from "./components/Staff/staffHome";
import AddFacility from "./components/Staff/addFacility";
import EditFacility from './components/Staff/editFacility';
import Rome from "./components/poststuff";
import { LoginContextProvider } from './LoginContext';
import { ChatContextProvider } from './components/Chat/ChatContext';
import StaffApprove from './components/staffApprove';
import ChatHome from "./components/Chat/ChatHome";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <div className="App">    
      <LoginContextProvider>
      <ChatContextProvider>
      <Routes>
        <Route exact path="/" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/book_form" element={<BookForm/>} />
        <Route path="/book_calendar" element={<BookCalendar/>} />
        <Route path="/book_dropdown" element={<BookDropdown/>} />
        <Route path="/book_edit" element={<BookEdit/>} />
        <Route path="/approve" element={<Approve/>} />
        <Route path="/staffapprove" element={<StaffApprove/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editpassword" element={<EditPasword/>} />
        <Route path="/editdetails" element={<EditDetails/>} />
        <Route path="/Rome" element={<Rome/>} />
        <Route path="/staff" element={<UserStatusEditor/>} />
        <Route path="/StaffHome" element={<StaffHome/>} />
        <Route path="/addFacility" element={<AddFacility/>} />
        <Route path="/editFacility" element={<EditFacility/>} />
        <Route path="/chatHome" element={<ChatHome/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<h1>You have entered a wrong url</h1>} />
      </Routes>
      </ChatContextProvider>
      </LoginContextProvider>
    </div>
  );
}

export default App;

