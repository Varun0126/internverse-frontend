import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        InternVerse Platform
      </h1>

      <div className="space-x-4">

        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="bg-green-600 text-white px-6 py-3 rounded">
            Register
          </button>
        </Link>

      </div>

    </div>

  );
}

export default Home;