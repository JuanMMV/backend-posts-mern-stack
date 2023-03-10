import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
      image = await uploadImage(req.files.image.tempFilePath);
    }

    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    let image;
    const { title, description } = req.body;

    if (req.files?.image) {
      const oldImage = await Post.findById(req.params.id);
      if (JSON.stringify(oldImage.image) !== "{}") {
        await deleteImage(oldImage.image.public_id);
      }
      image = await uploadImage(req.files.image.tempFilePath);
    }

    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      {
        new: true,
      }
    );

    return res.send(updatePost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    //await Post.findByIdAndDelete(req.params.id) tambien puede ser asi pero no retorna nada
    if (!postRemoved) return res.sendStatus(404);

    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
