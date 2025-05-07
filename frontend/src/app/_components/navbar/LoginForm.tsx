import { auth, signIn, signOut } from "@/auth";

const LoginForm = async () => {
  const session = await auth();

  const handleLogin = async () => {
    "use server";
    await signIn("google");
  };

  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <div>
      {session?.user ? (
        <>
          <p>Signed in as {session.user.name}</p>
          <form action={handleLogout}>
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <form action={handleLogin}>
          <button type="submit">Sign In with Google</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
