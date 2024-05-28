import React, { useEffect, useState } from "react";
import './enter.css';
import { Link } from "react-router-dom";

const Enter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Логин не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 200)
  }, []) 
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email' :
        setEmailDirty(true);
        break
      case 'password' :
        setPasswordDirty(true);
        break
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const expression = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z],{2,8})?$/;
    if (!expression.test(String(e.target.value).toLowerCase())){
      setEmailError('Неверный логин');
    } else {
      setEmailError('');
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    const expression = /[А-ЯЁ]/i;
    if (!e.target.value || e.target.value.length < 8){
      setPasswordError('Пароль должен содержать минимум 8 символов');
    } else if (expression.test(String(e.target.value))){
      setPasswordError('Могут быть использованы только латинские символы');
    } else {
      setPasswordError('');
    }
  }

  useEffect(() => {
    if (emailError||passwordError){
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError])

  const onSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  }

  return (
    <main className="pageOne">
      <div className="enter">
        <p>Simple Hotel Check</p>
        <form className='enterForm'>
          <div className="loginPass">
            <div className={(emailDirty && emailError)?"login error":"login"}>
              <label for="login">Логин</label>
              <input 
                onChange={emailHandler} 
                onBlur={blurHandler} 
                type="email" 
                name="email" 
                value={email}/> 
              {(emailDirty && emailError) && <div className="errorMessage">{emailError}</div>}
            </div>
            <div className={(passwordDirty && passwordError)?"password error":"password"}>
              <label for="password">Пароль</label>
              <input 
                onChange={passwordHandler} 
                onBlur={blurHandler} 
                type="password" 
                name="password" 
                value={password}/>
              {(passwordDirty && passwordError) && <div className="errorMessage">{passwordError}</div>}
            </div>
          </div>
            <button variant="contained" component={Link} to="/findHotels"
                onClick={onSubmit} 
                disabled={!formValid} 
                type="submit" 
                className='btn btn-enter'>
                { formValid ? (<Link to="/simpleHotelCheck" >Войти</Link>) : (<span>Войти</span>)}
            </button>
          
        </form>
      </div>
    </main>
  )
};


export default Enter;