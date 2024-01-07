import React, { useState } from 'react'
import { useEffect } from 'react'
import axiosPublic from '../../utils/useAxios';
import Form from 'react-bootstrap/Form';

const RegisterKierunek = () => {
    const client = axiosPublic;

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    
    const [poziomStudiow, setPoziomStudiow] = useState(['I', 'II', 'III'])
    const [dziedzina, setDziedzina] = useState(['Informatyka Techniczna', 'Fizyka Matematyczna', 'Matematyka Fizyczna', 'Technika Informatyczna'])
    const [wydzial, setWydzial] = useState(['Informatyczny', 'Chemiczny', 'Fizyczny'])

    const [przedmiotyMaturalne, setPrzedmiotyMaturalne] = useState(['MATEMATYKA', 'FIZYKA', 'CHEMIA', 'INFORMATYKA'])
    const [stopnieMatury, setStopnieMatury] = useState(['PODSTAWOWA', 'ROZSZERZONA', 'USTNA'])

    const [branch, setBranch] = useState()
    const [department, setDepartment] = useState()
    const [stopienStudiow, setStopienStudiow] = useState()

    useEffect(() => {
      fetchFormData();   
    }, []);

    const fetchFormData = async () => {
      const formData = await client.get("/api/v1/kierunek/register/form-data")
        .catch((error) => {});
  
      let data = formData?.data
      console.log(data)
      setPoziomStudiow(data.stopnieStudiow)
      setDziedzina(data.dziedziny)
      setWydzial(data.wydzialy)
      setPrzedmiotyMaturalne(data.przedmiotyMaturalne)
      setStopnieMatury(data.stopnieMatury)
      setMajors(data.kierunki)
    }

    const [recruitmentRules, setRecruitmentRules] = useState([{}]);

    function modifyRecruitmentRule(e, idx) {
      e.preventDefault();
      const field = e.target.name; 
      const updatedRecruitmentRules = [...recruitmentRules];
      updatedRecruitmentRules[idx][field] = e.target.value;
      setRecruitmentRules(updatedRecruitmentRules);
    }

    function deleteRecruitmentRule(e, idx) {
      e.preventDefault();
      setRecruitmentRules(recruitmentRules.filter((element, index) => index != idx))
    }

    function addRecruitmentRule(e) {
      e.preventDefault();
      setRecruitmentRules([...recruitmentRules, {}])
    }

    function getRecruitmentRulesListGroup() {
      return (
        <>
          <div class="row input-group mb-3">
            <ol className='list-group list-group-numbered'>
              {
                recruitmentRules.map((rule, idx) => (
                  <div className='border p-3 rounded mt-3'>
                    <div className='row'>
                      <div className='col-4'>
                        <label class="form-label fw-bold">Przedmiot maturalny</label>
                        <Form.Select onChange={e => modifyRecruitmentRule(e, idx)} value={rule.przedmiot} name="przedmiot" required>
                          <option value="" selected disabled hidden>Wybierz</option>
                          {
                            przedmiotyMaturalne?.map((przedmiot, idx) => (
                              <option value={przedmiot}>{przedmiot}</option>
                            ))
                          }
                        </Form.Select>
                      </div>
                      
                      <div className='col-4'>
                        <label class="form-label fw-bold">Stopień matury</label>
                        <Form.Select onChange={e => modifyRecruitmentRule(e, idx)} name="stopienMatury" value={rule.stopienMatury} required>
                          <option value="" selected disabled hidden>Wybierz</option>
                          {
                            stopnieMatury?.map((stopien, idx) => (
                              <option value={stopien}>{stopien}</option>
                            ))
                          }
                        </Form.Select>
                      </div>

                      <div className="col-3">
                        <label class="form-label fw-bold">Waga</label>
                        <input type="number" class="form-control" id="average" placeholder="Waga" min={1} max={20} value={rule.waga} name="waga" onChange={e => modifyRecruitmentRule(e, idx)} required/>
                      </div>
                      
                      <div className='col-1 mt-4'>
                        <button class="btn bg-body p-2 btn-lg" onClick={e => deleteRecruitmentRule(e, idx)}>
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
            <div class="form-text">Uzupełnij reguły wskaźnika rekrutacyjnego, wprowadzając przedmioty maturalne wraz z odpowiadającymi im wagami</div>
          </div>
          <div className='col-3'>
            <button type="button" className='btn btn-lg' onClick={e => addRecruitmentRule(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
            </button>
          </div>
        </>
      )
    }

    const [honoredMajors, setHonoredMajors] = useState([{}])
    const [majors, setMajors] = useState([{id: 1, nazwa: "Matematyka Stosowana"}, {id: 2, nazwa: "Fizyka Techniczna"}])

    function addHonoredMajor(e) {
      e.preventDefault();
      setHonoredMajors([...honoredMajors, {liczbaPunktow: 0, idKierunku: 0}])
    }

    function modifyHonoredMajor(e, idx) {
      e.preventDefault();
      const field = e.target.name; 
      console.log(field)
      const updatedHonoredMajors = [...honoredMajors];
      updatedHonoredMajors[idx][field] = e.target.value;
      setHonoredMajors(updatedHonoredMajors);
    }

    function deleteHonoredMajor(e, idx) {
      e.preventDefault();
      setHonoredMajors(honoredMajors.filter((element, index) => index != idx))
    }

    function getHonoredMajorsListGroup() {
      return (
        <>
          <div class="row input-group mb-3">
            <ol className='list-group list-group-numbered'>
              {
                honoredMajors.map((major, idx) => (
                  <div className='border p-3 rounded mt-3'>
                    <div className='row'>
                      <div className='col-6'>
                        <label class="form-label fw-bold">Kierunek</label>
                        <Form.Select onChange={e => modifyHonoredMajor(e, idx)} value={major.idKierunku} name="idKierunku" required>
                          <option value="" selected disabled hidden>Wybierz</option>
                          {
                            majors?.map((major, idx) => (
                              <option value={major.id}>{major.nazwa}</option>
                            ))
                          }
                        </Form.Select>
                      </div>
    
                      <div className="col-5">
                        <label class="form-label fw-bold">Dodatkowe punkty</label>
                        <input type="number" class="form-control" id="average" placeholder="30" min={1} max={500} value={major.liczbaPunktow} name="liczbaPunktow" onChange={e => modifyHonoredMajor(e, idx)} required/>
                      </div> 
                      
                      <div className='col-1 mt-4'>
                        <button class="btn bg-body p-2 btn-lg" onClick={e => deleteHonoredMajor(e, idx)}>
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
            <div class="form-text">Wprowadź kierunki studiów, w zamian za których ukończenie przyznane zostaną dodatkowe punkty rekrutacyjne</div>
          </div>
          <div className='col-3'>
            <button type="button" className='btn btn-lg' onClick={e => addHonoredMajor(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
            </button>
          </div>
        </>
      )
    }

    const [honoredAchievements, setHonoredAchievements] = useState([{}])

    function addHonoredAchievement(e) {
      e.preventDefault();
      setHonoredAchievements([...honoredAchievements, {}])
    }

    function modifyHonoredAchievement(e, idx) {
      e.preventDefault();
      const field = e.target.name; 
      const updatedHonoredAchievements = [...honoredAchievements];
      updatedHonoredAchievements[idx][field] = e.target.value;
      setHonoredAchievements(updatedHonoredAchievements);
    }

    function deleteHonoredAchievement(e, idx) {
      e.preventDefault();
      setHonoredAchievements(honoredAchievements.filter((element, index) => index != idx))
    }

    function getHonoredAchievementsListGroup() {
      return (
        <>
          <div class="row input-group mb-3">
            <ol className='list-group list-group-numbered'>
              {
                honoredAchievements.map((achievement, idx) => (
                  <div className='border p-3 rounded mt-3'>
                    <div className='row'>
                      <div class="col-6">
                        <label class="form-label fw-bold">Nazwa osiągnięcia</label>
                        <input type="text" class="form-control" id="nazwaKierunku" placeholder="Konkurs Lingwistyczny" name="nazwa" value={achievement.nazwa} onChange={e => modifyHonoredAchievement(e, idx)} required/>
                      </div>

                      <div className="col-5">
                        <label class="form-label fw-bold">Dodatkowe punkty</label>
                        <input type="number" class="form-control" id="average" placeholder="100" min={1} max={500} value={achievement.liczbaPunktow} name="liczbaPunktow" onChange={e => modifyHonoredAchievement(e, idx)} required/>
                      </div>
          
                      <div className='col-1 mt-4'>
                        <button class="btn bg-body p-2 btn-lg" onClick={e => deleteHonoredAchievement(e, idx)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                        </button>
                      </div>

                    </div>
                    <div className='row'>
                      <div class="col-12">
                        <label class="form-label fw-bold">Opis osiągnięcia</label>
                        <textarea class="form-control" id="nazwaKierunku" placeholder="Laureat I lub II stopnia" value={achievement.opis} name="opis" onChange={e => modifyHonoredAchievement(e, idx)} required></textarea>
                      </div>
                    </div>  
                  </div>
                ))
              }
              
            </ol>
            <div class="form-text">Wprowadź honorowane osiągnięcia wraz z liczbą punktów przysługujących za osiągnięcie</div>
          </div>
          <div className='col-3'>
            <button type="button" className='btn btn-lg' onClick={e => addHonoredAchievement(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
            </button>
          </div>
        </>
      )
    }

    const [error, setError] = useState(false) 

    function handleSubmit(event) {
      event.preventDefault();
      
      console.log(name)
      console.log(description);
      
      console.log(recruitmentRules);
      console.log(honoredMajors);
      console.log(honoredAchievements);

      const saveData = async () => {
        const response = await client.post(
          "/api/v1/kierunek/register", 
          {
            nazwa: name,
            opis: description,
            dziedzina: branch,
            wydzial: department,
            stopienStudiow: stopienStudiow,
            regulyWskaznikaRekrutacyjnego: recruitmentRules,
            punktyRekrutacyjneZaKierunki: honoredMajors,
            honorowaneOsiagniecia: honoredAchievements
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          console.log(response)
          setError(false)
          window.location = "/"
        }).catch(error => { 
          setError(true)
          console.log(error.response)
        })
  
        console.log(response);
      }
  
      saveData();
    }

    return (
          <div className="container mt-5 mb-4">
            <div className="col-8 rounded m-auto">

              <div className='mb-3 row text-center'>
                <h1 className='display-4'>Utwórz kierunek studiów</h1>
              </div>

              <form className="border p-4 rounded" onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-6'>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" className="form-label fw-bold">Nazwa kierunku</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Informatyka Techniczna' onChange={e => setName(e.target.value)} required/>
                    </div>
                  </div>
                  
                  <div className='col-6'>
                    <label class="form-label fw-bold">Stopień studiów</label>
                    <Form.Select onChange={e => setStopienStudiow(e.target.value)}>
                      {
                        poziomStudiow?.map((stopien, idx) => (
                          <option value={stopien}>{stopien}</option>
                        ))
                      }
                    </Form.Select>
                  </div>
                </div>
                
                <div className='row'>
                  <div className='col-6'>
                    <label class="form-label fw-bold">Dziedzina</label>
                    <Form.Select onChange={e => setBranch(e.target.value)}>
                      {
                        dziedzina?.map((stopien, idx) => (
                          <option value={stopien}>{stopien}</option>
                        ))
                      }
                    </Form.Select>
                  </div>
                  <div className='col-6'>
                    <label class="form-label fw-bold">Wydział</label>
                    <Form.Select onChange={e => setDepartment(e.target.value)}>
                      {
                        wydzial?.map((stopien, idx) => (
                          <option value={stopien}>{stopien}</option>
                        ))
                      }
                    </Form.Select>
                  </div>
                </div>

                <div className='col-12 mt-2'>
                  <label for="opisKierunku" class="form-label fw-bold">Opis kierunku</label>
                  <textarea class="form-control" id="opisKierunku" rows="3" onChange={e => setDescription(e.target.value)} required></textarea>
                </div>

                <div class="col-12 m-3">
                  {
                    getRecruitmentRulesListGroup()
                  }
                </div>
                <div class="col-12 m-3">
                  {
                    getHonoredMajorsListGroup()
                  }
                </div>
                <div class="col-12 m-3">
                  {
                    getHonoredAchievementsListGroup()
                  }
                </div>
                {
                  error ?
                  <div class="alert alert-danger" role="alert">
                    <h3>Błąd!</h3>
                    <h4>Upewnij się, że:</h4>
                    <ol>
                      <li>Kierunek o podanej nazwie, dziedzinie, wydziale oraz stopniu nie został już zarejestrowany</li>
                      <li>Honorowane osiągnięcia nie powtarzają się</li>
                      <li>Reguły wskaźnika rekrutacyjnego nie powtarzają się</li>
                      <li>Punkty rekrutacyjne za kierunki nie powtarzają się</li>
                    </ol>
                    <h4>A następnie prześlij formularz ponownie.</h4>
                  </div>

                  :
                  <></>
                }
                <button type="submit" class="m-2 btn btn-danger">Dodaj kierunek</button>
              </form>
            </div>
          </div>
    )
}

export default RegisterKierunek