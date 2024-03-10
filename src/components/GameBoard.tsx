'use client'

import { useEffect, useState } from "react";
import { Card } from "@/app/page";
import { calculatePointTotal } from "@/lib/scoreCountingLogic";
import { getCard, shuffleDeck } from "@/lib/gamePlayLogic"
import Player from "@/components/Player";

type GameBoardProps = {
    initialHouse: Card[]
    initialPlayer: Card[]
    deckId: string
}

export default function GameBoard({ initialHouse, initialPlayer, deckId }: GameBoardProps) {
    const [house, setHouse] = useState(initialHouse)
    const [player, setPlayer] = useState(initialPlayer)
    const [score, setScore] = useState({ house: 0, player: 0 });
    const [gameStatus, setGameStatus] = useState(true)

    useEffect(() => {
        const updateScore = () => {
            const newHouseScore = calculatePointTotal(house)
            const newPlayerScore = calculatePointTotal(player)
            setScore({ player: newPlayerScore, house: newHouseScore });
        }

        if (score.player > 21 || score.house === 21) {
            setGameStatus(false)
            window.alert("You lost! You lost!")
        }

        updateScore();

    }, [house, player, score.house, score.player])

    const drawCard = async () => {
        const newCard = await getCard(deckId, 1)

        setPlayer([...player, newCard.cards[0]])

        if (score.player === 21) {
            window.alert("You won! You Won!")
        }
    }

    const handleStand = () => {
        if (score.player > score.house) {
            setGameStatus(false);
            return window.alert("You Won! You Won!")
        }

        setGameStatus(false)
        return window.alert("You Lost! You Lost!")
    }

    const handleNewGame = async () => {
        await shuffleDeck(deckId);
        const newPlayerHand = await getCard(deckId, 2)
        const newHouseHand = await getCard(deckId, 2)

        setHouse(newHouseHand.cards)
        setPlayer(newPlayerHand.cards)

        setGameStatus(true)
    }

    return (
        <div>
            <Player title="The House" hand={house} score={score.house}/>
            <Player title="The Player" hand={player} score={score.player}/>

            {gameStatus ?
                <div className="flex justify-evenly">
                    <button onClick={drawCard}>Hit</button>
                    <button onClick={handleStand}>Stand</button>
                </div> :
                <div>
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            }
        </div>
    );
}