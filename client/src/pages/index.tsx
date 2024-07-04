import React, { useState, useRef } from 'react';
import styles from '@/styles/index.module.scss';

import { useRouter } from 'next/router';

import Icons from 'feather-icons-react';
import { initializeGame } from '@/scripts/game';

const Home = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const createRoom = async () => {
        const gameId = await initializeGame();
        router.push(`/game/${gameId}`);
    };

    const joinRoom = () => {
        const gameId = inputRef.current?.value;

        if (gameId) {
            router.push(`/game/${gameId}`);
        }
    };

    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <h1>Let's Play Chess!</h1>
                <p>An invite-only Chess Platform</p>

                <Icons icon='link' />

                <div className={styles.cta}>
                    <button onClick={createRoom}>Create a Room!</button>

                    <div>
                        <input placeholder='...Or enter a Game ID' ref={inputRef} />
                        <button onClick={joinRoom}>Go!</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;