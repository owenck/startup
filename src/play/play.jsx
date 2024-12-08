import React from 'react';
import { Friends } from "./friends"
import { TagGame } from "./tagGame"

export function Play ({userName, friends, increaseScore}) {
    return (
        <main className='container-fluid bg-secondary text-center'>
            <Friends userName={userName} friends={friends} increaseScore={increaseScore}/>
        </main>
    );
}