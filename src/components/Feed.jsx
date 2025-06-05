import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utilis/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utilis/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(err.message && "Failed to load feed");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
        <p className="text-primary text-lg font-medium">
          Fetching your Feed...
        </p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  if (feed.length === 0)
    return (
      <div className="flex flex-col items-center justify-center my-20 gap-4 text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486761.png"
          alt="No feed"
          className="w-32 h-32 opacity-70"
        />
        <h1 className="text-2xl font-semibold">No Feed Found</h1>
        <p className="text-sm">Looks like your feed is empty right now.</p>
        <button
          className="btn btn-outline btn-primary mt-4"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
