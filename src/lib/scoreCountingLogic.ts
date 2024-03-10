import { Card } from "@/app/game-start/[deck_id]/page";

export const calculatePointTotal = (hand: Card[]) => {
    let newScore = 0

    hand.forEach((card: Card) => {
        switch (card.value) {
            case 'JACK':
            case "QUEEN":
            case "KING":
                if (newScore < 21) {
                    newScore += 10;
                }
                break;
            case'ACE':
                const test = newScore + 11
                if (test > 21) {
                    newScore += 1;
                } else {
                    newScore += 11;
                }
                break;
            default:
                const numericValue = Number(card.value);
                newScore += numericValue;
        }
    });

    return newScore;
};