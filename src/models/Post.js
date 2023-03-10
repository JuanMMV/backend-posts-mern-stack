import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, //quita los espacioes en blanco de los lados
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
});

export default mongoose.model('Post', postSchema)