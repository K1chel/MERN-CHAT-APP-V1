import { Navigate, Outlet } from "react-router";

type Props = {
  token: string | null;
};

export const PrivateLayout = ({ token }: Props) => {
  return (
    <>
      {token ? (
        <div className="fixed inset-0 h-screen w-full flex items-center justify-center">
          <main className="w-full h-full lg:max-w-[960px] lg:h-[85%] mx-auto border lg:rounded-md">
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
