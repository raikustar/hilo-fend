import {  useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Homepage() {
  const nameRef = useRef()
  const [playerName, setPlayerName] = useState("")
  const [isDisabled, setIsDisable] = useState(true)

  const reloadName = () => {
    setPlayerName(nameRef.current.value)
  }

  useEffect(() => {

    setIsDisable(playerName.length <= 2)
    // if (playerName.length > 2) {
    //   setIsDisable(false)
    // } else {
    //   setIsDisable(true)
    // }
  }, [playerName])

  
return (
    <div>
      <Container className="begin-box">
      <label>Hi-Lo Card Game</label> <br/> 
      <div className="break-line"></div>
      <Container>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} onChange={reloadName} type="text" placeholder="Enter Name.." />
              
            </Form.Group>
          </Form>
        </Container>
        
        <Button style={{overflow:"hidden", padding:"0px", height:"40px", borderColor:"orange"}} disabled={isDisabled}>
          <Link to={"/game/" + playerName} className="link-button">Start
          </Link>
        </Button>
        
        
      </Container>

      <Container style={{width:"400px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
        <Link to={"scoreboard/"} className="link-button" style={{fontSize:"16px", marginTop:"10px"}}>Simple Score Board</Link>

      </Container>

    </div>
  )
}

export default Homepage