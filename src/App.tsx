import Player from "./components/Player.tsx";
import GameBoard from "./components/Gameboard.tsx";
import {useState} from "react";

export default function App() {

    const [activePlayer, setActivePlayer] = useState('X')

    function handleSelectSquare() {
        setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
    }

    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name="Player 1" symbol="X" active={activePlayer} />
                <Player name="Player 2" symbol="O" active={activePlayer}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} activePlayer={activePlayer}/>
        </div>
    </main>
}