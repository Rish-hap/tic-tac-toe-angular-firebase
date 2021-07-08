import { database } from "../database"


// To GET Avatars from the database
const get_avatars = async () => {

    const dbRef = database.ref('avatars_stats')
    let games_info = await dbRef.once('value').then((data: any) => (data.val()))

    return games_info
}

// To Set Games to the database
const set_avatars = async (avatars: any) => {
    let dbRef = database.ref().child('avatars_stats')
    dbRef.set(avatars)
}

const update_avatars = async (avatars: any) => {
    let dbRef = database.ref().child('avatars_stats')
    dbRef.update(avatars)
}

export {
    get_avatars,
    set_avatars,
    update_avatars
}
