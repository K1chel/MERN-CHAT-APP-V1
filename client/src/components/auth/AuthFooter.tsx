import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  href: string;
};

export const AuthFooter = ({ description, href, title }: Props) => {
  return (
    <div className="flex gap-x-2 w-full items-center justify-center md:justify-start group text-muted-foreground hover:text-primary cursor-default transition">
      <span className="text-sm md:text-base">{title}</span>
      <Link to={href}>
        <span className="text-sm md:text-base hover:underline cursor-pointer">
          {description}
        </span>
      </Link>
    </div>
  );
};
