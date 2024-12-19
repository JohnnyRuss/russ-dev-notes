import { useState } from "react";
import { Link } from "react-router-dom";

import { logger } from "@/utils";
import { PATHS } from "@/config/paths";
import { useSignInQuery } from "@/hooks/api";

import { Spinner } from "@/components/Layouts";
import { TextField, TextFieldPassword } from "@/components/Layouts/Form";

const Auth: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn, loading, errorMessage } = useSignInQuery();

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!username || !password) return;

      await signIn({ username, password });

      setPassword("");
      setUsername("");
    } catch (error) {
      logger(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[100svh]">
      <form onSubmit={onSignIn} className="flex flex-col gap-6 w-[300px]">
        <TextField
          id="username"
          label="username"
          value={username}
          onChange={(e) => setUsername(() => e.target.value)}
          placeholder="username"
        />

        <TextFieldPassword
          id="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          placeholder="password"
        />

        {errorMessage && (
          <p className="text-center text-app-red-primary">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="bg-app-dark-primary text-white py-3 px-6 w-full rounded-md font-semibold text-xl"
        >
          Login
        </button>

        <Link
          className="w-full text-center text-blue-600 underline"
          to={PATHS.selection_page}
        >
          Home
        </Link>
      </form>

      {loading && <Spinner />}
    </div>
  );
};

export default Auth;
