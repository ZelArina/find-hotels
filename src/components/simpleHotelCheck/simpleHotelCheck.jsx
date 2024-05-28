import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './simpleHotelCheck.css';
import axios from "axios";
import FindHotels from "../findHotels/findHotels";
import Favourites from "../favourites/favourites";
import HotelsList from "../hotelsList/hotelsList";

const SimpleHotelCheck = () => {
    const [dataToFind, setDataToFind] = useState([]);
    const [dataAPI, setDataAPI] = useState([]);
    const [like, setLike] = useState('');
    const [hotelId, setHotelId] = useState(0);
    const [favLike, setFavLike] = useState(0);
    const [favId, setFavId] = useState(0);
    
    const [date, setDate] = useState(`${new Date().toLocaleString('ru-RU', { month: 'long', day: 'numeric' })} ${new Date().getFullYear()}`);

    const onFind = (dataToFind) => {
        setDataToFind(dataToFind);
    }

    useEffect(() => {
        let checkIn = new Date(dataToFind[1]);
        let checkOut = new Date;
        checkOut.setDate(checkIn.getDate()+(+dataToFind[2])); 
        let newCheckOut = convertDate(checkOut);
        axios.get(`https://engine.hotellook.com/api/v2/cache.json?location=${dataToFind[0]}&currency=rub&checkIn=${dataToFind[1]}&checkOut=${newCheckOut}&limit=10`)
        .then(response => setDataAPI(response.data))
        .catch(error => console.error(error));
    }, [dataToFind]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(new Date(dataToFind[1]) >= new Date()){
            let monthName = new Date(dataToFind[1]).toLocaleString('ru-RU', { month: 'long', day: 'numeric' });
            setDate(` ${monthName} ${dataToFind[1].slice(0,4)}`);
        }
    }, [dataToFind])

    const convertDate = (date) => {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
      
        var mmChars = mm.split('');
        var ddChars = dd.split('');
      
        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }
    
    const onSetHotelId = (id) => {
        setHotelId(id);
    }

    const onSetLike = (like) => {
        setLike(like);
    } 

    const onFavLike = (like, hotel) => {
        setFavLike(like);
        setFavId(hotel);
    }

    return(
        <div className="container">
            <header>
                <div className="header-wrapper">
                    <div className="label">Simple Hotel Check</div>
                    <div className="exit">
                        <Link to='/'>Выйти</Link>
                        <Link to='/' className="iconExit ex"/>
                    </div>
                </div>
            </header>
            <main>
                <div className="main-wrapper">
                    <div className="left-column">
                        <FindHotels onFind={onFind}/>
                        <Favourites hotelId={hotelId} data={dataToFind} dataAPI={dataAPI} date={date} like={like} onFavLike={onFavLike}/>
                    </div>
                    <div className="right-column">
                        <HotelsList data={dataToFind} dataAPI={dataAPI} date={date} onSetHotelId={onSetHotelId} onSetLike={onSetLike} favId={favId} favLike={favLike}/>
                    </div>
                </div>
            </main>
        </div>
    )
} 

export default SimpleHotelCheck;
