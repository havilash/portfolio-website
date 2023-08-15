import { useLocation } from "react-router-dom";

export default function Error404() {
  const location = useLocation();

  return (
    <section className="section p-0 m-0 h-screen w-full flex flex-col justify-center">
      <h1 className="text-center text-9xl text-red-500">404</h1>
      <h1 className="text-center text-text-color mix-blend-difference transform-gpu">
        Page not found
      </h1>
      <p className="text-center text-lg mt-8">
        The requested URL "{location.pathname}" was not found on this server.
      </p>
    </section>
  );
}
