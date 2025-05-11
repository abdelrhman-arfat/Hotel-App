import { BACKEND_URL } from "@/app/constants/ENV";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const GoogleForm = async () => {
  return (
    <Link
      href={`${BACKEND_URL}/auth/google`}
      className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-md bg-neutral-50 border border-neutral-200 py-2 px-4 text-sm font-medium hover:bg-neutral-200 transition-colors"
    >
      <FcGoogle size={20} />
      Continue with Google
    </Link>
  );
};

export default GoogleForm;
