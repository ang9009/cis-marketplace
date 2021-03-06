import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User as AuthUser } from "firebase/auth";
import { doc, getDoc, getFirestore, DocumentSnapshot, DocumentData } from "firebase/firestore";

import User from "../types/user.interface";

export default function useGetCurrUser() {
  const db = getFirestore();
  const auth = getAuth();
  const [userDocSnap, setUserDocSnap] = useState<DocumentSnapshot<DocumentData>>(null);
  const [authUser, setAuthUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Retrieves the current user's user object from Firebase based on their authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setAuthUser(user);
        setUserDocSnap(docSnap);
        setIsLoading(false);
      } else {
        console.log("Not logged in");
        setIsLoading(false);
        setUserDocSnap(null);
        setAuthUser(null);
        return;
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { authUser, userData: userDocSnap?.data() as User, isLoading };
}
