import * as functions from "firebase-functions";

const app = require("./app")


const v1 = functions.https.onRequest(app);

export {
    v1
}
