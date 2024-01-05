import React, { useEffect } from 'react';
import axiosPublic from '../../utils/useAxios';
import { useParams } from 'react-router-dom';
import './Raport.css';

const Raport = () => {
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/api/v1/raport/generujRaport?raportId=${id}`);
                const jsonData = response.data;
                console.log(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (


        <div className="split-container-generatedraport">
            <div className="logo-container-generatedraport">
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo"
                     style={{width: '50%', height: 'auto'}}/>
            </div>
            <div>
                <h1>Raport for ID: {id}</h1>
            </div>
        </div>
    );
};

export default Raport;