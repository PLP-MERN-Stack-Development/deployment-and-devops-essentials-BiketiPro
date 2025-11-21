import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function HomePage() {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [topRatedBlogs, setTopRatedBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Try fetching all categories, fallback if any route doesn’t exist
        const [trendingRes, topRatedRes, recentRes] = await Promise.allSettled([
          API.get("/posts/trending"),
          API.get("/posts/top-rated"),
          API.get("/posts"),
        ]);

        if (trendingRes.status === "fulfilled") setTrendingBlogs(trendingRes.value.data);
        if (topRatedRes.status === "fulfilled") setTopRatedBlogs(topRatedRes.value.data);
        if (recentRes.status === "fulfilled") setRecentBlogs(recentRes.value.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="px-6 py-10 space-y-10">
      {/* ===== Hero Section ===== */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-2xl text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          GoToBlogs — Where All Blogs Matter ✍️
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore stories, insights, and experiences from creators across the globe.
          Whether you love tech, travel, or lifestyle — you’ll find your voice here.
        </p>
      </section>

      {/* ===== Trending Blogs ===== */}
      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
          🔥 Trending Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {trendingBlogs.length ? (
            trendingBlogs.map((blog) => (
              <Link
                to={`/post/${blog._id}`}
                key={blog._id}
                className="p-5 border rounded-xl shadow hover:shadow-md transition duration-200 bg-white"
              >
                <h3 className="font-semibold text-lg">{blog.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
                <p className="mt-3 text-sm text-gray-500">
                  By {blog.author?.username || "Unknown"}
                </p>
              </Link>
            ))
          ) : (
            <p>No trending blogs yet.</p>
          )}
        </div>
      </section>

      {/* ===== Top Rated Blogs ===== */}
      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3">
          ⭐ Highest Rated Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topRatedBlogs.length ? (
            topRatedBlogs.map((blog) => (
              <Link
                to={`/post/${blog._id}`}
                key={blog._id}
                className="p-5 border rounded-xl shadow hover:shadow-md transition duration-200 bg-white"
              >
                <h3 className="font-semibold text-lg">{blog.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
                <p className="mt-3 text-sm text-gray-500">
                  Rating: {blog.averageRating?.toFixed(1) || "N/A"} ⭐
                </p>
              </Link>
            ))
          ) : (
            <p>No top-rated blogs yet.</p>
          )}
        </div>
      </section>

      {/* ===== Recently Published ===== */}
      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-green-500 pl-3">
          🆕 Recently Published
        </h2>
        {recentBlogs.length === 0 ? (
          <p className="text-gray-500 text-center">
            No posts yet. Be the first to create one!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.slice(0, 6).map((post) => (
              <Link
                key={post._id}
                to={`/post/${post._id}`}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-indigo-600 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">
                  {post.content.length > 100
                    ? post.content.slice(0, 100) + "..."
                    : post.content}
                </p>
                <p className="text-sm text-gray-500">
                  By {post.author?.username || "Unknown"} on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ===== Call to Action ===== */}
      <section className="text-center py-16 bg-indigo-50 rounded-2xl mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Want to share your story with the world?
        </h2>
        <p className="text-gray-700 mb-6">
          Join GoToBlogs and start creating your own blogs today!
        </p>
        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
        >
          ✏️ Create Your First Blog
        </Link>
      </section>
    </div>
  );
}
