import { useCallback, useEffect, useMemo, useState } from "react";
import { calculatePointTotal } from "@/lib/scoreCountingLogic";
import { getCard, shuffleDeck } from "@/lib/cardFetchingLogic";
import { Card } from "@/app/page";

export default function useBlackjackGame(deckId: string, initialPlayer: Card[], initialHouse: Card[]) {
    const [house, setHouse] = useState(initialHouse)
    const [player, setPlayer] = useState(initialPlayer)
    const [gameStatus, setGameStatus] = useState('playing')

    const houseScore = useMemo(() => calculatePointTotal(house), [house]);
    const playerScore = useMemo(() => calculatePointTotal(player), [player]);

    useEffect(() => {
        if (playerScore > 21 || houseScore === 21) {
            return setGameStatus('lost')
        }
        if (playerScore === 21) {
            return setGameStatus('won')
        }

    }, [houseScore, playerScore])

    const drawCard = useCallback(async () => {
        const newCard = await getCard(deckId, 1)
        setPlayer([...player, newCard.cards[0]])
    }, [deckId, player])

    const handleStand = useCallback(() => {
        if (playerScore >= houseScore) {
            return setGameStatus('won');
        }

        return setGameStatus('lost')
    }, [houseScore, playerScore])

    const handleNewGame = useCallback(async () => {
        setGameStatus('loading')
        await shuffleDeck(deckId);
        const [newHouseHand, newPlayerHand] = await Promise.all([getCard(deckId, 2), getCard(deckId, 2)])

        setHouse(newHouseHand.cards)
        setPlayer(newPlayerHand.cards)
        setGameStatus('playing')
    }, [deckId])


    return { house, player, gameStatus, drawCard, handleStand, handleNewGame, houseScore, playerScore };
}