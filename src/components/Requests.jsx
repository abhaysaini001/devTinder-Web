import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utilis/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utilis/requestSlice";
import Error from "./Error";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState();
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      setError(err.message && "Something Went Wrong");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (error) return <Error message={error}/>
  if (!requests) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
        <p className="text-primary text-lg font-medium">
          Fetching your connections...
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Requests"
          className="w-24 h-24 mb-6 opacity-80 animate-pulse"
        />
        <h2 className="text-2xl font-bold text-gray-700">No Requests Found</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          You have no connection requests at the moment. Check back later or
          start reaching out!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl mb-8 text-primary">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row items-center gap-4 bg-base-100 shadow-md rounded-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 mx-auto mb-6 border border-base-300"
          >
            {/* Profile Image */}
            <img
              alt="User"
              src={photoUrl}
              className="w-24 h-24 rounded-full object-cover ring-2 ring-primary"
            />

            {/* User Info */}
            <div className="flex-1 text-left space-y-1 break-words">
              <h2 className="font-semibold text-2xl">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-base text-gray-600">
                  {age} • {gender}
                </p>
              )}
              <p className="text-sm text-gray-500">{about}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row md:flex-col gap-2">
              <button
                className="btn btn-outline btn-error w-24"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary w-24"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
