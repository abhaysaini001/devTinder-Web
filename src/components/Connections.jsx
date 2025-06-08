import axios from "axios";
import { BASE_URL } from "../utilis/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utilis/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch connections.");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (error) return <h1 className="text-red-500">{error}</h1>;
  if (!connections) {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-3">
      <div className="animate-spin  h-12 w-12 border-b-4 border-primary"></div>
      <p className="text-primary text-lg font-medium">Fetching your connections...</p>
    </div>
  );
}


 if (connections.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
        alt="No Connections"
        className="w-28 h-28 mb-6 animate-bounce opacity-80"
      />
      <h2 className="text-2xl font-bold text-gray-700">You're not connected with anyone yet</h2>
      <p className="text-gray-500 mt-2 mb-6 max-w-md">
        Your connection list is empty. Start building your network and meet amazing developers!
      </p>
      <button className="btn btn-primary btn-wide shadow-md hover:scale-105 transition-transform duration-200">
        Find People to Connect
      </button>
    </div>
  );
}


  return (
    <div className="my-6">
      {connections.map((user) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

        return (
          <div
            key={_id}
            className="flex items-center gap-4 p-6 my-4 bg-base-100 w-11/12 md:w-2/3 lg:w-1/2 mx-auto rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              alt="User"
              src={photoUrl}
              className="w-20 h-20 rounded-full  "
            />

            <div className="flex-1 text-left break-words">
              <h2 className="text-xl font-semibold text-primary">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-500">{age} • {gender}</p>
              )}
              <p className="mt-1 text-gray-700 text-sm">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
