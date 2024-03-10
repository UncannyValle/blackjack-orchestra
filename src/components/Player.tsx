import Image from 'next/image'
import { Card } from "@/app/page";

interface Props {
    hand: Card[],
    score: number,
    title: string
}


const values: { [key: string]: string } = {
    "ACE": "11 or 1",
    "KING": '10',
    "QUEEN": '10',
    "JACK": '10',
}

export default function Player({ hand, score, title }: Props) {
    return (
        <div className='w-1/2 mx-auto mb-8'>
            <div className='flex justify-around'>
                {hand && hand.map((card: Card) => {
                        const value: string = values[card.value] ?? card.value

                        return (
                            <div className='w-32 transition hover:animate-pulse hover:scale-110'
                                 title={`Value: ${value}`}
                                 key={card.code}>
                                <Image src={card.image} alt={card.code} width={100} height={300} priority
                                       className="w-full h-auto"/>
                            </div>
                        )
                    }
                )}
            </div>
            <h1 className='font-bold text-3xl text-center my-8'>{title}: {score}</h1>
        </div>
    )
}