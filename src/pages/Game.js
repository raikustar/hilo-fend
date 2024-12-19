import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'


function Game() {
    const navigate = useNavigate()
    const nameRef = useRef()

    const [currentNumber, setCurrentNumber] = useState()
    const [predictionNumber, setPredictionNumber] = useState("none")
    const [gameState, setGameState] = useState({})

    const [gameOverWindow, setGameOverWindow] = useState("none");

  
    // Sets lives, points and game conditions
    useEffect(() => {
      fetch("http://localhost:8080/StartRoundRequest")
      .then(res => res.json())
      .then(json => {
          setGameState(json)})
    }, [])

    useEffect(() => {
      if (gameState.lost) {
        setGameOverWindow("block")
      }
    }, [gameState.lost])

    // Set starting cards
    useEffect(() => {
      fetch("http://localhost:8080/generateCard")
      .then(res => res.json())
      .then(json => 
        {setCurrentNumber(json)
          getNewCard()
        })
    }, [])
  
    function getNewCard() {
      fetch("http://localhost:8080/generateCard")
      .then(res => res.json())
      .then(json => {
        setPredictionNumber(json)})
    }
  
    function moveNewCardToCurrentCard() {
      setCurrentNumber(predictionNumber)
    }

    // parameters to add only certain changes
    function changeGameState(lifeLost, pointsAdded) {
      const newLives = gameState.lives - (lifeLost ? 1 : 0);
      const newPoints = gameState.points + (pointsAdded ? 1 : 0);

      const newState = {
        "lives": newLives,
        "points": newPoints,
        "lost": false
      }

      fetch("http://localhost:8080/gameState", {
        method:"PUT",
        body:JSON.stringify(newState),
        headers:{"Content-Type":"application/json"}})
      .then(res => res.json())
      .then(json => {
        setGameState(json)        
      })
    }

    // back-end GET bool return values for lower, higher and equals comparisons
    function comparisonButton(requestURL = "") {
      fetch("http://localhost:8080/" + requestURL + "?currentNumber=" + currentNumber +"&newNumber=" + predictionNumber)
      .then(res => res.json())
      .then(json => {
        if (json === true) {
          changeGameState(false, true)
        }
        else {
          changeGameState(true, false)
        }
      })
      .finally(() => {
        getNewCard()
        moveNewCardToCurrentCard()
      })
    }


    function savePlayerScore() {
      const newPlayer = {
          "name": nameRef.current.value,
          "score": {
            "score": gameState.points
          }
              
      }
      fetch("http://localhost:8080/add-player", {
        method:"POST",
        body:JSON.stringify(newPlayer),
        headers:{"Content-Type":"application/json"}})
      .then(res => res.json())
      .then(() => {})
    }

  return (
    <div>

    <Container className="game-window">
        <Container className="game-score">
            <p>Lives: {gameState.lives}</p>
            <p>Points: {gameState.points}</p>
        </Container>
        <Container className="current-card">
            <p>{currentNumber}</p>

        </Container><br/>

        <Container className="selection-buttons">
            <Button onClick={() => comparisonButton("lower")} disabled={gameState.lost}>Lower</Button> <br/>
            <Button onClick={() => comparisonButton("equal")} disabled={gameState.lost}>Equal</Button> <br/>
            <Button onClick={() => comparisonButton("higher")} disabled={gameState.lost}>Higher</Button> <br/>
        </Container>
    </Container>

    <Container className="game-over-window" style={{display:gameOverWindow}}>
      <Container className="game-over-result">
        <h2>Game over!</h2>
        <p>Your score: {gameState.points}</p>
      </Container>
      
      <Container className="game-over-buttons">
        <Button onClick={() => navigate(0)} className="link-button">Try Again</Button>
        <Link to={"/"} className="link-button">Homepage</Link>
      </Container>
      <div className="break-line"></div>
      <Container>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Player Name</Form.Label>
          <Form.Control ref={nameRef} type="text" placeholder="Enter your name..." />
          
        </Form.Group>


      <Button onClick={savePlayerScore} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Container>
    </Container>

    
    </div>
  )
}

export default Game