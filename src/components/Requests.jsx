import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utilis/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utilis/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState();

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

  if (error) return <h1 className="text-red-500">{error}</h1>;
  if (!requests) return <h1>Loading..</h1>;
  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
   <div className="text-center my-10">
  <h1 className="font-bold text-4xl mb-8 text-primary">Connection Requests</h1>

  {requests.map((request) => {
    const { _id, firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;
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
          {age && gender && <p className="text-base text-gray-600">{age} • {gender}</p>}
          <p className="text-sm text-gray-500">{about}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row md:flex-col gap-2">
          <button className="btn btn-outline btn-error w-24">Reject</button>
          <button className="btn btn-primary w-24">Accept</button>
        </div>
      </div>
    );
  })}
</div>
  );
};

export default Requests;
