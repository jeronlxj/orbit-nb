import React from 'react';
import axios from 'axios'
import { UserAuthenication } from '../LoginContext';

import Navbar from "../config/navbar";
import {ListDisplay, CalenderDisplay} from "../config/booking_display";

axios.defaults.withCredentials = true;

const Account = () => {
  const { user, logout } = UserAuthenication();
<<<<<<< HEAD
=======
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
        e.preventDefault();  
        await logout(auth);
        navigate('/');
    } catch (e) {
        alert(e);
    }
  }; 

  const goToRoom = () => {
    navigate('/room/');
  }

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/display', {
      'method' : 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(resp => resp.json())
  .then(resp => setDatas(resp))
  .then(resp => console.log(datas))
  .catch(error => alert(error))
}, [])
>>>>>>> e81e40fe4cd5edc0f59beb960c552b7bc2a7fee5

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar/>
      <ListDisplay/> 
      <CalenderDisplay/>    
    </div>
  );
};

export default Account;
