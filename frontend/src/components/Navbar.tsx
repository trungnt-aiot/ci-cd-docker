'use client';

import Image from "next/image";
import NavbarItem from "./ui/NavbarItem";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="flex justify-between pt-2 pb-2 fixed top-0 left-0 right-0 shadow-lg z-10 bg-white">
            <ul className="ml-12 flex items-center gap-8 font-bold">
                <li>
                    <Image className="rounded-full" width={50} height={50} alt="home" src="/image.png" />
                </li>
                <NavbarItem text="HOME" href="/" isActive={pathname === "/"} />
                <NavbarItem text="NOTES" href="/notes" isActive={pathname === "/notes"} />
                <NavbarItem text="REDIS" href="/redis-admin" isActive={pathname === "/redis-admin"} />
            </ul>
            <ul className="mr-12 flex items-center gap-8 font-bold">
                <NavbarItem text="LOGIN" href="/login" isActive={pathname === "/login"} />
                <NavbarItem text="REGISTER" href="/register" isActive={pathname === "/register"} />
            </ul>
        </nav>
    );
}
