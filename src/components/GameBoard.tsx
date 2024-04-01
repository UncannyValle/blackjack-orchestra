'use client'

import { lazy, Suspense } from "react";
import { Card } from "@/app/page";
import useBlackjackGame from "@/hooks/useBlackjackGame";

const Player = lazy(() => import('@/components/Player'));

type GameBoardProps = {
    initialHouse: Card[]
    initialPlayer: Card[]
    deckId: string
}

export default function GameBoard({ initialHouse, initialPlayer, deckId }: GameBoardProps) {
    const {
        house,
        player,
        gameStatus,
        drawCard,
        handleNewGame,
        handleStand,
        houseScore,
        playerScore
    } = useBlackjackGame(deckId, initialHouse, initialPlayer)
    const LoadingPlayer = () => <p>Loading Player...</p>;


    return (
        <>

            <Suspense fallback={<LoadingPlayer/>}>
                <Player title="The House" hand={house} score={houseScore}/>
            </Suspense>
            <hr className="h-0.5 bg-slate-600 mb-8"/>
            <Suspense fallback={<LoadingPlayer/>}>
                <Player title="The Player" hand={player} score={playerScore}/>
            </Suspense>


            {gameStatus === 'playing' || gameStatus === 'loading' ?
                <div className="text-center">
                    <button
                        className='rounded-full mr-8 bg-green-600 text-slate-50 p-4 w-24 transition hover:scale-110 hover:drop-shadow-lg'
                        onClick={drawCard}>Hit
                    </button>
                    <button
                        className='rounded-full bg-red-500 text-slate-50 p-4 w-24 transition hover:scale-110 hover:drop-shadow-lg'
                        onClick={handleStand}>Stand
                    </button>
                </div> :

                <div
                    className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen h-screen bg-black bg-opacity-60">
                    <div
                        className="text-center bg-slate-50 text-black w-80 h-80 rounded p-8 flex flex-col items-center justify-center">
                        <h2 className='animate-bounce text-3xl font-bold mb-4'>{gameStatus === 'won' ? 'You won!🥳' : 'You lost!😕'}</h2>
                        <h3 className='text-lg mb-8'><span className='font-bold'>Player:</span> {playerScore} <span
                            className='font-bold'>House:</span> {houseScore}</h3>
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