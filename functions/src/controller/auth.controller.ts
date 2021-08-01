import * as httpStatus from "http-status"
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
import * as randToken from "rand-token"

import { get_refresh_tokens, get_users, set_users, set_refresh_token } from "../service/auth.service"
import { User } from "../models/user"

import { response } from "../utils/response"


const check_username = (name: string, old_users: Array<User>): boolean => {
    return (old_users.filter((user: User) => (user.name === name)).length !== 0)
}
const find_user = (name: string, old_users: Array<User>) => {
    let user = old_users.filter((user: User) => (user.name === name))
    if (user.length !== 0) {
        return user[0]
    } else {
        return false
    }
}

const signIn = async (req: any, res: any) => {

    const { name, password } = req.body

    if (!(password && name)) {
        res.status(400).send({});
        response({ code: 400, message: "Enter all the details", success: false, data: {} }, res)
    }

    const old_users = await get_users()
    if (old_users) {
        // Non-Empty old_users
        const user = find_user(name, old_users)

        if (user) {
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { name: name },
                    "littltDarkAge",
                    {
                        expiresIn: "6h",
                    }
                );

                // save user token
                user.token = token;


                // Get Refresh tokens
                let refresh_tokens = await get_refresh_tokens()
                refresh_tokens = refresh_tokens ? refresh_tokens : {}

                // Create a Refresh tokens
                let refresh_token = randToken.uid(256)

                // Add it into the refresh tokens list

                set_refresh_token({ [name]: refresh_token })

                // user
                response({ code: httpStatus.OK, message: "Login Success", success: true, data: { ...user }, tokens: { 'access': token, 'refresh': refresh_token } }, res)

            } else {
                response({ code: 400, message: "Invalid Credentials", success: false, data: {} }, res)
            }
        } else {
            response({ code: 400, message: "Invalid Credentials", success: false, data: {} }, res)
        }
    } else {
        // Empty old  users
        response({ code: 400, message: "Invalid Credentials", success: false, data: {} }, res)
    }
}

const signUp = async (req: any, res: any) => {

    try {
        const { name, password } = req.body

        if (!(password && name)) {
            res.status(400).send({
                message: "Enter all the details",
                success: false,
                data: {}
            });
        }

        const old_users: Array<User> = await get_users()
        // Checking if username is already present
        if (old_users && check_username(name, old_users)) {
            response({ code: 400, message: 'User already exist."', success: false, data: {} }, res)
            throw new Error("User already exist")
        }
        // Encrypting the password
        let passwordhash: string = await bcrypt.hash(password, 10);

        // Creating User
        let user_data = {
            name: name,
            password: passwordhash,
            token: ''
        }

        const token = jwt.sign(
            { password: password, name: name },
            "littltDarkAge",
            {
                expiresIn: "6h",
            }
        )

        // save user token
        user_data.token = token;

        set_users(user_data)

        response({ code: httpStatus.OK, message: 'Player successfully added', success: true, data: user_data }, res)

    } catch (error) {
        console.log(error.message, "errin in signup")
    }
}



const isAuth = async (req: any, res: any) => {
    const { token } = req.body

    if (!(token)) {
        response({ code: 401, message: "No Token Found", success: false, data: {} }, res)
    }

    response({ code: httpStatus.OK, message: "Authenticated", success: true, data: {} }, res)
}


const getToken = async (req: any, res: any) => {
    console.log(req.body,"req.body")
    let name = req.body.name
    let refresh_token = req.body.refresh_token
    let refresh_tokens = await get_refresh_tokens()

    refresh_tokens = refresh_tokens ? refresh_tokens : {}

    console.log(refresh_tokens, refresh_token,"refresh_tokens and refresh token")
    console.log(refresh_token in refresh_tokens,"boom")

    // user

    if (!!(refresh_tokens[name]) && (refresh_tokens[name] == refresh_token)) {
            console.log("Inside true case")
        const token = jwt.sign(
            { name: name },
            "littltDarkAge",
            {
                expiresIn: "6h",
            }
        )
        // Create a Refresh tokens

        let random_token = randToken.uid(256)
        // Add it into the refresh tokens list
        set_refresh_token({ [name]: random_token })

       response({ code: httpStatus.OK, message: "New Tokens added", success: true, data: { }, tokens: { 'access': token, 'refresh': random_token } }, res)

    }else {
        console.log("_________")
        response({ code: 401, message: "Invalid Token", success: true, data: { }}, res)
    }
}


module.exports = {
    signUp, signIn, isAuth, getToken
}