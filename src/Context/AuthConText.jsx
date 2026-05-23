import {getMyProfile} from "@/Services/PostService";
import {createContext, useEffect, useState} from "react";

export const AuthConText = createContext();
export default function AuthConTextProvider({children}) {
  const [isLogged_in, setIsLogged_in] = useState(
    localStorage.getItem("token") !== null,
  );
  const [userData, setUserData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0)
  async function getUserData() {
    const response = await getMyProfile();
    if (response?.success) {
      setUserData(response?.data?.user);
    }
  }
  useEffect(() => {
    if (isLogged_in) {
      getUserData();
    }
  }, [isLogged_in]);
  return (
    <AuthConText.Provider
      value={{isLogged_in, setIsLogged_in, userData, setUserData, unreadCount, setUnreadCount}}
    >
      {children}
    </AuthConText.Provider>
  );
}
