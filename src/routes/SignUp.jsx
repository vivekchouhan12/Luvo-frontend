import { AuthContext } from "../Auth.jsx";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { SignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    setFormError(""); 
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
     const terms = form.terms.checked;  
    try {
      setSubmitting(true);
      await SignUp(username, email, password, confirmPassword, terms);
      alert("Signup successful! Please log in.");
      form.reset();
      navigate("/login");

    } catch (err) {
      // backend may return an object with `errors` array or a message string
      if (err && err.errors && Array.isArray(err.errors)) {
        setErrors(err.errors);
      } else {
        const errorMsg = (err && err.message) || (typeof err === "string" ? err : "Signup failed");
        setFormError(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-white via-neutral-50 to-rose-50 px-4 pt-16">
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-xl p-8">
          
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Minimal. Elegant. Effortless.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="yourname"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5
                         text-neutral-900 placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-rose-300
                         focus:border-rose-400 transition"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
             Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5
                         text-neutral-900 placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-rose-300
                         focus:border-rose-400 transition"
            />
          </div>

         {/* Terms & Conditions */}
<div className="flex items-start gap-3">
  <input
    type="checkbox"
    name="terms"
    required
    className="mt-1 h-4 w-4 rounded border-neutral-300
               text-rose-500 focus:ring-rose-300"
  />

  <p className="text-sm text-neutral-600 leading-snug">
    I agree to the{" "}
    <a
      href="/terms"
      className="text-rose-500 hover:text-rose-600 underline underline-offset-2"
    >
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a
      href="/privacy"
      className="text-rose-500 hover:text-rose-600 underline underline-offset-2"
    >
      Privacy Policy
    </a>
  </p>
</div>

{/* Display Form Error */}
{errors.length > 0 && (
  <ul className="rounded-lg bg-red-50 border border-red-200 p-3 space-y-1 text-sm text-red-700">
    {errors.map((err, idx) => (
      <li key={idx}>• {err.msg}</li>
    ))}
  </ul>
)}

{formError && (
  <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
    {formError}
  </div>
)}

          {/* Button */}
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className={`w-full mt-6 rounded-lg text-white font-medium py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all ${submitting ? "bg-rose-300 cursor-not-allowed" : "bg-gradient-to-r from-rose-400 to-fuchsia-400 hover:from-rose-500 hover:to-fuchsia-500"}`}
          >
            {submitting ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-neutral-400 text-center mt-6">
          By signing up, you agree to our terms & privacy policy
        </p>
      </div>
    </div>
  );
};

export default SignUp;
