import RegisterKierunek from './page/kierunek/RegisterKierunek';
import RegisterDaneRekrutacyjne from './page/daneRekrutacyjne/RegisterDaneRekrutacyjne';
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';
import Home from './page/home/Home';
import RegisterUser from "./page/rejestracja/RejestracjaUzytkownika";
import GenerujRaport from "./page/raport/RaportGenerator";
import Raport from "./page/raport/Raport";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/rejestracja/rejestracja" element={<RegisterUser/>}/>
                <Route path="/kierunek/register" element={<RegisterKierunek/>}/>
                <Route path="/dane-rekrutacyjne/register" element={<RegisterDaneRekrutacyjne/>}/>
                <Route path="/raport/generuj-raport" element={<GenerujRaport/>}/>
                <Route path="/raport/raport/:id" element={<Raport/>}/>
            </Routes>
        </Router>
    );
}

export default App;
