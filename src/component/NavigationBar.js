import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Navigationbar() {
  return (
    <div>
    <Navbar style={{backgroundColor:"lightgreen"}}>
        <Container>
          <Nav>
                <Nav.Link as={Link} to="/">Homepage</Nav.Link>
                <Nav.Link as={Link} to="/scoreboard">Score Board</Nav.Link>
                <Nav.Link as={Link} to="/scoreboardx">Complex Score Board</Nav.Link>

          </Nav>

        </Container>
      </Navbar>
      <br />

      
    </div>
  )
}

export default Navigationbar