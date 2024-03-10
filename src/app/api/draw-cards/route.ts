import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const searchParams: URLSearchParams = request.nextUrl.searchParams

    const deckId: string | null = searchParams.get('deck_id')
    const count: string | null = searchParams.get('count')

    const res: Response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);

    const data = await res.json();

    return Response.json(data);
}