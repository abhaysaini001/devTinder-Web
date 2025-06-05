// components/ErrorMessage.jsx
const Error = ({ message = "Something went wrong!" }) => {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2 text-center">
        <h2 className="text-xl font-semibold">Oops!</h2>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
};

export default Error;
