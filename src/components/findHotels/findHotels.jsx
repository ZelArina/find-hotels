import React, {useEffect, useState} from "react";
import './findHotels.css';

const FindHotels = ({onFind}) => {
    let [date, setDate] = useState(() => {
        const date = new Date();
        const month = (date.getMonth()+1).toString(); 
        const day = date.getDate().toString();
        return `${date.getFullYear()}-${month.length === 2 ? month : `0${month}` }-${day.length === 2 ? day : `0${day}`}`
    })
    const [formValid, setFormValid] = useState(false);
    const [dataToFind, setDataToFind] = useState(['Москва', date, '1']);
    
    useEffect(() => {
        onFind(dataToFind);
    }, [dataToFind])

    const onSubmit = (event) => {
        event.preventDefault();
        const dataArr = Array.from(serializeForm(event.target).entries());
        const newData = [dataArr[0][1], dataArr[1][1], dataArr[2][1]];
        setDataToFind(newData);
    }

    const serializeForm = (formNode) => {
        return new FormData(formNode)
    }

    const checkValidity = (event) => {
        const formNode = event.target.form;
        const isValid = formNode.checkValidity();
        setFormValid(isValid);
    }

    return(
        <div className="filter">
            <form className='filterForm' onInput={checkValidity} onSubmit={onSubmit}>
                <label for="location">Локация</label>
                <input 
                    type="text" 
                    name="location"
                    id="location" 
                    placeholder="Москва"
                /> 
                <label for="date">Дата заселения</label>
                <input  
                    type="date" 
                    name="date"
                    id="date"
                    value= {date}
                    onChange={e => setDate(e.target.value)}
                />
                <label for="number">Количество дней</label>
                <input 
                    type="number" 
                    name="number" 
                    id="number" 
                    placeholder="1"
                    min="1"
                />
                <button 
                    type="submit"
                    disabled={!formValid}
                    className='btn'
                >Найти</button>
            </form>
        </div>
       
    )
}

export default FindHotels;
