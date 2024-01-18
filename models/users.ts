import mongoose from "mongoose"
const Schema: any = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })


const User: any = mongoose.model('User', userSchema);

export default User