"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
  Bars3Icon,
  BugAntIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ListBulletIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  DappConsoleButton,
  FaucetButton,
  RainbowKitCustomConnectButton,
  SuperchainFaucetButton,
} from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { cn } from "~~/utils/cn";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

// Main navigation links (for desktop)
export const mainMenuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

// Apps dropdown links
export const appsMenuLinks: HeaderMenuLink[] = [
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
  },
  {
    label: "Oracle",
    href: "/oracle",
    icon: <CurrencyDollarIcon className="h-4 w-4" />,
  },
  {
    label: "Gasless",
    href: "/gasless",
    icon: <SparklesIcon className="h-4 w-4" />,
  },
  {
    label: "Events",
    href: "/events",
    icon: <ListBulletIcon className="h-4 w-4" />,
  },
];

// All links combined (for mobile)
export const allMenuLinks: HeaderMenuLink[] = [...mainMenuLinks, ...appsMenuLinks];

// Apps Dropdown Component for Desktop
const AppsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideClick(
    dropdownRef,
    useCallback(() => setIsOpen(false), []),
  );

  const isAnyAppActive = appsMenuLinks.some(link => pathname === link.href);

  return (
    <div className="dropdown dropdown-bottom" ref={dropdownRef}>
      <label
        tabIndex={0}
        className={cn(
          "btn btn-ghost normal-case flex items-center gap-2 px-4 py-2 h-auto min-h-0 text-sm rounded-md transition-colors duration-200 hover:bg-base-200",
          isAnyAppActive ? "bg-base-100 primary-content" : "text-slate-400",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <RectangleStackIcon className="h-4 w-4" />
        <span>Apps</span>
        <ChevronDownIcon className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")} />
      </label>
      {isOpen && (
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-2 p-2 shadow-lg bg-base-100 rounded-box w-52 z-[100] border border-base-300"
          onClick={() => setIsOpen(false)}
        >
          {appsMenuLinks.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-base-200 rounded-lg",
                    isActive ? "bg-base-200 primary-content font-medium" : "text-slate-400",
                  )}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// Desktop Menu Links
export const DesktopMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {mainMenuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 h-auto min-h-0 text-sm transition-colors duration-200 hover:bg-base-200 rounded-lg",
                isActive ? "bg-base-100 primary-content" : "text-slate-400",
              )}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
      <li className="flex items-center">
        <AppsDropdown />
      </li>
    </>
  );
};

// Mobile Menu Links (includes all links)
export const MobileMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {allMenuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200",
                isActive ? "bg-base-100 primary-content" : "text-slate-400",
              )}
            >
              {icon}
              {label}
            </Link>
          </li>
        );
      })}
      <li className="border-t border-base-300 mt-2 pt-2">
        <div className="px-2 py-2 flex flex-col gap-2">
          <SuperchainFaucetButton />
          <DappConsoleButton />
        </div>
      </li>
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="sticky lg:static top-0 navbar bg-base-900 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2 border-b border-[#252442]">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <MobileMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative">
            <Logo size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-Lisk</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <DesktopMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
        <div className="hidden lg:flex gap-2">
          <SuperchainFaucetButton />
          <DappConsoleButton />
        </div>
      </div>
    </header>
  );
};
