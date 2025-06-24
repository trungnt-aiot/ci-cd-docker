import Link from "next/link";

type NavbarItemProps = {
    text: string;
    href: string;
    isActive: boolean
};

export default function NavbarItem({ text, href = "/", isActive }: NavbarItemProps) {
    return (
        <Link href={href}>
            <li className="relative group cursor-pointer px-4 py-2 text-black">
                {text}
                <span className={`absolute ${isActive ? "w-full left-0" : "w-0 left-1/2"} bottom-0 h-[2px] bg-amber-950 transition-all duration-300 group-hover:left-0 group-hover:w-full`} />
            </li>
        </Link>
    );
}
