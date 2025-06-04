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
  if (!connections) return <h1>Loading..</h1>;
  if (connections.length === 0) return <h1>No Connections Please Make</h1>;

  return (
    <div className=" text-center my-10 ">
      <h1 className="font-bold text-4xl ">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 items-center rounded-lg"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <h4>{age + " " + gender}</h4>}
              <p>{about}</p>
            </div>
           
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
