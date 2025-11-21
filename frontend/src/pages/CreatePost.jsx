import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Import your auth context
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth(); // ✅ Get token from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to create a post.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Post created successfully!");
        setTitle("");
        setContent("");
        // Navigate to home or the post detail page after success
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to create post"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Create a New Post
      </h2>

      {message && (
        <p className="mb-4 text-center text-sm text-blue-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your content here..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
