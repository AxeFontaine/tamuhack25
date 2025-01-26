import { Firestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getDoc } from "firebase/firestore";

//Users are stored in a collection called 'users' , each user is represented by uid created by google sign in
interface Account {
    curr_activity: number,
    displayname: string,
    levelTag: string,
    points: number
}



export async function createUser(uid: string, data: Account) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data);
}


const getUserFromUID = async (uid: string) => {

    const userRef = doc(db, "users", uid);
    const user = await getDoc(userRef);
    
    if(user.exists()){
        return user.data() as Account;
    }
    else{
        console.error("User does not exist");
        return null;
    }
};

export default getUserFromUID;
export type { Account};
