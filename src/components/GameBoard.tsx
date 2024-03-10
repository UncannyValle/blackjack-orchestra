'use client'

import { useEffect, useState } from "react";
import { DrawCardsResponse } from "@/app/page";
import TheHouse from "@/components/TheHouse";
import { calculatePointTotal } from "@/lib/scoreCountingLogic";
import Player from "@/components/Player";

type GameBoardProps = {
    initialHouse: DrawCardsResponse
    initialPlayer: DrawCardsResponse
}

export default function GameBoard ({initialHouse, initialPlayer}: GameBoardProps) {
    const [house,setHouse] = useState<DrawCardsResponse>(initialHouse)
    const [player,setPlayer] = useState<DrawCardsResponse>(initialPlayer)
    const [score,setScore] = useState({house:0,player:0});

    useEffect(() => {
        const updateScore = () => {
            const newHouseScore = calculatePointTotal(house.cards)
            const newPlayerScore = calculatePointTotal(player.cards)
            setScore({player: newPlayerScore,house:newHouseScore});
        }

        updateScore();

    }, [house.cards, player.cards, score])

    return (
        <div>
            <Player title="The House" hand={house.cards} score={score.house}/>
            <Player title="The Player" hand={player.cards} score={score.player} />
        </div>
    );
}