import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'

const jwtVerify = (token : string, secret : string) => {
    try{
        const decoded = jwt.verify(token, secret)
        return decoded
    }
    catch(err){
        throw err
    }

}
const jwtSign = (jwtPayload : JwtPayload, secret : string, expiresIn : SignOptions)=>{
    try{
           const token = jwt.sign(jwtPayload,secret,
                { expiresIn: expiresIn } as SignOptions )

            return token
    }
    catch(err){
        throw err
    }
}

export  const jwtUtils ={
    jwtVerify,
    jwtSign
}

