import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";
import { useConversationStore } from "@/store/useConversationStore";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { selectedConversation } = useConversationStore();
  const isMobile = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  useEffect(() => {
    setIsOpen(false);
  }, [selectedConversation]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
