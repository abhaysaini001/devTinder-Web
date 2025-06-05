import axios from "axios";
import { BASE_URL } from "../utilis/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utilis/feedSlice";
import Error from "./Error";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
       await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(err.message && "something went wrong");
    }
  };

  if (error) <Error message={error} />;
  return (
    <div className="card bg-base-300 w-96 shadow-xl  ">
      <figure>
        <img className="my-6" src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored",_id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested",_id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
