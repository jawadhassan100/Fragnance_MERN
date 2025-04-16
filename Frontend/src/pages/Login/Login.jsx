import { useState , useContext  } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../AuthContext";
import config from '../../config/config';

const BASE_URL = config.BASE_URL;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(AuthContext); 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);

      const { token } = response.data;
      localStorage.setItem("token", token);

      const { isAdmin } = response.data.user;
      localStorage.setItem("isAdmin", isAdmin);
      

      // Update the isAdmin state in the context
      setIsAdmin(response.data.user);

      if (response.status === 200) {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center pt-32 justify-center h-screen bg-gray-100">
      <div
        className="bg-white p-8 -mt-10 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;