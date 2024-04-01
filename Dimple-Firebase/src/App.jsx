import "./App.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "./firebase/firebase.config";
import { useState } from "react";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <h1>Firebase + React</h1>

      {currentUser ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>{currentUser.displayName}</h2>
          <p>{currentUser.email}</p>
          <img src={currentUser.photoURL} alt="" />
        </div>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google SignIn</button>
        </div>
      )}
    </>
  );
}

export default App;
