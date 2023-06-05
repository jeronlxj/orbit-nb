import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from "../config/firebase";
import { UserAuthenication } from '../LoginContext';

import {tailw} from "../config/styles";
import Navbar from "../config/navbar";
import BookingDisplay from "../config/booking_display";

axios.defaults.withCredentials = true;

const Home = () => {

    // handling user navigation
    const { user, logout } = UserAuthenication();
    const navigate = useNavigate();

    // handling display of data from backend
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetch('api/display', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setDatas(resp))
    .catch(error => alert(error))
    }, [])

    // handling POST of data to create venues via a form
    // create a default Venue input object
    const initialVenue = {
        name: "",
        location: "",
        closed: false,
        total_pax: 0,
        host: "",
    }
    const [values, setValues] = useState(initialVenue);

    // handle input change of the form
    const handleChange = (e) => {
        const {name, value} = e.target;

        setValues({
        ...values,
        [name]: value,
        })
        console.log(values)
    }

    // handle the submit of the form to django
    const handleSubmit = (e) => {
        //e.preventDefault();

        /*
        let formField = new FormData();
        formField.append('name',values.name)
        formField.append('location',values.location)
        formField.append('closed',values.closed)
        formField.append('total_pax',values.total_pax)
        formField.append('host',values.host)
        
        axios.post({
        method: 'post',
        url: `http://127.0.0.1:8000/api/venue`, 
        data: {
            formField
        }  
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        }); 
        

        
        fetch('http://127.0.0.1:8000/api/venue', {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(values)
        });
        */
        let formField = new FormData();
        formField.append('name',values.name)
        formField.append('location',values.location)
        formField.append('closed',values.closed)
        formField.append('total_pax',values.total_pax)
        formField.append('host',values.host)
        
        axios.post(`api/venue`, formField)
    };
    
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>

            <input type="text" name="name" onChange={handleChange} 
            placeholder='name' value={values.name}/>
            <input type="text" name="location" onChange={handleChange} 
            placeholder='location' value={values.location}/>
            <input type="checkbox" name="closed" onChange={handleChange} 
            placeholder='closed' value={values.closed}/>
            <input type="number" name="total_pax" onChange={handleChange} 
            placeholder='total_pax' value={values.total_pax}/>
            <input type="text" name="host" onChange={handleChange} 
            placeholder='host' value={values.host}/>

            <button type="submit">Add</button>
            </form>
        </div>

        <div>
            {datas.map(datas => {
            return <h2>{datas.name}</h2>
            })}
        </div>
        </>
    )
}