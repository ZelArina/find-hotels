import React, {useState, useEffect} from "react";
import './favourites.css';
import HotelInfo from "../hotelInfo/hotelInfo";

const Favourites = ({ hotelId, data, dataAPI, date, like, onFavLike}) => {
    const [activeRaiting, setActiveRaiting] = useState(true);
    const [activePrice, setActivePrice] = useState(false);
    const [opacity, setOpacity] = useState(true);    
    const [liked, setLiked] = useState('');
    const [hotel, setHotel] = useState('');
    const [favId, setFavId] = useState([]);
    const [arrSorted, setArrSorted] = useState([]);
    let favHotel = {};

    const sorted = () => {
        let sortedProducts = [...arrSorted];
        sortedProducts.sort((a,b) => {
            console.log(a.priceFrom);
            return(a.priceFrom - b.priceFrom)});
        console.log(sortedProducts);
        setArrSorted(sortedProducts);
    }

    useEffect(() => {
        setArrSorted(dataAPI);
    }, [dataAPI])

    useEffect(() => {
        if(hotelId && like){
            setFavId([...favId, hotelId]);
        }
    }, [hotelId,like])

    useEffect(() => {
        if(!like){
            setFavId((current) =>
                current.filter((item) => item !== hotelId )
            );
        }
    }, [hotelId, like])    

    useEffect(() => {
        if(!liked && hotel){
            setFavId((current) =>
                current.filter((item) => item !== hotel)
            );
            onFavLike(liked, hotel);
            setLiked(!liked);
        }
    }, [hotel, liked]) 

    const onCounterLiked = (counterLikes) => {
        if(counterLikes > 0){
            setLiked(true);
        }else{
            setLiked(false);
        }
    }

    const onSetHotelId = (id) => {
        setHotel(id);
    }

    const turnActiveRaiting = () => {
        setActivePrice(false);
        // sorted();
        if (activeRaiting){
            setOpacity(!opacity);
        }else{
            setActiveRaiting(!activeRaiting);
            setOpacity(true);
        }
    }
    const turnActivePrice = () => {
        setActiveRaiting(false);
        sorted();
        if (activePrice){
            setOpacity(!opacity);
        }else{
            setActivePrice(!activePrice);
            setOpacity(true);
        }
    }

    return(
        <div className="liked">
            <p>Избранное</p>
            <div className="raiting">
                <button onClick={turnActiveRaiting}
                        className={activeRaiting?"raitingBtn active":"raitingBtn"}>
                    Рейтинг
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7.24264L12.4393 8.3033L9.25736 5.12132L6.07538 8.3033L5.01472 7.24264L9.25736 3L13.5 7.24264Z" fill="black" 
                            fill-opacity={(activeRaiting && opacity)?"1":"0.32"}/>
                        <path d="M13.5 10.8325L12.4393 9.77181L9.25736 12.9538L6.07538 9.77181L5.01472 10.8325L9.25736 15.0751L13.5 10.8325Z" fill="black"
                            fill-opacity={activeRaiting?(opacity?"0.32":"1"):"0.32"}/>
                    </svg>
                </button>
                <button onClick={turnActivePrice}
                        className={activePrice?"raitingBtn active":"raitingBtn"}>
                    Цена
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7.24264L12.4393 8.3033L9.25736 5.12132L6.07538 8.3033L5.01472 7.24264L9.25736 3L13.5 7.24264Z" fill="black" 
                            fill-opacity={(activePrice && opacity)?"1":"0.32"}/>
                        <path d="M13.5 10.8325L12.4393 9.77181L9.25736 12.9538L6.07538 9.77181L5.01472 10.8325L9.25736 15.0751L13.5 10.8325Z" fill="black" 
                            fill-opacity={activePrice?(opacity?"0.32":"1"):"0.32"}/>
                    </svg>
                </button>   
            </div>
            <div className="hotelsLiked">
                {favId.map((i, index) => {
                    favHotel = arrSorted.find(item => +item.hotelId === +i);
                    return(
                        <div key={index} className="favHotelInfo">
                            <HotelInfo onCounterLiked={onCounterLiked} onSetHotelId={onSetHotelId} data={data} dataAPI={favHotel} date={date} favLike={true}/>
                            <div className="bottomLine"></div>
                        </div>
                    )
                })
                }
            </div>
        </div>
        
    )
}

export default Favourites;
