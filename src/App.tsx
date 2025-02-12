import Player from "./components/Player.tsx";
import GameBoard from "./components/Gameboard.tsx";
import {useState} from "react";
import Log from "./components/Log.tsx";
import {WINNING_COMBINATIONS} from "./winnig-combinagions.const.tsx";
import GameOver from "./components/GameOver.tsx";

const INITIAL_GAMEBOARD = [[null, null, null], [null, null, null], [null, null, null]]
const PLAYERS = {
    X: 'Player 1', O: 'Player 2'
}

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer
}

function deriveWinner(gameBoard, players) {
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            return players[firstSquareSymbol]
        }
    }
    return null
}

function deriveGameBoard(gameTurns) {
    const gameBoard = [...INITIAL_GAMEBOARD.map(array => [...array])]

    for (const turn of gameTurns) {
        const {square, player} = turn
        const {row, col} = square
        gameBoard[row][col] = player
    }
    return gameBoard;
}

export default function App() {
    const [gameTurns, setGameTurns] = useState([])
    const [players, setPlayers] = useState(PLAYERS)
    const gameBoard = deriveGameBoard(gameTurns);
    const activePlayer = deriveActivePlayer(gameTurns)
    const winner = deriveWinner(gameBoard, players)
    const hadDraw = gameTurns.length === 9 && !winner

    function handleSelectSquare(row, col) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns)
            const updatedTurns = [{square: {row, col}, player: currentPlayer}, ...prevTurns]
            return updatedTurns;
        })
    }

    function handleRematch() {
        setGameTurns(() => [])
    }

    function handlePlayerEdit(symbol, name) {
        setPlayers((prevState) => ({...prevState, [symbol]: name}))
    }


    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name={PLAYERS.X} symbol="X" activeSymbol={activePlayer} onChangeName={handlePlayerEdit}/>
                <Player name={PLAYERS.O} symbol="O" activeSymbol={activePlayer} onChangeName={handlePlayerEdit}/>
            </ol>
            {(winner || hadDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            <Log turns={gameTurns}/>
        </div>
    </main>
}