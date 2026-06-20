import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Auth.jsx";

const Login = () => {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setSubmitting(true);
      // Use AuthContext.Login which handles the request
      await Login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Invalid email or password");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (  
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-white via-neutral-50 to-rose-50 px-4 pt-30">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Log in to continue your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5
                         text-neutral-900 placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-rose-300
                         focus:border-rose-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5
                         text-neutral-900 placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-rose-300
                         focus:border-rose-400 transition"
            />
          </div>

          {errorMessage && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className={`w-full rounded-lg text-white font-semibold py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${submitting ? "bg-rose-400 cursor-not-allowed" : "bg-rose-500 hover:bg-rose-600 focus:ring-rose-500"}`}
          >
            {submitting ? "Signing in…" : "Log In"}
          </button>

          <div className="text-center text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-rose-500 hover:text-rose-600">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
