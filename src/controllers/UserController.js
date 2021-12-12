import User from '../models/UserModel.js'
import { validMongoDBId } from './helpers/helperFunctions.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.find().select('name email street_address')

            if (users) {
                return res.status(200).json({
                    message: 'Successful',
                    data: users
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }

    static async addUser(req, res) {     
        const { name, email, password, street_address } = req.body
        try {
            const user = await User.find({ email: email })
            if (user.length >= 1) return res.status(409).json({
                    message: 'Mail already exits'
            })
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                const user = new User({
                    name: name,
                    street_address: street_address,
                    email: email.toLowerCase(),
                    password: hash
                })
                let result = await user.save()
                if (!result) {
                    return res.status(500).json({
                        error: err
                    })    
                }
    
                res.status(201).json({
                    message: 'User Successfully Created'
                })
            })
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }

    static async userLogin(req, res) {
        const email = req.body.email.toLowerCase()
        const password = req.body.password

        try {
            let user = await User.findOne({ email: email })
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const token = jwt.sign({
                    email: user.email,
                    user_id: user._id
                }, process.env.JWT_KEY, {
                    expiresIn: '30d'
                })
    
                return res.status(200).json({
                    message: 'Successfully Logged In',
                    token
                })
            }
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    }
    
    static async userLogout(req, res) {
        const { token } = req.query
        return res.status(500).json({
            message: 'Successfully logged out, Token destroyed'
        })
    }

    static async getUserById(req, res) {
        const { id } = req.params
        if (!validMongoDBId(id)) return res.status(400).json({
            message: 'Invalid ID passed'
        })
        try {
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({message: `No user with that id of ${id}`})
            }
            return res.status(200).json({
                message: "Success",
                data: {
                    _id: user._id,
                    name: user.name, 
                    email: user.email, 
                    street_address: user.street_address, 
                }
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    }

    static async updateUserById(req, resp) {
        const { id } = req.params
        const body = req.body
        
        const pickData = (({ name, email, street_address }) => ({ name, email, street_address }))(body);

        try {
            let result = await User.updateMany({ _id: id }, { $set: pickData }, { new: true })
            if (!result) return resp.status(500).json({ message: 'Something bad occurred updating'  })
            
            return resp.status(200).json({
                message: 'User info updated succesfully'
            })
        } catch (err) {
            console.log(err)
            return resp.status(500).json({ error: err })
        }
    }

    static async deleteUserById(req, resp) {
        const { id } = req.params
        try {
            const user = await User.findOne({ _id: id })
            if (!user) return resp.status(500).json({
                message: 'No such user exits to be deleted'
            })
    
            const remove = await User.remove({ _id: id })
    
            resp.status(200).json({
                message: 'User Deleted'
            })
        }
        catch (err) {
            resp.status(500).json(err)
        }
    }
}