import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', // Connect this schema to the Menu model
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

export default mongoose.model('Order', orderSchema)