import { IUser } from "@/types";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define the shape of the context
interface AuthContextProps {
  user: IUser | null;
  token: string;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: "",
  setUser: () => {},
  setToken: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  ) as React.ComponentState &
    React.Dispatch<React.SetStateAction<string | null>>;

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/current-user");
        const data = await res.json();
        if (!data || data.error) {
          toast.error("An error occurred. Please try again.");
        }

        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
