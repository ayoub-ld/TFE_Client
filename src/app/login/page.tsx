import SignIn from "@/components/sign-in/sign-in";

export default function LoginPage() {
  return (
    <div className=" flex pt-5 flex-col items-center justify-center gap-6 text-2xl bg-gray-700 text-white">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h1 className="flex justify-baseline pb-50 font-medium text-3xl w-160">
          Login to start communicating with the World !
        </h1>
        <SignIn />
      </div>
    </div>
  );
}
