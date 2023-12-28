import React, { useState } from 'react'
import { useEffect } from 'react';
import axiosPublic from '../../utils/useAxios';
import Form from 'react-bootstrap/Form';

const RegisterDaneRekrutacyjne = () => {
  const client = axiosPublic;

  // const [przedmiotyMaturalne, setPrzedmiotyMaturalne] = useState(["MATEMATYKA", "FIZYKA", "CHEMIA"])
  // const [stopnieMatury, setStopnieMatury] = useState(["PODSTAWOWA", "ROZSZERZONA"])
  // const [stopnieStudiow, setStopnieStudiow] = useState(["I", "II", "III"])
  // const [honorowaneOsiagniecia, setHonorowaneOsiagniecia] = useState([{ id: 1, nazwa: "Olimpiada Fizyczna", opis: "Laureat olimpiady fizycznej"}, { id: 2, nazwa: "Olimpiada Chemiczna", opis: "Laureat olimpiady chemicznej"}])

  const [formData, setFormData] = useState()
  const [przedmiotyMaturalne, setPrzedmiotyMaturalne] = useState()
  const [stopnieMatury, setStopnieMatury] = useState()
  const [stopnieStudiow, setStopnieStudiow] = useState()
  const [honorowaneOsiagniecia, setHonorowaneOsiagniecia] = useState()

  const [wybranyPrzedmiot, setWybranyPrzedmiot] = useState()
  const [wybranyStopien, setWybranyStopien] = useState()
  const [wybranyWynik, setWybranyWynik] = useState()
  const [wprowadzoneWyniki, setWprowadzoneWyniki] = useState([])

  function saveSubjectChoice(subjectIdx) {
    console.log(subjectIdx);
    console.log(przedmiotyMaturalne[subjectIdx]);
    setWybranyPrzedmiot(przedmiotyMaturalne[subjectIdx]);
  }

  function saveStopienChoice(stopienIdx) {
    console.log(stopienIdx);
    console.log(stopnieMatury[stopienIdx]);
    setWybranyStopien(stopnieMatury[stopienIdx]);
  }

  function saveScoreChoice(score) {
    console.log(score);
    setWybranyWynik(score);
  }

  function registerScore(event) {
    event.preventDefault();
    let score = {
      przedmiot: wybranyPrzedmiot,
      stopienMatury: wybranyStopien,
      wartosc: wybranyWynik
    }

    setWprowadzoneWyniki(wprowadzoneWyniki => [...wprowadzoneWyniki, score])
    // console.log(wprowadzoneWyniki.indexOf(score))
    // if(wprowadzoneWyniki.indexOf(score) == -1) {
    //   console.log('test')
    //   setWprowadzoneWyniki(wprowadzoneWyniki => [...wprowadzoneWyniki, score])
    //   console.log(wprowadzoneWyniki)
    //   let ul = document.getElementById("examResults");
    //   ul.innerHTML += `<li>${score.przedmiot}, ${score.stopienMatury}, ${score.wartosc}<button>test</button></li>`
    // } else {
    //   console.log('already included');
    // }

    // console.log('saving score', score)
    // wprowadzoneWyniki.push(score);

    // let ul = document.getElementById("examResults");
    // ul.innerHTML += `<li>${score.przedmiot}, ${score.stopienMatury}, ${score.wartosc}<button>test</button></li>`
  }

  const [wybranaNazwaUczelni, setWybranaNazwaUczelni] = useState()
  const [wybranaNazwaKierunku, setWybranaNazwaKierunku] = useState()
  const [wybranaNazwaWydzialu, setWybranaNazwaWydzialu] = useState()
  const [wybranyStopienStudiow, setWybranyStopienStudiow] = useState()
  const [wybranaSredniaZeStudiow, setWybranaSredniaZeStudiow] = useState()
  const [wybranaOcenaKoncowa, setWybranaOcenaKoncowa] = useState()
  const [wprowadzoneUkonczoneStudia, setWprowadzoneUkonczoneStudia] = useState([])
  
  const wybranaOcenaKoncowaMappings = new Map([
    [2.0, 'TWO'],
    [3.0, 'THREE'],
    [3.5, 'THREE_POINT_HALF'],
    [4.0, 'FOUR'],
    [4.5, 'FOUR_POINT_HALF'],
    [5.0, 'FIVE'],
    [5.5, 'FIVE_POINT_HALF']
  ]); 

  function registerUkonczoneStudia(event) {
    event.preventDefault()


    let studies = {
      nazwaUczelni: wybranaNazwaUczelni,
      stopienStudiow: wybranyStopienStudiow,
      sredniaZCalychStudiow: wybranaSredniaZeStudiow,
      ocenaKoncowa: wybranaOcenaKoncowaMappings.get(wybranaOcenaKoncowa),
      kierunek: wybranaNazwaKierunku,
      wydzial: wybranaNazwaWydzialu
    }

    console.log(studies)

    if(studies.nazwaUczelni == undefined || studies.stopnieStudiow == undefined || studies.sredniaZCalychStudiow == undefined ||
      studies.ocenaKoncowa == undefined || studies.kierunek == undefined || studies.wydzial == undefined) {
      console.log(studies)
      setWprowadzoneUkonczoneStudia(wprowadzoneUkonczoneStudia => [...wprowadzoneUkonczoneStudia, studies])
    } else {
      console.log('invalid studies')
    }
  }

  const [wybraneHonorowaneOsiagniecie, setWybraneHonorowaneOsiagniecie] = useState()
  const [wybraneHonorowaneOsiagniecia, setWybraneHonorowaneOsiagniecia] = useState([])

  function saveHonoredAchievement(event) {
    event.preventDefault();
    console.log(wybraneHonorowaneOsiagniecie)
    setWybraneHonorowaneOsiagniecia(wybraneHonorowaneOsiagniecia => [...wybraneHonorowaneOsiagniecia, wybraneHonorowaneOsiagniecie])
  }

  useEffect(() => {
    fetchFormData();
  }, [])

  const fetchFormData = async () => {
    const formData = await client.get("/api/v1/dane-rekrutacyjne/form-data")
      .catch((error) => {});
    // let data = formData.data;

    // setFormData(formData?.data);
    setPrzedmiotyMaturalne(formData?.data?.przedmiotyMaturalne);
    setStopnieMatury(formData?.data?.stopnieMatury);
    setStopnieStudiow(formData?.data?.stopnieStudiow);
    setHonorowaneOsiagniecia(formData?.data?.honorowaneOsiagniecia);

    // console.log(formData);
    console.log(przedmiotyMaturalne);
    console.log(stopnieMatury);
    console.log(stopnieStudiow);
    console.log(honorowaneOsiagniecia);
  }

  function getExamResultsListGroup() {
    return (
      <>
        <ol className='list-group list-group-numbered'>
          <div className='row'>
            <div className='col-4'>
              <label class="form-label fw-bold">Przedmiot maturalny</label>
              <Form.Select onChange={e => saveSubjectChoice(e.target.value)}>
                {
                  przedmiotyMaturalne?.map((przedmiot, idx) => (
                    <option value={idx}>{przedmiot}</option>
                  ))
                }
              </Form.Select>
            </div>
            
            <div className='col-4'>
              <label class="form-label fw-bold">Stopień matury</label>
              <Form.Select onChange={e => saveStopienChoice(e.target.value)}>
                {
                  stopnieMatury?.map((stopien, idx) => (
                    <option value={idx}>{stopien}</option>
                  ))
                }
              </Form.Select>
            </div>

            <div className="col-4">
              <label class="form-label fw-bold">Procentowy wynik</label>
              <input type="number" class="form-control" id="average" placeholder="Wprowadź wynik" min={0} max={100} onChange={e => saveScoreChoice(e.target.value)}/>
            </div>
          </div>
        </ol>
        <div class="form-text">Uzupełnij wyniki z matury, zostaną one później wykorzystane przy obliczaniu wskaźnika rekrutacyjnego</div>
      </>
    )
  }

  function getFinishedStudiesListGroup() {
    return (
      <>
        <ol className='list-group list-group-numbered'>
          <div className='row'>
            <div class="col-4 form-group">
              <label class="form-label fw-bold">Nazwa uczelni</label>
              <input type="text" class="form-control" id="nazwaUczelni" placeholder="Uniwersystet Warszawski" onChange={e => setWybranaNazwaUczelni(e.target.value)}/>
            </div>

            <div class="col-4 form-group">
              <label class="form-label fw-bold">Nazwa kierunku</label>
              <input type="text" class="form-control" id="nazwaKierunku" placeholder="Matematyka Stosowana" onChange={e => setWybranaNazwaKierunku(e.target.value)}/>
            </div>

            <div class="col-4 form-group">
              <label class="form-label fw-bold">Nazwa wydziału</label>
              <input type="text" class="form-control" id="nazwaWydzialu" placeholder="Wydział Matematyki" onChange={e => setWybranaNazwaWydzialu(e.target.value)}/>
            </div>
          </div>

          <div className='row mt-2'>

            <div className='col-4'>
              <label class="form-label fw-bold">Stopień studiów</label>
              <Form.Select onChange={e => setWybranyStopienStudiow(e.target.value)}>
                {
                  stopnieStudiow?.map((stopien, idx) => (
                    <option value={stopien}>{stopien}</option>
                  ))
                }
              </Form.Select>
            </div>

            <div className="col-4">
              <label class="form-label fw-bold">Średnia ze studiów</label>
              <input type="number" class="form-control" id="srednia" placeholder="4.23" min={2.0} max={5.5} step={.1} onChange={e => setWybranaSredniaZeStudiow(e.target.valueAsNumber)}/>
            </div>

            <div className="col-4">
              <label class="form-label fw-bold">Ocena końcowa</label>
              <input type="number" class="form-control" id="ocenaKoncowa" placeholder="5.0" min={2.0} max={5.5} step={0.5} onChange={e => setWybranaOcenaKoncowa(e.target.valueAsNumber)}/>
            </div>
          </div>
        </ol>
        <div class="form-text">Wprowadź ukończone studia, które mogą być wzięte pod uwagę przy rekrutacji na studia wyższego stopnia.</div>
      </>
    )
  }

  function getHonoredAchievementsListGroup() {
    return (
      <>
        <ol className='list-group list-group-numbered'>
          <div className='row'>
            <div className='col-4'>
              <label class="form-label fw-bold">Honorowane osiągnięcie</label>
              <Form.Select onChange={e => setWybraneHonorowaneOsiagniecie(e.target.value)}>
                {
                  honorowaneOsiagniecia?.map((osiagniecie, idx) => (
                    <option value={osiagniecie}>{osiagniecie.nazwa}</option>
                  ))
                }
              </Form.Select>
            </div>
    
          </div>
        </ol>
        <div class="form-text">Uzupełnij wyniki z matury, zostaną one później wykorzystane przy obliczaniu wskaźnika rekrutacyjnego</div>
      </>
    )
  }

  function handleSubmit(event) {
    event.preventDefault();
    let honorowaneOsiagnieciaIdentifiers = [];
    for (const osiagniecie of wybraneHonorowaneOsiagniecia) {
        honorowaneOsiagnieciaIdentifiers.push(osiagniecie.id);
    }

    // let data = {
    //   wynikiZMatury: wprowadzoneWyniki,
    //   ukonczoneStudia: wprowadzoneUkonczoneStudia,
    //   honorowaneOsiagnieciaIds: honorowaneOsiagnieciaIdentifiers
    // }

    console.log(wprowadzoneWyniki);
    console.log(JSON.stringify(wprowadzoneWyniki));
    console.log(wprowadzoneUkonczoneStudia);

    const saveData = async () => {
      const response = await client.post(
        "/api/v1/dane-rekrutacyjne/register", 
        {
          wynikiZMatury: wprowadzoneWyniki,
          ukonczoneStudia: wprowadzoneUkonczoneStudia,
          honorowaneOsiagnieciaIds: honorowaneOsiagnieciaIdentifiers
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response)
        window.location = "/"
      })

      console.log(response);
    }

    saveData();
  }

  return (
    <div className="container mt-5 mb-4">
      <div className="col-8 rounded m-auto">
        
        <div className='mb-3 row text-center'>
          <h1 className='display-4'>Uzupełnij dane rekrutacyjne</h1>
        </div>

        <form className="border p-4 rounded" onSubmit={e => handleSubmit(e)}>
          <div class="mb-3">
            {
              getExamResultsListGroup()
            }
            <ol id="examResults">
              {
                wprowadzoneWyniki.map((wynik) => (
                  <li>{wynik.przedmiot} {wynik.stopienMatury} - {wynik.wartosc}%</li>
                ))
              }
            </ol>
            <button class="mt-2 btn btn-primary" onClick={e => registerScore(e)}>Dodaj</button>
          </div>
          <div class="mb-3">
            {
              getFinishedStudiesListGroup()
            }
            <ol id="finishedStudies">
              {
                wprowadzoneUkonczoneStudia.map((studia) => (
                  <li>{studia.nazwaUczelni}, {studia.stopienStudiow}, {studia.sredniaZCalychStudiow}, {studia.ocenaKoncowa}, {studia.kierunek}, {studia.wydzial}</li>
                ))
              }
            </ol>
            <button class="mt-2 btn btn-primary" onClick={e => registerUkonczoneStudia(e)}>Dodaj</button>
          </div>
          <div class="mb-3">
            {
              getHonoredAchievementsListGroup()
            }
            <ol id="honoredAchievements">
              {
                wybraneHonorowaneOsiagniecia.map((achievement) => (
                  <>
                    {console.log(achievement)}
                    <li>{achievement.nazwa}, {achievement.opis}</li>
                  </>
                ))
              }
            </ol>
            <button class="mt-2 btn btn-primary" onClick={saveHonoredAchievement}>Dodaj</button>
          </div>
          <button type="submit" class="btn btn-danger">Prześlij</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterDaneRekrutacyjne