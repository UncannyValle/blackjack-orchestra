'use client'

import { useEffect, useState } from "react";
import { Card } from "@/app/page";
import { calculatePointTotal } from "@/lib/scoreCountingLogic";
import { getCard } from "@/lib/gamePlayLogic"
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

    useEffect(() => {
        const updateScore = () => {
            const newHouseScore = calculatePointTotal(house)
            const newPlayerScore = calculatePointTotal(player)
            setScore({ player: newPlayerScore, house: newHouseScore });
        }

        if (score.player > 21 || score.house === 21) {
            window.alert("You lost! You lost!")
        }

        updateScore();

    }, [house, player, score.house, score.player])

    const drawCard = async () => {
        const newCard = await getCard(score, deckId)

        setPlayer([...player, newCard.cards[0]])
    }

    const handleStand = () => {
        if (score.player > score.house) {
            return window.alert("You Won! You Won!")
        }

        return window.alert("You Lost! You Lost!")
    }

    return (
        <div>
            <Player title="The House" hand={house} score={score.house}/>
            <Player title="The Player" hand={player} score={score.player}/>
            <button onClick={drawCard}>Hit</button>
            <button onClick={handleStand}>Stand</button>
        </div>
    );
}