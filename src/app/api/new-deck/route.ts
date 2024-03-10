import { NextRequest } from "next/server";

export async function GET(): Promise<Response> {
    const res: Response = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`);

    const data = await res.json();

    return Response.json(data);
}