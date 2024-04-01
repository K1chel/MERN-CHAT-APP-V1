import { Navigate, Outlet } from "react-router";

type Props = {
  token: string | null;
};

export const PublicLayout = ({ token }: Props) => {
  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <div className="relative w-full max-h-screen h-screen flex items-center justify-center px-4 md:px-8 xl:px-12">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <main className="max-w-2xl mx-auto w-full border-2 py-12 rounded px-10 bg-background/80 z-50">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
