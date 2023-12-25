import React, {useState} from 'react';
import {useEffect} from 'react';
import axiosPublic from '../../utils/useAxios';
import './RejestracjaUzytkownika.css';

const RegisterUser = () => {
    const client = axiosPublic;
    const [userData, setUserData] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        haslo: '',
        pesel: '',
        numerTelefonu: '',
        dataUrodzenia: '',
        dataZalozeniaKonta: '',
        plec: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = async () => {
        try {
            const response = await client.post('/api/v1/uzytkownik/zarejestruj', userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <div className="split-container">
            <div className="logo-container">
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo"
                     style={{width: '50%', height: 'auto'}}/>
            </div>
            <div className={"form-container"}>
                <h1 className="page-info">Utwórz nowe konto</h1>
                <form>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <input type="text" name="imie" value={userData.imie} onChange={handleInputChange}
                               placeholder="Imię"/>
                        <input type="text" name="nazwisko" value={userData.nazwisko} onChange={handleInputChange}
                               placeholder="Nazwisko"/>
                        <input type="email" name="email" value={userData.email} onChange={handleInputChange}
                               placeholder="Email"/>
                        <input type="password" name="haslo" value={userData.haslo} onChange={handleInputChange}
                               placeholder="Hasło"/>
                        <input type="password" name="hasloConfirm" value={userData.haslo} onChange={handleInputChange}
                               placeholder="Potwierdź hasło"/>
                        <input type="text" name="pesel" value={userData.pesel} onChange={handleInputChange}
                               placeholder="PESEL"/>
                        <input type="text" name="numerTelefonu" value={userData.numerTelefonu}
                               onChange={handleInputChange} placeholder="Numer Telefonu"/>
                        <div className="form-double-column" style={{display: 'flex', gap: '20px'}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label className="form-info">Data Urodzenia:</label>
                                <input className={"input-birth-date"} type="date" name="dataUrodzenia"
                                       value={userData.dataUrodzenia}
                                       onChange={handleInputChange} placeholder="Data Urodzenia"/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label className="form-info">Płeć:</label>
                                <select className={"input-plec"} name="plec" value={userData.plec}
                                        onChange={handleInputChange}>
                                    <option value="MEZCZYZNA">Mężczyzna</option>
                                    <option value="KOBIETA">Kobieta</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleSubmit}>Zarejestruj</button>
                    <div className="line-below-button"></div>
                    <p className="login-text">
                        Masz już konto? <a href="/" className="login-link">Zaloguj się</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
