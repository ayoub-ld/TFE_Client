import Image from "next/image";
import { signIn } from "../../next-auth/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="flex justify-center flex-row gap-2"
    >
      <button
        type="submit"
        className="flex gap-5 border-2 border-violet-400 rounded-full p-2 px-5 hover:bg-violet-400 hover:text-black cursor-pointer"
      >
        <Image src="/Google.webp" alt="Google logo" width={36} height={36} />
        Sign in with Google
      </button>
    </form>
  );
}
