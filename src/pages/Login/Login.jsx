import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const { dispatch1 } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // console.log(user);
        dispatch1({ type: "LOGIN", payload: user });
        setError(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <input
          type="text"
          placeholder="Gmail..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
        {error && <span>Type again !!!</span>}
      </form>
    </div>
  );
};

export default Login;
