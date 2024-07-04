import React, { useState, useEffect, useContext } from 'react';
import { ChessContext } from '@/contexts/chess';

import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

import styles from '@/styles/game.module.scss';


const ChessBoard = ({ gameData, setGameData, orientation }: any) => {

    const [chess, setChess] = useState(new Chess());
    const { socket } = useContext(ChessContext);

    const [isMyTurn, setIsMyTurn] = useState(false);

    const movePiece = (from: string, to: string, promotion: string | undefined) => {

        const clone = { ...chess };
        const params = promotion ? { from, to, promotion } : { from, to };

        const move = clone.move(params as any);

        if (move === null) return;
        setChess(clone);
    }

    const onDrop = (from: string, to: string) => {
        socket.emit(`game:movePawn`, { from, to, id: gameData._id });
    };

    const promote = (piece: string, from: string, to: string) => {
        const promotion = piece[1].toLowerCase();
        socket.emit(`game:movePawn`, { from, to, id: gameData._id, promotion: promotion });
    };

    useEffect(() => {
        if (chess.game_over()) {

            const winner = chess.turn() === 'w' ? 'black' : 'white';
            const result = chess.in_checkmate() ? 'checkmate' : 'stalemate';
            
            const msg = winner === orientation ? 'You won!' : 'You lost!';

            setGameData((current: any) => {
                return {
                    ...current,
                    over: true,
                    msg,
                    winner,
                    result
                }
            });
        }

        if (chess.in_draw()) {
            setGameData((current: any) => {
                return {
                    ...current,
                    draw: true
                }
            });
        }

        if (orientation) {
            const turn = chess.turn() === 'w' ? 'white' : 'black';
            setIsMyTurn(turn === orientation);
        }


    }, [chess, orientation]);

    useEffect(() => {
        socket.on(`game:move:${gameData._id}`, (data: any) => {
            movePiece(data.from, data.to, data.promotion);
        });
    }, []);

    return (
        <div 
            className={`${styles.boardParent} ${isMyTurn ? '' : styles.disabled }`}>
            <Chessboard
                position={chess.fen()}
                onPieceDrop={onDrop as any}
                onPromotionPieceSelect={promote as any}
                promotionDialogVariant={'vertical'}
                customLightSquareStyle={{ backgroundColor: 'mediumslateblue' }}
                customDarkSquareStyle={{ backgroundColor: 'darkslateblue' }}
                boardOrientation={orientation} 
            />
        </div>
    );
};

export default ChessBoard;