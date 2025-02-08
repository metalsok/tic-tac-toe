import Player from "./components/Player.tsx";
import GameBoard from "./components/Gameboard.tsx";

export default function App() {


    return <main>
        <div id="game-container">
            <ol id="players">
                <Player name="Player 1" symbol="X" />
                <Player name="Player 2" symbol="O" />
            </ol>
            <GameBoard />
        </div>
    </main>
}