import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ScoreBoard() {

    const [scoreBoard, setScoreBoard] = useState([])

  

    // initial load
    useEffect(() => {
      fetch("http://localhost:8080/list-score-points")
      .then(res => res.json())
      .then(json => {setScoreBoard(json)
      })
    }, [])


    function updateToPointSort() {
      fetch("http://localhost:8080/list-score-points")
      .then(res => res.json())
      .then(json => {setScoreBoard(json)
      })

    }

    function updateToTimePlayedSort() {
      fetch("http://localhost:8080/list-score-time-played")
      .then(res => res.json())
      .then(json => {setScoreBoard(json)
      })

    }

  return (
    <div>

    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>
                  <Button onClick={updateToPointSort} className="table-button">Score</Button>
                </th>

                <th>
                  <Button onClick={updateToTimePlayedSort} className="table-button">Duration of round</Button>
                </th>
            </tr>
        </thead>
        <tbody>
            {scoreBoard.map(score => (
                <tr key={score.id} >
                    <td>
                      <Link to={"/profile/" + score.player?.name} style={{textDecoration:"none", color:"black", fontWeight:"500"}}> {score.player?.name}</Link>
                    </td>

                    <td>{score.score}</td>
                    <td>{score.totalTime} seconds</td>
                    
                </tr>
            ))}

        </tbody>
      </Table>
    </div>
  )
}

export default ScoreBoard