'use client'

import { useState } from "react";
import { DrawCardsResponse } from "@/app/page";
import TheHouse from "@/components/TheHouse";

type GameboardProps = {
    initialHouse: DrawCardsResponse
    initialPlayer: DrawCardsResponse
}

export default function Gameboard ({initialHouse, initialPlayer}: GameboardProps) {
    const [house,setHouse] = useState<DrawCardsResponse>(initialHouse)
    const [players,setPlayers] = useState<DrawCardsResponse>(initialPlayer)

    return (
        <div>
            <TheHouse houseHand={house.cards}/>
        </div>
    );
}