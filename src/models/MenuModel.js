import mongoose from "mongoose";


const menuSchema = mongoose.Schema({
    menu_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Menu', menuSchema)