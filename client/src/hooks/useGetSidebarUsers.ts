import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useGetSidebarUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[] | null>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/sidebar-users");
        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
        }

        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, isLoading };
};
