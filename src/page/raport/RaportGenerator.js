import React from 'react'
import {useEffect} from 'react'
import axiosPublic from '../../utils/useAxios';
import './RaportGenerator.css';


const GenerujRaport = () => {
    const client = axiosPublic;

    useEffect(() => {

    })

    return (
        <div className="split-container">
            <div className="logo-container">
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo"
                     style={{width: '50%', height: 'auto'}}/>
            </div>

            <div className={"right-container"}>
                <h1>Generuj raport z rekrutacji</h1>
                <div className="white-rectangle"></div>
            </div>
        </div>
    )
}

export default GenerujRaport