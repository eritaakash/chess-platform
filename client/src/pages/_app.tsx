import React, { useEffect, useState } from 'react';
import { ChessContext, ChessContextType } from '@/contexts/chess';

import { AppProps } from 'next/app';
import '@/styles/globals.css';

import io from 'socket.io-client';

const ChessGame = ({ Component, pageProps }: AppProps) => {

    const [data, setData] = useState({
        socket: null
    } as ChessContextType);

    useEffect(() => {
        const socket = io('https://chess-3ar5.onrender.com/');
        setData({ socket });


        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <ChessContext.Provider value={data}>
            <Component {...pageProps} />
        </ChessContext.Provider>
    );
};

export default ChessGame;