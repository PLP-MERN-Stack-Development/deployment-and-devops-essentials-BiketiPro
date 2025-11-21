import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AuthorProfile() {
  const { authorId } = useParams();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/author/${authorId}`);
        const data = await res.json();
        setPosts(data);
        if (data.length > 0) setAuthor(data[0].author.username);
      } catch (error) {
        console.error("Error fetching author posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorPosts();
  }, [authorId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Posts by {author || "Unknown Author"}
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">This author hasn’t written any posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + "..."
                  : post.content}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
