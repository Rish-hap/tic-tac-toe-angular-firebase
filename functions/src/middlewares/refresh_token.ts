const jwt = require("jsonwebtoken");

const refresh_token = (req: any, res: any, next: any) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    try {

        const decoded = jwt.verify(token, 'littltDarkAge')

        // let start_time = new Date()
        // let end_time = new Date(decoded.exp * 1000)

        // let diff = time_diff(end_time, start_time)

        // console.log(diff, "time_difference")

        // if (diff < 0) {
        //     console.log("Expired case")
        // } else {
        //     console.log("Not Expired")
        // }

        req.user = decoded;
    } catch (err) {
        
    }
    return next()
}

export {
    refresh_token
}
