import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "sonner";

export const useLogout = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!data || data.error) {
        return toast.error("Something went wrong");
      }

      setToken("");
      setUser(null);
      localStorage.removeItem("token");
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
};
