import { createContext } from 'react';

export type ChessContextType = {
    socket: any | null;
}

export const ChessContext = createContext({
    socket: null
} as ChessContextType);