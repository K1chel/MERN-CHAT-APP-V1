import { Button } from "@/components/ui/button";
import { useGetSidebarUsers } from "@/hooks/useGetSidebarUsers";
import { useLogout } from "@/hooks/useLogout";
import { LogOut, Search, X } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";
import { SidebarUser } from "./SidebarUser";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

export const Sidebar = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { handleLogout, isLoading } = useLogout();
  const { users, isLoading: isLoadingUsers } = useGetSidebarUsers();

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (isLoadingUsers) {
    return (
      <div className="flex flex-col gap-y-4 px-4 py-3">
        <Skeleton className="w-full h-10" />
        <SidebarUser.Skeleton />
        <SidebarUser.Skeleton />
        <SidebarUser.Skeleton />
        <SidebarUser.Skeleton />
      </div>
    );
  }

  if (!isLoadingUsers && !users) return null;

  return (
    <div className="flex flex-col space-y-5 px-3 py-2 w-full h-full overflow-x-hidden">
      {/* SEARCH BAR */}
      <div className="relative">
        <Input
          placeholder="Search users..."
          className="pr-10 h-12 lg:h-10"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="absolute right-0 w-10 top-0 flex items-center justify-center h-full cursor-pointer group">
          {searchInput ? (
            <X
              className="w-4 h-4 text-muted-foreground group-active:scale-75 transition"
              onClick={() => setSearchInput("")}
            />
          ) : (
            <Search className="w-4 h-4 text-muted-foreground group-active:scale-75 transition" />
          )}
        </div>
      </div>
      {/* USERS */}
      <div className="flex flex-1 w-full overflow-scroll overflow-x-hidden overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-y-1.5 w-full">
          {!isLoadingUsers &&
            searchInput === "" &&
            users?.map((user) => <SidebarUser key={user._id} user={user} />)}
          {!isLoadingUsers &&
            searchInput !== "" &&
            (filteredUsers || []).length > 0 &&
            filteredUsers?.map((user) => (
              <SidebarUser key={user._id} user={user} />
            ))}
          {!isLoadingUsers &&
            searchInput !== "" &&
            filteredUsers?.length === 0 && (
              <div className="mt-5 flex items-center justify-center">
                <p className="text-xl">No users found.</p>
              </div>
            )}
        </div>
      </div>
      {/* LOGOUT BUTTON */}
      <div className="flex flex-col gap-y-3">
        <SettingsModal />
        <Button
          variant="outline"
          className="justify-start flex items-center w-full gap-2"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};
