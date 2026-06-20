import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check session on app load
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://luvo-backend.vercel.app/auth/status", {
          credentials: "include", // REQUIRED for sessions
        });
        if (res.ok) {
          const json = await res.json();
          console.log("Auth: initial status ->", json);
          // backend returns { isLoggedIn }
          setIsLoggedIn(!!json.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Login = async (email, password) => {
    const res = await fetch("https://luvo-backend.vercel.app/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
    const errorData = await res.json();
    // Throw an object with a 'response' property to match the catch block in Login.jsx
    throw { response: { data: errorData } };
  }


    // Confirm session with backend
    // Optimistically update UI so components reflect login immediately
    setIsLoggedIn(true);
    fetch("https://luvo-backend.vercel.app/auth/status", { credentials: "include" })
      .then(r => r.json())
      .then(console.log)
      .catch(console.error);
  };

  const Logout = async () => {
    await fetch("https://luvo-backend.vercel.app/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log("Auth: logged out");
    setIsLoggedIn(false);
  };

  const SignUp = async (
    username,
    email,
    password,
    confirmPassword,
    terms
  ) => {
    const response = await fetch("https://luvo-backend.vercel.app/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
        terms,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, Login, Logout, SignUp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
