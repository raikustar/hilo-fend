import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function ScoreBoardX() {

    const [scoreBoard, setScoreBoard] = useState([])
  
    useEffect(() => {
      fetch("http://localhost:8080/list-players-x")
      .then(res => res.json())
      .then(json => {setScoreBoard(json)
        console.log(json)
      })
    }, [])

  return (
    <div>

    <Table striped bordered hover>
        <thead>
            <tr>
                
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {scoreBoard.map(player => (
                <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.score?.score}</td>

                </tr>
            ))}

</tbody>
        </Table>
    </div>
  )
}

export default ScoreBoardX