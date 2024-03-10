interface Score {
    house: number,
    player: number

}

export const getCard = async (score: Score, deckId: string) => {
    try {
        const response: Response = await fetch(`/api/draw-cards?deck_id=${deckId}&count=1`, {
            method: "GET",
            cache: "no-store",
        });

        return response.json();

    } catch (error) {
        console.error(error);
    }

}