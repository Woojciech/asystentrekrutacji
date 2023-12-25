import React from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
        const navigate = useNavigate();

        const handleNavigation = (path) => {
            navigate(path);
        };

        return (
            <div>
                <h1>Asystent rekrutacji PWr</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <button onClick={() => handleNavigation('/rejestracja/rejestracja')}>Zarejestruj się
                    </button>
                    <button onClick={() => handleNavigation('/kierunek/register')}>Zarejestruj kierunek
                    </button>
                    <button onClick={() => handleNavigation('/dane-rekrutacyjne/register')}>Zarejestruj dane
                        rekrutacyjne
                    </button>
                    <button onClick={() => handleNavigation('/raport/generuj-raport')}>Wygeneruj raport
                    </button>
                </div>
            </div>

        );
    };

export default Home;
