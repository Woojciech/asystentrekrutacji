import React, { useEffect } from 'react'

const Home = () => {
  return (
    <div>
        <h1>Home Page</h1>
        <h3>Navigate</h3>
        <ul>
            <li><a href="/kierunek/register">Register kierunek</a></li>
            <li><a href="/dane-rekrutacyjne/register">Register dane rekrutacyjne</a></li>
        </ul>
    </div>
    
  )
}

export default Home