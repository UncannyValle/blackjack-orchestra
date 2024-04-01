export const getCard = async (deckId: string, count: number) => {
    try {
        const response: Response = await fetch(`/api/draw-cards?deck_id=${deckId}&count=${count}`, {
            method: "GET",
            cache: "no-store",
        });

        return response.json();

    } catch (error) {
        console.error(error);
    }
}

export const shuffleDeck = async (deckId: string) => {
    try {
        await fetch(`/api/shuffle-cards?deck_id=${deckId}`, {
            method: "GET",
            cache: "no-store",
        });

    } catch (error) {
        console.error(error, "No shuffle deck");
    }
}