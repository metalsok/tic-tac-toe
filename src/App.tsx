import Player from "./components/Player.tsx";
import GameBoard from "./components/Gameboard.tsx";
import {useState} from "react";
import Log from "./components/Log.tsx";

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer
}

export default function App() {

    const [gameTurns, setGameTurns] = useState([])
    const activePlayer = deriveActivePlayer(gameTurns)

    function handleSelectSquare(row, col) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns)

            const updatedTurns = [{square: {row, col}, player: currentPlayer}, ...prevTurns]
            return updatedTurns;
        })
    }

    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name="Player 1" symbol="X" activeSymbol={activePlayer}/>
                <Player name="Player 2" symbol="O" activeSymbol={activePlayer}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
            <Log turns={gameTurns}/>
        </div>
    </main>
}