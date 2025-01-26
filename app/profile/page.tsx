'use client';

import { useEffect,useState } from "react";
import getUserFromUID from "../_config/firebaseUtils";
import { Account } from "../_config/firebaseUtils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../_config/firebaseConfig";
import { User } from "firebase/auth";
import NavigationBar from "../_components/NavigationBar";

const Profile = () => {
  //pull user data from firebase
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [acct, setAcct] = useState<Account | null>(null);


  //check login status 
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
              setUser(user);
              const fetchData = async () => {
                  console.log("Attempting to fetch data");
                  if (user) {
                      const account = await getUserFromUID(user.uid);
                      setAcct(account);
                      setLoading(false);
                      console.log("Data fetched");
                  }
              }
              fetchData();
          } else {
              setUser(null);
          }
      });

      return () => unsubscribe();
  }, []);

  return (
    <div>
      <NavigationBar />
      Profile
    </div>
  );
};

export default Profile;