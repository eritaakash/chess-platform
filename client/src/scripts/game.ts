const API = 'https://chess-3ar5.onrender.com/api';

export const initializeGame = async () => {
    const response = await fetch(`${API}/game/new`);
    const data = await response.json();

    return data.gameId;
};

export const listenToGameEvents = (socket: any, gameId: string, setGame: Function) => {

    socket.on(`game:update:${gameId}`, (game: any) => {
        setGame(game);
    });

    socket.on(`game:error:${gameId}`, (error: string) => {
        setGame((current: any) => {
            return {
                ...current,
                error
            }
        });
    });
}