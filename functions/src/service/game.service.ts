import { database } from "../database"


// To GET Games from the database
const get_games = async () => {

    const dbRef = database.ref('games_info')
    let games_info = await dbRef.once('value').then((data: any) => (data.val()))

    return games_info
}

// To Set Games to the database
const set_games = async (games: any) => {
    let dbRef = database.ref().child('games_info')
    dbRef.set(games)
}

export {
    get_games,
    set_games
}
