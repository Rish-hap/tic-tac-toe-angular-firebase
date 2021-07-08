export interface Game {
    player1: {
        name: string,
        avatar: string,
        moves: number,
        time: number
    },
    player2: {
        name: string,
        avatar: string,
        moves: number,
        time: number
    },
    Time: number,
    won: string,
    _id: string
}
