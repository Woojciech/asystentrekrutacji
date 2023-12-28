import React from 'react'
import { useEffect } from 'react'
import axiosPublic from '../../utils/useAxios';

const RegisterKierunek = () => {
    const client = axiosPublic;

    useEffect(() => {
        
    })

    return (
    // <div>
    //     <h1>Register Kierunek</h1>
    // </div>
    <div className="container mt-5 mb-4">
            <div className="col-8 rounded m-auto">
              
              <div className='mb-3 row text-center'>
                <h1 className='display-4'>Create Project</h1>
              </div>

              <form className="border p-4 rounded">
                <div class="mb-3">
                  <label for="exampleInputEmail1" className="form-label fw-bold">Name</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                  <div id="emailHelp" class="form-text ">Choose a short, descriptive name of your project.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label fw-bold">Description</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                  <div id="emailHelp" class="form-text">Describe your project in more details.</div>
                </div>
                <div class="mb-3 form-outline">
                  <label class="form-label fw-bold" for="typeNumber">Capacity</label>
                  <input min="1" max="10" type="number" id="typeNumber" class="form-control" required/>
                  <div id="emailHelp" class="form-text">How many mentees are you willing to mentor for this project?</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">Code repository link</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" required/>
                  <div id="emailHelp" class="form-text">Link to project's code repository.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">Task board link</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" required/>
                  <div id="emailHelp" class="form-text">Link to task board.</div>
                </div>
                <div class="mb-3">
                  {/* {
                    getTechnologiesListGroup()
                  } */}
                  <button class="mt-2 btn btn-primary" >Add Technology</button>
                </div>
                <div class="mb-3">
                  {/* {
                    getOpenPositionsListGroup()
                  } */}
                  <button class="mt-2 btn btn-primary" >Add Open Position</button>
                </div>
                <div class="mb-3">
                  {/* {
                    getMilestonesListGroup()
                  } */}
                  <button class="mt-2 btn btn-primary" >Add Milestone</button>
                </div>
                <button type="submit" class="btn btn-danger">Add Project</button>
              </form>
            </div>
        </div>
  )
}

export default RegisterKierunek