import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";

const GoogleForm = async () => {
  const handleLogin = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <form action={handleLogin}>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-md bg-neutral-50 border border-neutral-200 py-2 px-4 text-sm font-medium hover:bg-neutral-200 transition-colors"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>
    </form>
  );
};

export default GoogleForm;
