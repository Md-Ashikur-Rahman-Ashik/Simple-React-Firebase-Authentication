import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth(app);
  console.log(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setCurrentUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {currentUser ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google Login</button>
      )}

      {currentUser && (
        <div>
          <h3>User: {currentUser.displayName}</h3>
          <p>Email: {currentUser.email}</p>
          <img src={currentUser.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
