import Player from "./components/Player.tsx";
import GameBoard from "./components/Gameboard.tsx";
import {useState} from "react";
import Log from "./components/Log.tsx";
import {WINNING_COMBINATIONS} from "./winnig-combinagions.const.tsx";
import GameOver from "./components/GameOver.tsx";

const initialGameBoard = [[null, null, null], [null, null, null], [null, null, null]]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer
}


export default function App() {
    const [gameTurns, setGameTurns] = useState([])
    const [players, setPlayers] = useState({
        X: 'Player 1', O: 'Player 2'
    })
    const gameBoard = [...initialGameBoard.map(array => [...array])]


    for (const turn of gameTurns) {
        const {square, player} = turn
        const {row, col} = square
        gameBoard[row][col] = player
    }
    const activePlayer = deriveActivePlayer(gameTurns)
    const winner = getWinner(gameBoard)
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

    function getWinner(gameBoard) {
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

    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name="Player 1" symbol="X" activeSymbol={activePlayer} onChangeName={handlePlayerEdit}/>
                <Player name="Player 2" symbol="O" activeSymbol={activePlayer} onChangeName={handlePlayerEdit}/>
            </ol>
            {(winner || hadDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            <Log turns={gameTurns}/>
        </div>
    </main>
}