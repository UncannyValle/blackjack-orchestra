import GameBoard from "@/components/GameBoard";

export interface Card {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}

export interface DrawCardsResponse {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
}

async function getInitialCards(deckId: string = 'new') {
    const res: Response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)

    if (!res.ok) {
        throw new Error("Failed to fetch shuffle data.");
    }

    return res.json();
}

export default async function Home() {
    const house: DrawCardsResponse = await getInitialCards();
    const deckId: string = house.deck_id;
    const player: DrawCardsResponse = await getInitialCards(deckId);

    return (
        <main className="container mx-auto min-h-screen p-24 text-center">
            <h1 className='font-bold text-6xl mb-16'>Let&apos;s Play Some Blackjack!</h1>
            <GameBoard initialHouse={house.cards} initialPlayer={player.cards} deckId={deckId}/>
        </main>
    );
}