import Image from "next/image";
import NavLink from "../nav-link/nav-link";

export default function Header() {
  return (
    <header className="flex flex-row h-30 p-2.5 border-b-1">
      <Image
        className="object-cover w-auto"
        src="/logo.png"
        alt="website logo"
        width={150}
        height={100}
      />
      <NavLink />
    </header>
  );
}
