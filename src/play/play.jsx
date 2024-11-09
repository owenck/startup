import React from 'react';
import { Friends } from "./friends"

export function Play ({userName, friends }) {
    return (
        <main className='container-fluid bg-secondary text-center'>
            <Friends userName={userName} friends={friends} />
        </main>
    );
}