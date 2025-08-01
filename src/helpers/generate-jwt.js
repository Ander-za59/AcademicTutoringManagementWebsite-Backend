import jwt from "jsonwebtoken"

export const generateJWT = (_id = " ", username = "", role = "") => {
    return new Promise((resolve, reject) => {
        const payload = { _id, username, role  }

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) =>{
                if(err){
                    reject({
                        success: false,
                        message: err
                    })
                }else{
                    resolve(token)
                }
            }
        )
    })
}