'use client'
import Image from 'next/image'
import { Card } from "@/app/page";

interface Props{
    hand: Card[],
    score: number,
    title: string
}

export default function Player({hand, score, title}: Props) {
    return (
        <div>
            <h1 className='text-3xl text-center'>{title}</h1>
            <div className='flex'>
                {hand && hand.map((card: Card, index: number) => (
                    <Image src={card.image} key={index} alt={card.code} width={100} height={300} priority
                           className="w-full h-auto"/>
                ))}
            </div>
            <h3>Total: {score}</h3>
        </div>
    )
}