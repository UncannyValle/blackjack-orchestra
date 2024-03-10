import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const searchParams: URLSearchParams = request.nextUrl.searchParams

    const deckId: string | null = searchParams.get('deck_id')

    const res: Response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);

    const data = await res.json();

    return Response.json(data);
}