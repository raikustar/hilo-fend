import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Game from './pages/Game';
import ScoreBoard from './pages/ScoreBoard';
import Navigationbar from './component/NavigationBar';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
    <div className="App">
      <Navigationbar/>
      <Routes>
          <Route path="/" element={<Homepage/>}></Route>
          <Route path="/game/:playerName" element={<Game/>}></Route>
          <Route path="/profile/:playerName" element={<Profile/>}></Route>
          <Route path="/scoreboard" element={<ScoreBoard/>}></Route>

      </Routes>

    </div>
    </Router>
  );
}

export default App;
