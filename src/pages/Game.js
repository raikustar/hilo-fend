import React, { useEffect, useState } from 'react'
import { Button, Container} from 'react-bootstrap'
import { Link, useNavigate, useParams} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faDiamond } from '@fortawesome/free-solid-svg-icons'

let interval;


//Dark reddish brown, taupe, & light peachy brown
function Game() {
    const navigate = useNavigate()
    const [currentNumber, setCurrentNumber] = useState()
    const [predictionNumber, setPredictionNumber] = useState("none")
    const [gameState, setGameState] = useState({})
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [gameOverWindow, setGameOverWindow] = useState("none");
    const [timerValue, setTimerValue] = useState(10)
    const [suite, setSuite] = useState("diamonds")
      
    const [cards] = useState({
      "hearts": {
        "icon": faHeart,
        "color": "red" 
      }, "diamonds": {
        "icon": faDiamond,
        "color": "black" 
      }
    })
    const {playerName} = useParams()
    
    // Sets lives, points and game conditions
    useEffect(() => {
      fetch("http://localhost:8080/start-round-request?playerName=" + playerName)
      .then(res => res.json())
      .then(json => {
          setGameState(json)
        })
    }, [playerName])

  

    useEffect(() => {
      if (gameState.lost) {
        setGameOverWindow("block")
        setTimerValue(0)
      }
    }, [gameState.lost])


    useEffect(() => {
      fetch("http://localhost:8080/game-state")
      .then(res => res.json())
      .then(json => {
          setGameState(json)})
    }, [predictionNumber])


    // Set starting cards
    useEffect(() => {
      fetch("http://localhost:8080/generate-card")
      .then(res => res.json())
      .then(json => 
        {setCurrentNumber(json)
          getNewCard()
        })
    }, [])
  
    function getNewCard() {
      fetch("http://localhost:8080/generate-card")
      .then(res => res.json())
      .then(json => {
        setPredictionNumber(json)
        randomSuite()})
    }
  
    function moveNewCardToCurrentCard() {
      setCurrentNumber(predictionNumber)
    }
    function guessIndicator(value){
      let card = document.querySelector(".current-card2")
      if (value === "lower" && currentNumber > predictionNumber) {
        showAndResetGuessedCard(card, "correct-guess")
      } else if (value === "higher" && currentNumber < predictionNumber) {
          showAndResetGuessedCard(card, "correct-guess")
      } else if (value === "equal" && currentNumber === predictionNumber) {
        showAndResetGuessedCard(card, "correct-guess")
      } else {
        showAndResetGuessedCard(card, "wrong-guess")
      }



    }

    function showAndResetGuessedCard(class_name, guess_card) {
      class_name.classList.remove(guess_card)
      class_name.classList.add(guess_card)
      setInterval(() => {
        class_name.classList.remove(guess_card)
      },750)
    }
   
    // back-end GET bool return values for lower, higher and equals comparisons
    function comparisonButton(requestURL = "") {
      fetch("http://localhost:8080/" + requestURL + "?currentNumber=" + currentNumber +"&newNumber=" + predictionNumber)
      .then(res => res.json())
      .then(() => {
      })
      .finally(() => {
        guessIndicator(requestURL)
        setTimerValue(10)
        getNewCard()
        moveNewCardToCurrentCard()
      })
    }

    function renderHearts(how_many) {
      const lifeArray = []
      for (let i = 0; i<how_many;i++) {
        lifeArray.push(<i> <FontAwesomeIcon icon={faHeart} /></i>)
      }
      return lifeArray
    }
    
    useEffect(() => {
      interval = setInterval(() => {
        setTimerValue((prevValue) => Math.max(prevValue - 1, 0));
      }, 1000);
  
    }, []); 
  
    useEffect(() => {
      if (timerValue <= 0) {
        clearInterval(interval)
        setBtnDisabled(true)
        setGameOverWindow("block")
        comparisonButton("lower")
      }
    }, [timerValue]); 

    //console.log(typeof(cards))
    function randomSuite() {
      let value = parseInt(Math.random() * 100)
      if (value > 51) {
        setSuite("hearts")
      } else {
        setSuite("diamonds");
      }
    }
    

  return (
    <div>

    <Container className="game-window">
        <Container className="game-score">
            <Container className="heart-box"> {renderHearts(gameState.lives)}</Container>
            <p>Timer: <span>{timerValue}</span></p>
            <p>Points: {gameState.points}</p>
        </Container>
        <Container className="current-card2">
          <div className="upper-card2" style={{color:cards[suite].color}}>
            <i> <FontAwesomeIcon icon={cards[suite].icon} /></i>
            <p>{currentNumber}</p>
          </div>
          <div className="middle-card2" style={{color:cards[suite].color}}>
            <i> <FontAwesomeIcon icon={cards[suite].icon} /></i>
          </div>
          <div className="lower-card2" style={{color:cards[suite].color}}>
            <i> <FontAwesomeIcon icon={cards[suite].icon} /></i>
            <p>{currentNumber}</p>
          </div>
            
            
        </Container><br/>
        <Container className="selection-buttons">
            <Button variant='dark' onClick={() => comparisonButton("lower")} disabled={btnDisabled}>Lower</Button> <br/>
            <Button variant='light' onClick={() => comparisonButton("equal")} disabled={btnDisabled}>Equal</Button> <br/>
            <Button variant='dark' onClick={() => comparisonButton("higher")} disabled={btnDisabled}>Higher</Button> <br/>
        </Container>
    </Container>

    <Container className="game-over-window" style={{display:gameOverWindow}}>
      <Container className="game-over-result">
        <h2>Game over!</h2>
        <p>Your score: {gameState.points}</p>
      </Container>
      <div className="break-line"></div>
      <Container className="game-over-buttons">
        <Button onClick={() => navigate(0)} className="link-button">Try Again</Button>
        <Link to={"/"} className="link-button">Homepage</Link>
      </Container>
      

    </Container>

    </div>
  )
}

export default Game