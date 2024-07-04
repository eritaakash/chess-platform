import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/game.module.scss';
import { ChessContext } from '@/contexts/chess';

import Icons from 'feather-icons-react';
import ChessBoard from '@/components/chessBoard';

import { listenToGameEvents } from '@/scripts/game';

const Game = () => {
    const router = useRouter();
    const gameId = router.query.id;

    const { socket } = useContext(ChessContext);
    const [game, setGame] = useState({ players: [] } as any);

    const [orientation, setOrientation] = useState(null as any);

    useEffect(() => {

        if (!socket) return;
        if (router.isReady) {
            socket.emit('game:join', gameId);
            listenToGameEvents(socket, gameId as string, setGame);
        }

        return () => {
            socket.emit('game:leave', gameId);
        }
    }, [socket, router.isReady]);

    const myTurn = (turn: string, id: string) => {
        return turn === id;
    }

    useEffect(() => {
        if (game.players.length === 2) {

            const turn = game.turn
            console.log(turn, socket.id)

            const orientation = myTurn(turn, socket.id)
                ? 'white'
                : 'black';

            setOrientation(orientation);

        };
    }, [game.players]);

    useEffect(() => {
        if (game.over || game.draw) {
            
            fetch(`/api/game/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (res) => res.json()
            ).then(
                (data) => {
                    console.log(data);
                }
            )
        };
    }, [game.over, game.draw]);

    if (!socket) {
        return (
            <main className={styles.main}>
                <section className={styles.connecting}>
                    <Icons icon='loader' />
                    <h1>Connecting...</h1>
                </section>
            </main>
        )
    }

    if (game.error) {
        return (
            <main className={styles.main}>
                <section className={styles.error}>
                    <Icons icon='alert-triangle' />
                    <h1>Error: {game.error}</h1>
                </section>
            </main>
        )
    }

    if (game.players.length !== 2) {
        return (
            <main className={styles.main}>
                <section className={styles.waiting}>
                    <Icons icon='loader' />
                    <h1>Waiting for opponent...</h1>
                </section>
            </main>
        )
    }

    if (game.over) {
        return (
            <main className={styles.main}>
                <section className={styles.waiting}>
                    <Icons icon='slash' />
                    <h1>{game.msg}</h1>
                    <h3>{game.winner} won by {game.result}</h3>
                </section>
            </main>
        )
    }

    if (game.draw) {
        return (
            <main className={styles.main}>
                <section className={styles.waiting}>
                    <Icons icon='slash' />
                    <h1>Draw!</h1>
                </section>
            </main>
        )
    }

    return (
        <main className={styles.main}>
            <section className={styles.gameArea}>
                    <ChessBoard 
                        gameData={game} 
                        setGameData={setGame}
                        orientation={orientation}
                    />
            </section>
        </main>
    )
};

export default Game;