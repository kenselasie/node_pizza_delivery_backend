import Order from '../models/OrderModel.js'
import Menu from '../models/MenuModel.js'
import { validMongoDBId } from './helpers/helperFunctions.js'



export class OrderController {
    static async getAllOrders(req, res) {
        try {
            const orders = await Order.find()
                .populate()
                .select('menu quantity')

            if (orders) {
                return res.status(200).json({
                    message: 'Successful',
                    data: orders
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})
        }
    }

    static async addOrder(req, res) {     
        const { menu_id, quantity  } = req.body
        console.log(req.userAuthData)
        try {
            const menu = await Menu.findById(menu_id)
            if (!menu) {
                return res.status(404).json({
                    message: 'No menu with that id',
                })
            }
            const order = new Order({
                menu: menu_id,
                quantity: quantity
            })
            await order.save()
            res.status(201).json({
                message: 'Order successfully made',
                order: {
                    menu: order.menu,
                    quantity: order.quantity
                }
            })      
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }
}