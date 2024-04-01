import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  username: string | undefined;
  onClick?: () => void;
  className?: string;
};

export const UserAvatar = ({ src, username, onClick, className }: Props) => {
  return (
    <Avatar onClick={onClick} className={cn("border", className)}>
      <AvatarImage src={src} alt={username} className="object-cover" />
      <AvatarFallback className="uppercase">
        {username?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
