import Order from '../models/OrderModel.js'
import Menu from '../models/MenuModel.js'
import { sendEmailMessage  } from './helpers/helperFunctions.js'



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
            const saveOrder = await order.save()


            if (saveOrder) {
                let price = parseFloat(menu.price)
                let quantityInt = parseInt(quantity)

                const total = price * quantityInt
                sendEmailMessage(
                    "Mailgun Sandbox <postmaster@sandbox73976b9442b344a8b85348577eb32fc5.mailgun.org>",
                    req.userAuthData.email,
                    'Pizza Receipt',
                    `Hi Customer, your order was successful, \n\n Menu bought: \t  ${menu.menu_name} \n\n Quantity: \t ${quantity} \n\n Total: \t ${total}`,
                    (err, body) => {
                       if (err) return res.status(201).json({
                            message: 'Order successfully made',
                            receiptSent: false,
                            order: {
                                menu: order.menu,
                                quantity: order.quantity
                            }
                        })
                       
                       return res.status(201).json({
                            message: 'Order successfully made',
                            receiptSent: true,
                            order: {
                                menu: order.menu,
                                quantity: order.quantity
                            }
                        })
                    }

                )
            }      
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }
}