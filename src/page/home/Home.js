import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="split-container-home">
            <div className="logo-container-home">
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo"
                     style={{width: '50%', height: 'auto'}}/>
            </div>
            <div className="button-container-home">
                <h1 style={{marginBottom: '20px'}}>Asystent rekrutacji PWr</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <button className="button-home" onClick={() => handleNavigation('/rejestracja/rejestracja')}>
                        Zarejestruj się
                    </button>
                    <button className="button-home" onClick={() => handleNavigation('/kierunek/register')}>
                        Zarejestruj kierunek
                    </button>
                    <button className="button-home" onClick={() => handleNavigation('/dane-rekrutacyjne/register')}>
                        Zarejestruj dane rekrutacyjne
                    </button>
                    <button className="button-home" onClick={() => handleNavigation('/raport/generuj-raport')}>
                        Wygeneruj raport
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
