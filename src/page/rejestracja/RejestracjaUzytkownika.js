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
        hasloConfirm: '',
        pesel: '',
        numerTelefonu: '',
        dataUrodzenia: '',
        plec: ''
    });

    const [passwordError, setPasswordError] = useState(false);

    const [validationStatus, setValidationStatus] = useState({
        imie: true,
        nazwisko: true,
        email: true,
        haslo: true,
        hasloConfirm: true,
        pesel: true,
        numerTelefonu: true,
        dataUrodzenia: true,
        plec: true
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
        setValidationStatus({...validationStatus, [name]: true});
        setPasswordError(false);
    };

    const handleSubmit = async () => {
        // Check for empty fields
        const isEmptyField = Object.values(userData).some(value => value === '');

        if (userData.haslo !== userData.hasloConfirm) {
            setPasswordError(true);
            return;
        }

        if (isEmptyField) {
            setValidationStatus(prevStatus => {
                const updatedStatus = {};
                for (const key in prevStatus) {
                    updatedStatus[key] = userData[key] !== '';
                }
                return updatedStatus;
            });
        } else {
            try {
                const response = await client.post('/api/v1/uzytkownik/zarejestruj', userData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };


    useEffect(() => {
    }, []);

    return (
        // <link rel="stylesheet" type="text/css" href="RejestracjaUzytkownika.css">
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
                               placeholder="Imię" className={validationStatus.imie ? '' : 'invalid-input'}/>
                        <input type="text" name="nazwisko" value={userData.nazwisko} onChange={handleInputChange}
                               placeholder="Nazwisko" className={validationStatus.nazwisko ? '' : 'invalid-input'}/>
                        <input type="email" name="email" value={userData.email} onChange={handleInputChange}
                               placeholder="Email" className={validationStatus.email ? '' : 'invalid-input'}/>
                        <input type="password" name="haslo" value={userData.haslo} onChange={handleInputChange}
                               placeholder="Hasło" className={validationStatus.haslo ? '' : 'invalid-input'}/>
                        {passwordError && <p className="error-message">Passwords do not match</p>}
                        <input type="password" name="hasloConfirm" value={userData.hasloConfirm}
                               onChange={handleInputChange}
                               placeholder="Potwierdź hasło"
                               className={validationStatus.hasloConfirm ? '' : 'invalid-input'}/>
                        <input type="text" name="pesel" value={userData.pesel} onChange={handleInputChange}
                               placeholder="PESEL" className={validationStatus.pesel ? '' : 'invalid-input'}/>
                        <input type="text" name="numerTelefonu" value={userData.numerTelefonu}
                               onChange={handleInputChange} placeholder="Numer Telefonu"
                               className={validationStatus.numerTelefonu ? '' : 'invalid-input'}/>
                        <div className="form-double-column" style={{display: 'flex', gap: '2vw'}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label className="form-info">Data Urodzenia:</label>
                                <input
                                    className={`input-birth-date ${validationStatus.dataUrodzenia ? '' : 'invalid-input'}`}
                                    type="date" name="dataUrodzenia"
                                    value={userData.dataUrodzenia}
                                    onChange={handleInputChange} placeholder="Data Urodzenia"/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label className="form-info">Płeć:</label>
                                <select className={`input-plec ${validationStatus.plec ? '' : 'invalid-input'}`}
                                        name="plec"
                                        value={userData.plec}
                                        onChange={handleInputChange}>
                                    <option disabled selected value="">Wybierz</option>
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
        // </link>
    );
};

export default RegisterUser;
