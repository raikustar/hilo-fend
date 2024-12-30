import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function Profile() {
    const {playerName} = useParams()

    const [profile, setProfile] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/show-player/" + playerName)
        .then(res => res.json()
        .then(json => setProfile(json)))
    },[playerName])

console.log(profile)
  return (
    <div>
        <Container className='profile-box'>
            <h2>{playerName}</h2>
            <div className="break-line"></div>
            <Container>
                {profile.map((results) => 
                    <p>{results.score} Points - Game Duration was {results.totalTime} seconds.</p>
                ) }
                
            </Container>

        </Container>
    </div>
  )
}

export default Profile