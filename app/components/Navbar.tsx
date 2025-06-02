"use client";

import type { ReactElement } from "react";
import { MdHome, MdLeaderboard, MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Navbar() {
  interface NavItem {
    label: string;
    link: string;
    icon: ReactElement;
  }

  const navItems: NavItem[] = [
    {
      label: "Home", 
      link: "/home", 
      icon: <MdHome />
    },
    {
      label: "Leaderboard", 
      link: "/home/leaderboard", 
      icon: <MdLeaderboard />
    },
    {
      label: "Account",
      link: "/home/account",
      icon: <MdPerson />
    }
  ];

  const pathName = usePathname();
  console.log(pathName);

  return (
    <nav className="w-full bg-background-2 font-bold sticky top-0 z-50 shadow-md">
      <ul className="flex items-center justify-center h-full">
        {navItems.map(item => (
          <li key={item.label}>
            <a 
              className={`
                flex flex-col items-center p-2
                ${pathName === item.link ? "bg-accent" : ""}
              `} 
              href={item.link}
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xs">{item.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}