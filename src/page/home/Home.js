import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h1>Asystent rekrutacji PWr</h1>
            <ul>
                <li><button onClick={() => handleNavigation('/rejestracja/rejestracja')}>Zarejestruj się</button></li>
                <li><button onClick={() => handleNavigation('/kierunek/register')}>Zarejestruj kierunek</button></li>
                <li><button onClick={() => handleNavigation('/dane-rekrutacyjne/register')}>Zarejestruj dane rekrutacyjne</button></li>
                <li><button onClick={() => handleNavigation('/raport/generuj-raport')}>Wygeneruj raport</button></li>
            </ul>
        </div>
    );
};

export default Home;
