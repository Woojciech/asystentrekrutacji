import RegisterKierunek from './page/kierunek/RegisterKierunek';
import RegisterDaneRekrutacyjne from './page/daneRekrutacyjne/RegisterDaneRekrutacyjne';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Home from './page/home/Home';
import ErrorPage from './page/error/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/kierunek/register" element={<RegisterKierunek/>} />
        <Route path="/dane-rekrutacyjne/register" element={<RegisterDaneRekrutacyjne/>} />
      </Routes>
    </Router>
  );
}

export default App;
