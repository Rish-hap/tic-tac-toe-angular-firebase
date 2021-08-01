const jwt = require("jsonwebtoken");

const auth = (req:any, res:any, next:any) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send( {
        success:false,
        message:"A token is required for authentication"
    });
  }
  try {
    const decoded = jwt.verify(token, 'littltDarkAge')
    console.log(decoded,"decoded")
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
        success:false,
        message:"Invalid Token"
    })
  }
  return next();
}

export {
    auth
}
