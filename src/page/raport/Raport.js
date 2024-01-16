import React, {useEffect, useState} from 'react';
import axiosPublic from '../../utils/useAxios';
import {useParams} from 'react-router-dom';
import './Raport.css';

const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
};

const extractYear = (dateArray) => {
    const [year] = dateArray;
    return year;
};

const Raport = () => {
    const client = axiosPublic;
    const {id} = useParams();
    const [raportData, setRaportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get(`/api/v1/raport/generujRaport?raportId=${id}`).catch(() => {
                });
                const jsonData = response.data;
                setRaportData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="split-container-generatedraport">
            <div className="logo-container-generatedraport">
                <img src={require('../../photos/logo-PWr-pion-bez-tla-207x300.png')} alt="Logo"
                     style={{width: '50%', height: 'auto'}}/>
            </div>
            <div className="right-container-generatedraport">
                <h2 className="raport-title-generatedraport">Raport z rekrutacji na kierunek
                    "{raportData && raportData.kierunek && raportData.kierunek.nazwa}" {raportData && raportData.dataRozpoczecia && extractYear(raportData.dataRozpoczecia)}/{raportData && raportData.dataRozpoczecia && extractYear(raportData.dataRozpoczecia) + 1}
                </h2>
                <div className="white-rectangle-generatedraport">
                    <div className="raport-content-generatedraport">
                        <h3 className="part-info-header-generatedraport">Podstawowe informacje o rekrutacji:</h3>
                        <div className="info-line-generatedraport">
                            <span><b>Data trwania rekrutacji:</b></span><br/>
                            <span>{raportData && raportData.dataRozpoczecia && formatDate(raportData.dataRozpoczecia)} - {raportData && raportData.dataZakonczenia && formatDate(raportData.dataZakonczenia)}</span>
                        </div>
                        <div className="info-line-generatedraport">
                            <span><b>Limit osób:</b></span><br/>
                            <span>{raportData && raportData.limitOsob}</span>
                        </div>
                        <div className="info-line-generatedraport">
                            <span><b>Liczba kandydatów:</b></span><br/>
                            <span>{raportData && raportData.liczbaKandydatow}</span>
                        </div>
                        <div className="info-line-generatedraport">
                            <span><b>Liczba kandydatów na miejsce:</b></span><br/>
                            <span>{raportData && raportData.liczbaKatndydatowNaMiejsce}</span>
                        </div>
                        <div className="info-line-generatedraport">
                            <span><b>Średni wskaźnik rekrutacyjny przyjętych:</b></span><br/>
                            <span>{raportData && raportData.sredniWskaznikRekrutacyjny}</span>
                        </div>
                        <div className="info-line-generatedraport">
                            <span><b>Minimalny wskaźnik rekrutacyjny, aby dostać się na kierunek:</b></span><br/>
                            <span>{raportData && raportData.minimalnyWskaznikRekrutacyjny}</span>
                        </div>

                        <h3 className="part-info-header-generatedraport">Reguła wyliczania punktów rekrutacyjnych:</h3>

                        {raportData && raportData.kierunek.regulyWskaznikaRekrutacyjnego && raportData.kierunek.regulyWskaznikaRekrutacyjnego.length > 0 ? (
                            <table className="table-recruitment-points-generatedraport">
                                <thead>
                                <tr>
                                    <th>Przedmiot</th>
                                    <th>Poziom matury</th>
                                    <th>Waga</th>
                                </tr>
                                </thead>
                                <tbody>
                                {raportData.kierunek.regulyWskaznikaRekrutacyjnego.map((regula, index) => (
                                    <tr key={index}>
                                        <td>{regula.przedmiot}</td>
                                        <td>{regula.stopienMatury}</td>
                                        <td>{regula.waga}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data available for recruitment rules</p>
                        )}
                        <div className="points-counting-rule-generatedraport">
                            <h6><b>Reguła wyliczania punktów:</b></h6>
                            <h6><b>{raportData && raportData.kierunek.opis}</b></h6>
                            <h6>{raportData && raportData.kierunek.uwagiDoReguly}</h6>
                        </div>
                        <div className="honorowane-osiagniecia-generatedraport">
                            <h5>Honorowane osiągnięcia:</h5>
                            {raportData && raportData.kierunek.honorowaneOsiagniecia && raportData.kierunek.honorowaneOsiagniecia.length > 0 ? (
                                <ul>
                                    {raportData.kierunek.honorowaneOsiagniecia.map((osiagniecie, index) => (
                                        <li key={index}>
                                            {osiagniecie.nazwa} - {osiagniecie.opis} [liczba
                                            punktów za osiągnięcie: {osiagniecie.liczbaPunktow}]
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No data available for honored achievements</p>
                            )}
                        </div>

                        <h3 className="part-info-header-generatedraport">Informacja o przedmiotach realizowanych na
                            kierunku:</h3>
                        {raportData && raportData.kierunek && raportData.kierunek.przedmioty && raportData.kierunek.przedmioty.length > 0 ? (
                            <table className="lectures-table-generatedraport">
                                <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Semestr</th>
                                    <th>Liczba ECTS</th>
                                    <th>Opis</th>
                                </tr>
                                </thead>
                                <tbody>
                                {raportData.kierunek.przedmioty.map((przedmiot, index) => (
                                    <tr key={index} className="lecture-item">
                                        <td>{przedmiot.nazwa}</td>
                                        <td>{przedmiot.semestr}</td>
                                        <td>{przedmiot.liczbaECTS}</td>
                                        <td>{przedmiot.opis}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No information available about lectures on this study program.</p>
                        )}

                        <h3 className="part-info-header-generatedraport">Informacja o osobach rekrutujących się na
                            kierunek:</h3>

                        {raportData && raportData.aplikacjaNaKierunek && raportData.aplikacjaNaKierunek.length > 0 ? (
                            <table className="matura-exam-table-generatedraport">
                                <thead>
                                <tr>
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    <th>Wyniki z matury</th>
                                    <th>Suma punktów za <br/> honowowane osiągnięcia</th>
                                    <th>Wskaźnik rekrutacyjny</th>
                                    <th>Wynik rekrutacji</th>
                                </tr>
                                </thead>
                                <tbody>
                                {raportData.aplikacjaNaKierunek.map((aplikacja, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{aplikacja.imie}</td>
                                            <td>{aplikacja.nazwisko}</td>

                                            <td>
                                                <ul>
                                                    {aplikacja.daneRekrutacyjne.wynikiZMatury.map((wynik, idx) => (
                                                        <li key={idx}>
                                                            {wynik.przedmiot} ({wynik.stopienMatury}): {wynik.wartosc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>{aplikacja.daneRekrutacyjne.honorowaneOsiagniecia.length > 0 ? (
                                                <ul>
                                                    {aplikacja.daneRekrutacyjne.honorowaneOsiagniecia.map((osiagniecie, idx) => (
                                                        <li key={idx}>
                                                            {osiagniecie.nazwa} - {osiagniecie.opis}, Liczba
                                                            punktów: {osiagniecie.liczbaPunktow}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : 0}</td>
                                            <td>{aplikacja.wskaznikRekrutacyjny}</td>
                                            <td style={{color: aplikacja.wskaznikRekrutacyjny > raportData.minimalnyWskaznikRekrutacyjny ? 'green' : 'red'}}>
                                                {aplikacja.wskaznikRekrutacyjny > raportData.minimalnyWskaznikRekrutacyjny ? 'Przyjęty' : 'Odrzucony'}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data available for applicants</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Raport;