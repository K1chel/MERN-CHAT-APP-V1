import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};

export const ShowPassword = ({
  showPassword,
  setShowPassword,
  disabled,
}: Props) => {
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-l-none h-full"
      onClick={toggleShowPassword}
      type="button"
      disabled={disabled}
    >
      {showPassword ? (
        <Eye className="w-5 h-5" />
      ) : (
        <EyeOffIcon className="w-5 h-5" />
      )}
    </Button>
  );
};
