import Link from "next/link";
import {
  HomeIcon,
  FireIcon,
  DocumentMagnifyingGlassIcon as MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

type LinkData = {
  name: string;
  route: `/${string}`;
  Icon: React.ElementType;
};

const links: LinkData[] = [
  { name: "Accueil", route: "/", Icon: HomeIcon },
  { name: "Tendances", route: "/tendance", Icon: FireIcon },
  { name: "Recherche", route: "/recherche", Icon: MagnifyingGlassIcon },
];

type NavLinkItemProps = LinkData & {};
function NavLinkItem({ name, route, Icon }: NavLinkItemProps) {
  return (
    <li className="flex flex-row h-20 w-25 items-center justify-center box-border mr-14">
      <Link href={route} aria-label={name}>
        <Icon className="h-14 w-12 text-white" />
      </Link>
    </li>
  );
}

export default function NavLink() {
  return (
    <ul className="flex flex-row items-center justify-center m-auto gap-18 box-border">
      {links.map((link) => (
        <NavLinkItem key={link.route} {...link} />
      ))}
    </ul>
  );
}
