"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const [user, setUser] = useState<IUser>({
    email: data?.user?.email ?? undefined,
    fullName: data?.user?.name ?? undefined,
    image: data?.user?.image ?? undefined,
    id: data?.user?.id ?? undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data?.user) return;
    const userId = data.user.id;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/auth/current-user/${userId}`);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [data]);

  const contextValue: AuthContextType = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
