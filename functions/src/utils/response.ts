
const response = (param:{code:number, message:string, success:boolean, data:any, tokens?:any}, res: any) => {
    const { code, message, success, data, tokens } = { ...param }

    res.status(code).send({
        message, success, data,
        tokens: tokens ? tokens : false
    })
}

export {
    response
}
