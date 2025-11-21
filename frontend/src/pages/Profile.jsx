import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await API.get("/posts/mine");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {posts.length ? (
        posts.map((post) => (
          <div key={post._id} className="border p-4 mb-3 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>You haven’t written any posts yet.</p>
      )}
    </div>
  );
}
