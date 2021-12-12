import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
        match: /.+\@.+\..+/
    },
    street_address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minimum: 6
    }
})

export default mongoose.model('User', userSchema)