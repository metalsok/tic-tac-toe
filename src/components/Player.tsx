import {useState} from "react";

export default function Player({name, symbol, activeSymbol, onChangeName}: { name: string, symbol: string }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name)

    function toggleEditing() {
        setIsEditing((prevState) => !prevState)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPlayerName(event.target.value)
        if (isEditing) {
            onChangeName(symbol, event.target.value)
        }
    }

    return <li className={activeSymbol === symbol ? 'active' : ''}>
                    <span className="player">
                        {!isEditing && <span className="player-name">{playerName}</span>}
                        {isEditing && <input type="text" required value={playerName} onChange={handleChange}/>}
                        <span className="player-symbol">{symbol}</span>
                    </span>
        <button onClick={toggleEditing}>{!isEditing ? 'Edit' : 'Save'}</button>
    </li>
}