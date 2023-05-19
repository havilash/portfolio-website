import React from "react";
import Users from "src/components/Users/Users";
import "./Admin.css";
import { useRedirectToLogin } from "src/hooks/useSession";
import Keys from "src/components/Keys/Keys";
import Files from "src/components/Files/Files";

export default function Admin({ session }) {
  useRedirectToLogin(session, 2);

  return (
    <section
      className="section min-h-screen flex flex-col justify-center items-center 
      gap-20 pt-28 w-full lg:w-[90%] xl:w-[80%]"
    >
      {/* keys */}
      <div className="key w-full">
        <h1 className="mb-4">Keys</h1>
        <Keys session={session} />
      </div>
      {/* users */}
      <div className="users w-full">
        <h1 className="mb-4">Users</h1>
        <Users session={session} />
      </div>
      <div className="data w-full">
        <h1 className="mb-4">Data</h1>
        <Files session={session} />
      </div>
    </section>
  );
}
