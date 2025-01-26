import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }
  
  export async function signOut() {
    try {
      return auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  }
