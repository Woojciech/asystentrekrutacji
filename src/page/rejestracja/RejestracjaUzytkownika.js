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
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo" />
            </div>
            <div>
                <h1>Utwórz nowe konto</h1>
                <form>
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
                    <input type="text" name="numerTelefonu" value={userData.numerTelefonu} onChange={handleInputChange}
                           placeholder="Numer Telefonu"/>
                    <input type="date" name="dataUrodzenia" value={userData.dataUrodzenia} onChange={handleInputChange}
                           placeholder="Data Urodzenia"/>
                    <input type="date" name="dataZalozeniaKonta" value={userData.dataZalozeniaKonta}
                           onChange={handleInputChange} placeholder="Data Założenia Konta"/>
                    <select name="plec" value={userData.plec} onChange={handleInputChange}>
                        <option value="MEZCZYZNA">Mężczyzna</option>
                        <option value="KOBIETA">Kobieta</option>
                    </select>
                    <button type="button" onClick={handleSubmit}>Zarejestruj</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
