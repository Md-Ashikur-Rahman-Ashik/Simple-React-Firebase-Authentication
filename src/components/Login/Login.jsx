import {
  GithubAuthProvider,
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
  // console.log(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
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
        <div>
          <button onClick={handleGoogleSignIn}>Google SingIn</button>
          <button onClick={handleGithubSignIn}>Github SignIn</button>
        </div>
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
