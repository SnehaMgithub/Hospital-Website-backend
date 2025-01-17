import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      doctor: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        default: "",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    approved:{
        type:Boolean,
        default:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Post = mongoose.model('Post', postSchema);
export default Post;