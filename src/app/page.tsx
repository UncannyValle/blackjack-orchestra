import Gameboard from "@/components/Gameboard";

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
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)

  if (!res.ok) {
    throw new Error("Failed to fetch shuffle data.");
  }

  return res.json();
}

export default async function Home() {
  const houseCards = await getInitialCards();
  const deckId = houseCards.deck_id;
  const playerCards = await getInitialCards(deckId);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Gameboard initialHouse={houseCards} initialPlayer={playerCards}/>
    </main>
  );
}
