import axios from "axios";
import * as functions from "firebase-functions";
import { database } from "./database"
// import axios from "axios"

export const onCreate = functions.database
    .ref('games_info/')
    .onCreate((snapshot: any, context: any) => {
        update_counter(snapshot._data)
    })

export const onUpdate = functions.database
    .ref('games_info/')
    .onUpdate((snapshot: any, context: any) => {
        update_counter(snapshot.after._data)
    })


export const onDelete = functions.database
    .ref('games_info/')
    .onDelete((snapshot: any, context: any) => {
        update_counter(snapshot.after._data)
    })


let objectKeys = Object.keys

const send_data = async (name: any) => {
    console.log(name, "name in send_data")
    const dbRef = database.ref('games_info')
    let games = await dbRef.once('value').then((data: any) => (data.val()))

    let time = 0
    let turns = 0

    games.forEach((element: any) => {
        if (element.won === name) {
            time = time + element[name].time
            turns++
        }
    })

    axios.post('https://en7v2rtwkexgm.x.pipedream.net/', {
        playerName: name,
        averageWinMinutes: time / turns
    })
        .then(res => {
            console.log("Successfully updated")
        })
        .catch(error=>{
            console.log(error, "Error in Send Data")
        })
}



const update_counter = async (data: any) => {
    // last Added Game
    let games_info = data['0']

    let dbRef = await database.ref('player_counter')

    let obj: any = {}
    let val = await dbRef.once('value').then((data: any) => (data.val()))
    if (val) {     //  "Player_counter Object from database"
        obj = { ...val }
    }
    // Name of the Player who won the game
    let name = games_info[games_info['won']].name

    // Array of all the names
    let names = objectKeys(obj)

    let indexdValue = names.indexOf(name)
    if (indexdValue !== -1) {
        obj[name] = obj[name] + 1
        if (obj[name] % 5 === 0) {
            send_data(name)
        }
    } else {
        obj = { ...obj, [name]: 1 }
    }

    // Setting the object in DBs
    if (dbRef === null) {
        dbRef = database.ref().child('player_counter')
        dbRef.set(obj)
    } else {
        dbRef = database.ref().child('player_counter')
        dbRef.update(obj)
    }
}

