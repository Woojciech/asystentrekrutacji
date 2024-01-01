import React, { useState } from 'react'
import { useEffect } from 'react';
import axiosPublic from '../../utils/useAxios';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

const RegisterDaneRekrutacyjne = () => {
  const client = axiosPublic;

  const [przedmiotyMaturalne, setPrzedmiotyMaturalne] = useState()
  const [stopnieMatury, setStopnieMatury] = useState()
  const [stopnieStudiow, setStopnieStudiow] = useState()
  const [honorowaneOsiagniecia, setHonorowaneOsiagniecia] = useState()

  // const [wprowadzoneWyniki, setWprowadzoneWyniki] = useState([{przedmiot: "", stopienMatury: "", wartosc: 0}])
  const [wprowadzoneWyniki, setWprowadzoneWyniki] = useState([{}])

  const [wprowadzoneUkonczoneStudia, setWprowadzoneUkonczoneStudia] = useState([{nazwaUczelni: "", stopienStudiow: "", sredniaZCalychStudiow: 2.0, ocenaKoncowa: 5.0, kierunek: "", wydzial: ""}])
  
  const wybranaOcenaKoncowaMappings = new Map([
    [2.0, 'TWO'],
    [3.0, 'THREE'],
    [3.5, 'THREE_POINT_HALF'],
    [4.0, 'FOUR'],
    [4.5, 'FOUR_POINT_HALF'],
    [5.0, 'FIVE'],
    [5.5, 'FIVE_POINT_HALF']
  ]); 

  const [wybraneHonorowaneOsiagniecia, setWybraneHonorowaneOsiagniecia] = useState([{}])

  useEffect(() => {
    fetchFormData();
  }, [])

  const fetchFormData = async () => {
    const formData = await client.get("/api/v1/dane-rekrutacyjne/form-data")
      .catch((error) => {});

    console.log(formData);
    setPrzedmiotyMaturalne(formData?.data?.przedmiotyMaturalne);
    setStopnieMatury(formData?.data?.stopnieMatury);
    setStopnieStudiow(formData?.data?.stopnieStudiow);
    setHonorowaneOsiagniecia(formData?.data?.honorowaneOsiagniecia);
  }

  function modifyExamResult(e, idx) {
    const field = e.target.name; 
    const updatedWprowadzoneWyniki = [...wprowadzoneWyniki]; 
    updatedWprowadzoneWyniki[idx][field] = e.target.value; 
    setWprowadzoneWyniki(updatedWprowadzoneWyniki); 
    
    console.log(field)
    console.log(idx)
    console.log(wprowadzoneWyniki)
  }

  function addExamResult(e) {
    e.preventDefault();
    const updatedWprowadzoneWyniki = [...wprowadzoneWyniki, {}]
    setWprowadzoneWyniki(updatedWprowadzoneWyniki)
  }

  function deleteExamResult(e, idx) {
    e.preventDefault();
    setWprowadzoneWyniki(wprowadzoneWyniki.filter((element, index) => index != idx))
  }

  function getExamResultsListGroup() {
    return (
        <>
          <ol className='list-group list-group-numbered'>
            {
              wprowadzoneWyniki.map((wynik, idx) => (
                <div className='border p-3 rounded mt-3'>
                  <div className='row'>
                    <div className='col-5'>
                      <label class="form-label fw-bold">Przedmiot maturalny</label>
                      <Form.Select onChange={e => modifyExamResult(e, idx)} value={wynik.przedmiot} name="przedmiot" required>
                        <option value="" selected disabled hidden>Wybierz</option>
                        {
                          przedmiotyMaturalne?.map((przedmiot, idx) => (
                            <option value={przedmiot}>{przedmiot}</option>
                          ))
                        }
                      </Form.Select>
                    </div>
                    
                    <div className='col-3'>
                      <label class="form-label fw-bold">Stopień matury</label>
                      <Form.Select onChange={e => modifyExamResult(e, idx)} value={wynik.stopienMatury} name="stopienMatury" required>
                        <option value="" selected disabled hidden>Wybierz</option>
                        {
                          stopnieMatury?.map((stopien, idx) => (
                            <option value={stopien}>{stopien}</option>
                          ))
                        }
                      </Form.Select>
                    </div>

                    <div className="col-3">
                      <label class="form-label fw-bold">Procentowy wynik</label>
                      <input type="number" class="form-control" id="average" placeholder="Wprowadź wynik" min={0} max={100} value={wynik.wartosc} name="wartosc" onChange={e => modifyExamResult(e, idx)} required/>
                    </div>
                    
                    <div className='col-1 mt-4'>
                      <button class="btn bg-body p-2 btn-lg"  onClick={e => deleteExamResult(e, idx)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </button>
                    </div>
                  </div>    
                </div>
              ))
            }
            
          </ol>
          <div class="form-text">Uzupełnij wyniki z matury, zostaną one później wykorzystane przy obliczaniu wskaźnika rekrutacyjnego</div>
          <div className='col-3'>
            <button type="button" className='btn btn-lg' onClick={e => addExamResult(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
            </button>
          </div>
        </>
    )
  }

  function modifyFinishedStudies(e, idx) {
    const field = e.target.name; 
    var value = e.target.value;
    if (field === 'ocenaKoncowa') {
      value = wybranaOcenaKoncowaMappings.get(Number(value));
    }

    const updatedWprowadzoneUkonczoneStudia = [...wprowadzoneUkonczoneStudia]; 
    updatedWprowadzoneUkonczoneStudia[idx][field] = value; 
    setWprowadzoneUkonczoneStudia(updatedWprowadzoneUkonczoneStudia);
  }

  function addFinishedStudies(e) {
    e.preventDefault();
    const updatedUkonczoneStudia = [...wprowadzoneUkonczoneStudia, {}]
    setWprowadzoneUkonczoneStudia(updatedUkonczoneStudia)
  }

  function deleteFinishedStudies(e, idx) {
    e.preventDefault();
    setWprowadzoneUkonczoneStudia(wprowadzoneUkonczoneStudia.filter((element, index) => index != idx))
  }

  function getFinishedStudiesListGroup() {
    return (
      <>
        <ol className='list-group list-group-numbered'>
          {
            wprowadzoneUkonczoneStudia.map((studia, idx) => (
              <div className='border p-3 rounded mt-3'>
                <div className='row'>
                  <div class="col-4 form-group">
                    <label class="form-label fw-bold">Nazwa uczelni</label>
                    <input type="text" class="form-control" id="nazwaUczelni" placeholder="Uniwersystet Warszawski" name="nazwaUczelni" onChange={e => modifyFinishedStudies(e, idx)} required/>
                  </div>

                  <div class="col-4 form-group">
                    <label class="form-label fw-bold">Nazwa kierunku</label>
                    <input type="text" class="form-control" id="nazwaKierunku" placeholder="Matematyka Stosowana" name="kierunek" onChange={e => modifyFinishedStudies(e, idx)} required/>
                  </div>

                  <div class="col-4 form-group">
                    <label class="form-label fw-bold">Nazwa wydziału</label>
                    <input type="text" class="form-control" id="nazwaWydzialu" placeholder="Wydział Matematyki" name="wydzial" onChange={e => modifyFinishedStudies(e, idx)} required/>
                  </div>
                </div>

                <div className='row mt-2'>

                  <div className='col-4'>
                    <label class="form-label fw-bold">Stopień studiów</label>
                    <Form.Select onChange={e => modifyFinishedStudies(e, idx)} value={studia.stopienStudiow} name="stopienStudiow" required>
                      {
                        stopnieStudiow?.map((stopien, idx) => (
                          <option value={stopien}>{stopien}</option>
                        ))
                      }
                    </Form.Select>
                  </div>

                  <div className="col-4">
                    <label class="form-label fw-bold">Średnia ze studiów</label>
                    <input type="number" class="form-control" id="srednia" placeholder="4.23" min={2.0} max={5.5} step={.1} name="sredniaZCalychStudiow" onChange={e => modifyFinishedStudies(e, idx)} required/>
                  </div>

                  <div className="col-3">
                    <label class="form-label fw-bold">Ocena końcowa</label>
                    <input type="number" class="form-control" id="ocenaKoncowa" placeholder="5.0" min={2.0} max={5.5} step={0.5} name="ocenaKoncowa" onChange={e => modifyFinishedStudies(e, idx)} required/>
                  </div>

                  <div className='col-1 mt-4'>
                    <button class="btn bg-body p-2 btn-lg" onClick={e => deleteFinishedStudies(e, idx)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )) 
          }
        </ol>
        <div class="form-text">Wprowadź ukończone studia, które mogą być wzięte pod uwagę przy rekrutacji na studia wyższego stopnia.</div>
        <div className='col-3'>
          <button type="button" className='btn btn-lg' onClick={e => addFinishedStudies(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg>
          </button>
        </div>
      </>
    )
  }
  
  const [honorowaneOsiagnieciaIds, setHonorowaneOsiagnieciaIds] = useState([])
  const [showError, setShowError] = useState(false)

  function toggleShowError() {
    setShowError(!showError);
  }

  function saveWybraneHonorowaneOsiagniecie(idx) {
    if(!honorowaneOsiagnieciaIds.includes(idx)) {
      setHonorowaneOsiagnieciaIds([...honorowaneOsiagnieciaIds, idx])
    }
  }

  function addWybraneHonorowaneOsiagniecie(e) {
    e.preventDefault();
    if(honorowaneOsiagniecia.length > wybraneHonorowaneOsiagniecia.length) {
      setWybraneHonorowaneOsiagniecia([...wybraneHonorowaneOsiagniecia, 0])
      setShowError(false)
    } else {
      setShowError(true)
    }
  }

  function deleteWybraneHonorowaneOsiagniecie(e, idx) {
    e.preventDefault();
    setWybraneHonorowaneOsiagniecia(wybraneHonorowaneOsiagniecia.filter((element, index) => index != idx))
    setShowError(false)
  }

  function getHonoredAchievementsListGroup() {
    return (
      <>
        <ol className='list-group list-group-numbered'>
          {
            wybraneHonorowaneOsiagniecia.map((osiagniecie, idx) => (
              <div className='border p-3 rounded mt-3'>
                <div className='row'>
                  <div className='col-4'>
                    <label class="form-label fw-bold">Honorowane osiągnięcie</label>
                    <Form.Select onChange={e => saveWybraneHonorowaneOsiagniecie(e.target.value)} value={osiagniecie.nazwa} required>
                      <option value="" selected disabled hidden>Wybierz</option>
                      {
                        honorowaneOsiagniecia?.map((o, idx) => (
                          <option value={o.id}>{o.nazwa}</option>
                        ))
                      }
                    </Form.Select>
                  </div>
                  
                  <div className='col-1 mt-4'>
                    <button class="btn bg-body p-2 btn-lg" onClick={e => deleteWybraneHonorowaneOsiagniecie(e, idx)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </ol>
        <div class="form-text">Uzupełnij wyniki z matury, zostaną one później wykorzystane przy obliczaniu wskaźnika rekrutacyjnego</div>
        <div className='col'>
          <button type="button" className='btn btn-lg' onClick={e => addWybraneHonorowaneOsiagniecie(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg>
          </button>
          <Toast show={showError} onClose={toggleShowError} autohide>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">Błąd!</strong>
            </Toast.Header>
            <Toast.Body>Dodając kolejne osiągnięcie liczba dodanych osiągnięć przekroczyłaby liczbę możliwych osiągnięć!</Toast.Body>
          </Toast>
        </div>
      </>
    )
  }

  function handleSubmit(event) {
    event.preventDefault();

    const saveData = async () => {
      const response = await client.post(
        "/api/v1/dane-rekrutacyjne/register", 
        {
          wynikiZMatury: wprowadzoneWyniki,
          ukonczoneStudia: wprowadzoneUkonczoneStudia,
          honorowaneOsiagnieciaIds: honorowaneOsiagnieciaIds
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
      <div className="col-10 rounded m-auto">
        
        <div className='mb-3 row text-center'>
          <h1 className='display-4'>Uzupełnij dane rekrutacyjne</h1>
        </div>

        <form className="border p-4 rounded" onSubmit={e => handleSubmit(e)}>
          <div class="mb-3">
            {
              getExamResultsListGroup()
            }
          </div>
          <div class="mb-3">
            {
              getFinishedStudiesListGroup()
            }
          </div>
          <div class="mb-3">
            {
              getHonoredAchievementsListGroup()
            }
          </div>
          <button type="submit" class="m-2 btn btn-danger">Prześlij</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterDaneRekrutacyjne