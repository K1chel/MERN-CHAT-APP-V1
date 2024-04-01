import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";

export const ToastProvider = () => {
  const { theme } = useTheme();

  return <Toaster richColors theme={theme} />;
};
