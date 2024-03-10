import Gameboard from "@/components/GameBoard";

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
  const house = await getInitialCards();
  const deckId = house.deck_id;
  const player = await getInitialCards(deckId);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Gameboard initialHouse={house.cards} initialPlayer={player.cards} deckId={deckId}/>
    </main>
  );
}
