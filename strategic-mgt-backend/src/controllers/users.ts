import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import UserHandlers from "../data/users/UserHandlers";
import {generateToken} from "../utils/auth";
import bcrypt from 'bcrypt';
import {parseJwt} from "../utils/generalUtils";


// export const getSingleUser =
//     catchErrors(async (req, res) => {
//         const {email} = req.body
//         const data = await DataProvider.create()
//         const user =  await (await UserHandlers.create(data)).get({email: email.toString()})
//         res.respond({
//             data: user
//         });
//     });

export const getUsers =
    catchErrors(async (req, res) => {
        console.log("body", req.body)
        const data = await DataProvider.create()
        const userHandler = await UserHandlers.create(data)
        const users = await userHandler.getAll({})
        return res.respond({
            data: users
        })
    })


export const getUser =
    catchErrors(async (req, res) => {
        let jwt = req.headers.authorization
        const jwtKey = jwt && jwt.slice('bearer'.length).trim()
        const parsed = parseJwt(jwtKey)
        return res.respond({
            payload: parsed.payloadObject
        })
    })

export const login =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { email, password } = req.body;

        if (!(email && password )) {
            res.status(400).send("Email and password are required!");
        }

        const emailExists    =   await (await UserHandlers.create(data)).get({email})

        const userObject = emailExists
        const passwordMatch = emailExists && await bcrypt.compare(password, userObject.password)

        if (userObject && passwordMatch) {
            const token = generateToken(userObject)
            const jsonInfo = {
                ...userObject,
                token
            }

            if (userObject.coordinator){
                return res.respond({
                    ...jsonInfo
                });
            }

            return res.respond({
                ...jsonInfo
            });
        }

        return res.status(401).send({message: "username or password incorrect!"});
    })