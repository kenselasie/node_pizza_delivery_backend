import mongoose from "mongoose"

export const validMongoDBId = (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) return true
    return false
}


