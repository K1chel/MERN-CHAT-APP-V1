import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { ShowPassword } from "@/components/auth/ShowPassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginValidation } from "@/lib/validation";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setToken } = useContext(AuthContext);

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginValidation>) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-5">
      <AuthHeader
        title="Welcome back!"
        description="We're so excited to see you again!"
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={isLoading}
                    />
                    <div className="showPassword">
                      <ShowPassword
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full"
          >
            Login
          </Button>
        </Form>
      </form>
      <AuthFooter
        title="Don't have an account?"
        description="Creat one now!"
        href="/register"
      />
    </div>
  );
};
