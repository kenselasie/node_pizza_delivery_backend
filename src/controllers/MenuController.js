import Menu from '../models/MenuModel.js'



export class MenuController {
    static async getAllMenu(req, res) {
        try {
            const menu = await Menu.find().select('menu_name price')

            if (menu) {
                return res.status(200).json({
                    message: 'Successful',
                    data: menu
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }

    static async addMenu(req, res) {     
        const { menu_name, price } = req.body
        try {
            const menu = new Menu({
                menu_name: menu_name,
                price: price
            })
            let result = await menu.save()
            if (!result) {
                return res.status(500).json({
                    error: err
                })    
            }

            res.status(201).json({
                message: 'Menu Successfully Created'
            })
        
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }
}