import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,   
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  getMyPosts,
  getPostsByAuthor,
  getTrendingPosts,
  getTopRatedPosts,
  ratePost,      
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.route("/").get(getAllPosts).post(protect, createPost);
router.route("/mine").get(protect, getMyPosts);
router.route("/:id").get(getPostById).put(protect, updatePost).delete(protect, deletePost);
router.route("/:id/like").post(protect, toggleLike);
router.route("/:id/comment").post(protect, addComment);
router.route("/:id/rate").post(protect, ratePost);   
router.route("/author/:authorId").get(getPostsByAuthor);
router.route("/trending").get(getTrendingPosts);
router.route("/top-rated").get(getTopRatedPosts);

export default router;
