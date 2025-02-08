import Player from "./components/Player.tsx";
import GameBoard from "./components/Gameboard.tsx";
import {useState} from "react";

export default function App() {

    const [gameTurns, setGameTurns] = useState([])
    const [activePlayer, setActivePlayer] = useState('X')

    function handleSelectSquare(row, col) {
        setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns((prevTurns) => {
            let currentPlayer = 'X'
            if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O'
            }
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
        </div>
    </main>
}