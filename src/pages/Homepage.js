import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div>
      <Container className="begin-box">
        <label>Hi-Lo Card Game</label> <br/> 
        <Link to={"game/"} className="link-button">Start Game</Link>
      </Container>

      <Container style={{width:"400px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
        <Link to={"scoreboard/"} className="link-button" style={{fontSize:"16px", marginTop:"10px"}}>Simple Score Board</Link>
        <Link to={"scoreboardx/"} className="link-button" style={{fontSize:"16px", marginTop:"10px"}}>Complex Score Board</Link>

      </Container>

    </div>
  )
}

export default Homepage