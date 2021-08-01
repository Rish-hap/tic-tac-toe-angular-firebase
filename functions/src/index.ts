import * as functions from "firebase-functions";
import { onUpdate, onCreate, onDelete } from "./db.triggers";

const app = require("./app")


const v1 = functions.https.onRequest(app);



export {
    v1,
    onUpdate,
    onCreate,
    onDelete
}
