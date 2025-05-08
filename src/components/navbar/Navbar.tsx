"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import s from "./navbar.module.css";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Tiktok from "../icons/Tiktok";


const navlinks = [
  { name: "services", href: "/services" },
  { name: "projects", href: "/projects" },
  { name: "analytics", href: "/analytics" },
  { name: "blogs", href: "/blogs" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const t = useTranslations('Navbar');
  const pathName = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLanguageChange = (key: string) => {
    let newUrl = pathName;
    if(pathName.length <= 3) {
      newUrl = pathName.replace(/\/(az|en)/, `/${key}`);
    } else if (pathName.length > 3) {
      newUrl = pathName.replace(/\/(az|en)\//, `/${key}/`);
    }
    router.push(newUrl);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-99 px-[24px] pt-[16px] lg:px-[64px] lg:pt-[32px] ${
        hasScrolled ? "border-b border-gray-100" : ""
      }`}
      onClick={() => isOpen ? setIsOpen(false) : null}
    >
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div>
            <Link href="/">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={158}
                height={100}
                className="min-w-[158px]"
              />
            </Link>
          </div>

          <div className="flex items-center justify-end lg:justify-between gap-2 w-full p-0 lg:p-4 ml-6 bg-white lg:bg-gray-100 rounded-2xl">
            {/* Web View */}
            <div className="hidden lg:flex items-center">
              {navlinks.map((link) =>
                link.href !== "/contact" ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2"
                  >
                    {t(`${link.name}`)}
                  </Link>
                ) : null
              )}
            </div>

            {/* Responsive View */}
            <div className="flex items-center gap-2">
              <div className="hidden xl:flex items-center gap-4 mr-8">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/birainy_az/"
                >
                  <Instagram width="24" height="24" />
                </Link>
                <Divider orientation="vertical" className="h-[30px] bg-black" />
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/birainy/"
                >
                  <Linkedin width="24" height="24" />
                </Link>
                <Divider orientation="vertical" className="h-[30px] bg-black" />
                <Link
                  target="_blank"
                  href="https://www.tiktok.com/@birainy"
                >
                  <Tiktok width="24" height="24" />
                </Link>
              </div>

              <Button
                variant="solid"
                color="primary"
                className="hidden lg:block font-pp-neue text-md p-0"
              >
                <Link
                    href='/about'
                    className="block px-5 py-2"
                  >{t('contact')}</Link>
              </Button>

              <Dropdown className="min-w-[100px]">
                <DropdownTrigger>
                  <Button variant="solid" className="min-w-[40px] p-0 bg-gray-200">
                    <Image
                      src="/icons/globe.svg"
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Choose Language"
                  onAction={(key) => handleLanguageChange(key as string)}
                  className="min-w-[100px] text-center"
                >
                  <DropdownItem key="az" textValue="az">
                    <p className="inline-flex items-center gap-3">
                      <Image
                        src="/icons/az-flag.svg"
                        alt="az flag"
                        width={20}
                        height={20}
                      />{" "}
                      Az
                    </p>
                  </DropdownItem>
                  <DropdownItem key="en" textValue="en">
                    <p className="inline-flex items-center gap-3">
                      <Image
                        src="/icons/en-flag.svg"
                        alt="en flag"
                        width={20}
                        height={20}
                      />{" "}
                      En
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button
                variant="solid"
                color="primary"
                className="min-w-[50px] p-0 lg:hidden"
                onPress={toggleMenu}
              >
                <div
                  className={`${s.menu} ${isOpen ? s.opened : ""}`}
                  aria-label="Burger Menu"
                  aria-expanded={isOpen}
                >
                  <svg width="35" height="35" viewBox="0 0 100 100">
                    <path
                      className={`${s.line} ${s.line1}`}
                      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                    />
                    <path className={`${s.line} ${s.line2}`} d="M 20,50 H 80" />
                    <path
                      className={`${s.line} ${s.line3}`}
                      d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden h-[calc(100vh-80px)]">
          <div className="h-full px-2 pt-8 pb-3 flex flex-col justify-between gap-4">
            <div>
              {navlinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-2 py-1 text-2xl font-semibold"
                >
                  {t(`${link.name}`)}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-gray-700 text-xl font-pp-neue">
                {t('follow')}
              </p>
              <div className="flex items-center gap-4 mt-2 mb-8">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/birainy_az/"
                  className="p-3 border border-gray-200 rounded-sm"
                >
                  <Instagram color="silver" />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/birainy/"
                  className="p-3 border border-gray-200 rounded-sm"
                >
                  <Linkedin color="silver" />
                </Link>
              </div>
              <Link
                  target="_blank"
                  href="https://academy.birainy.com/"
                >
                <Image
                  src="/img/academy_banner.webp"
                  alt="Academy Banner"
                  width={500}
                  height={100}
                  className="w-full h-auto"
                />
              </Link>
              
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
