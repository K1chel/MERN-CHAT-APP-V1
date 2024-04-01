import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

export const HomePage = () => {
  return (
    <div className="flex w-full h-full">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col max-w-[240px] w-full border-r h-full">
        <Sidebar />
      </div>
      {/* MAIN CHAT */}
      <div className="flex flex-1">
        <Chat />
      </div>
    </div>
  );
};
