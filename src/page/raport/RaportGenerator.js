import React, { useState, useEffect } from 'react';
import './RaportGenerator.css';
import axiosPublic from "../../utils/useAxios";
import { useNavigate } from 'react-router-dom';


const GenerujRaport = () => {
    const client = axiosPublic;
    const [przeprowadzoneRekrutacje, setPrzeprowadzoneRekrutacje] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get("/api/v1/raport/wypiszRekrutacjeDoRaportu?userId=1").catch(() => {
                });
                const jsonData = response.data;
                setPrzeprowadzoneRekrutacje(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleGenerateRaport = (id) => {
        const newWindow = window.open(`/raport/raport/${id}`, '_blank');
        if (newWindow) {
            newWindow.focus();
        }
    };



    return (
        <div className="split-container-raport">
            <div className="logo-container-raport">
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo"
                     style={{width: '50%', height: 'auto'}}/>
            </div>

            <div className="right-container-raport">
                <h1>Generuj raport z rekrutacji</h1>
                <div className="white-rectangle-raport">
                    <hr/>
                    <div className="list-elements-container">
                        {przeprowadzoneRekrutacje.length > 0 ? (
                            przeprowadzoneRekrutacje.map(item => (
                                <div key={item.id} className="list-item">
                                    <span>{item.nazwaKierunku}</span>
                                    <span>{item.rok}</span>
                                    <button
                                        className="generate-raport-button-raport"
                                        onClick={() => handleGenerateRaport(item.id)}
                                    >
                                        Wygeneruj raport
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default GenerujRaport