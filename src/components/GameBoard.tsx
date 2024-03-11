'use client'

import { useEffect, useMemo, useState } from "react";
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
    const [gameStatus, setGameStatus] = useState('playing')

    const houseScore = useMemo(() => calculatePointTotal(house), [house]);
    const playerScore = useMemo(() => calculatePointTotal(player), [player]);

    useEffect(() => {
        if (playerScore > 21 || houseScore === 21) {
            setGameStatus('lost')
        }
        if (playerScore === 21) {
            setGameStatus('won')
        }

    }, [houseScore, playerScore])

    const drawCard = async () => {
        const newCard = await getCard(deckId, 1)
        setPlayer([...player, newCard.cards[0]])
    }

    const handleStand = () => {
        if (playerScore >= houseScore) {
            return setGameStatus('won');
        }

        return setGameStatus('lost')
    }

    const handleNewGame = async () => {
        await shuffleDeck(deckId);
        const [newHouseHand, newPlayerHand] = await Promise.all([getCard(deckId, 2), getCard(deckId, 2)])

        setHouse(newHouseHand.cards)
        setPlayer(newPlayerHand.cards)
        setGameStatus('playing')
    }

    return (
        <>
            <Player title="The House" hand={house} score={houseScore}/>
            <hr className='h-0.5  bg-slate-600 mb-8'/>
            <Player title="The Player" hand={player} score={playerScore}/>

            {gameStatus === 'playing' &&
                <div className="text-center">
                    <button
                        className='rounded-full mr-8 bg-green-600 text-slate-50 p-4 w-24 transition hover:scale-110 hover:drop-shadow-lg'
                        onClick={drawCard}>Hit
                    </button>
                    <button
                        className='rounded-full bg-red-500 text-slate-50 p-4 w-24 transition hover:scale-110 hover:drop-shadow-lg'
                        onClick={handleStand}>Stand
                    </button>
                </div>
            }


            {
                gameStatus !== 'playing' &&

                <div
                    className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen h-screen bg-black bg-opacity-60">
                    <div
                        className="text-center bg-slate-50 w-80 h-80 rounded p-8 flex flex-col items-center justify-center">
                        <h2 className='animate-bounce text-3xl font-bold mb-4'>{gameStatus === 'won' ? 'You won!' : 'You lost!'}</h2>
                        <button
                            className='rounded-full bg-green-600 text-slate-50 p-4 transition hover:scale-110 hover:drop-shadow-lg'
                            onClick={handleNewGame}>
                            New Game
                        </button>
                    </div>
                </div>
            }

        </>
    );
}