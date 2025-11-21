import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    ratings: [ratingSchema],     // ⭐ Array of user ratings
    views: { type: Number, default: 0 },  // 👁️ View counter
  },
  { timestamps: true }
);

// ✅ Virtual to calculate average rating
postSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((acc, r) => acc + r.value, 0);
  return total / this.ratings.length;
});

const Post = mongoose.model("Post", postSchema);
export default Post;
