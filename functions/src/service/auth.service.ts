import { database } from "../database"
import { User } from "../models/user"


const get_users = async () => {

    const dbRef = database.ref('players')
    let players_info = await dbRef.once('value').then((data: any) => (data.val()))

    return players_info
}

// To Set Players to the database
const set_users = async (player: User) => {
    let dbRef = database.ref().child('players')
    let players = await dbRef.once('value').then((data: any) => (data.val()))
    if (!players) {
        players = []
    } else {

    }
    players.push(player)
    dbRef.set([...players])
}

const set_refresh_token = async (refresh_token: any) => {
    let dbRef = database.ref().child('refresh_tokens')
    let refresh_tokens = await dbRef.once('value').then((data: any) => (data.val()))
    let name = Object.keys(refresh_token)[0]
    if (!refresh_tokens) {
        refresh_tokens = {}
    } else {

    }
    
    refresh_tokens[name] = refresh_token[name]
    dbRef.set({...refresh_tokens})
}

const get_refresh_tokens = async () => {

    const dbRef = database.ref('refresh_tokens')
    let refresh_tokens = await dbRef.once('value').then((data: any) => (data.val()))

    return refresh_tokens
}

const update_users = async (players: Array<User>) => {
    let dbRef = database.ref().child('players')
    dbRef.update(players)
}

export {
    get_users,
    set_users,
    update_users,
    set_refresh_token,
    get_refresh_tokens
}
