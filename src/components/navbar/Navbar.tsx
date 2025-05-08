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
              />
            </Link>
          </div>

          <div className="flex items-center justify-end lg:justify-between gap-2 w-full p-4 ml-6 bg-white lg:bg-gray-100 rounded-2xl">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M6.50033 1.66699H13.5003C16.167 1.66699 18.3337 3.83366 18.3337 6.50033V13.5003C18.3337 14.7822 17.8244 16.0116 16.918 16.918C16.0116 17.8244 14.7822 18.3337 13.5003 18.3337H6.50033C3.83366 18.3337 1.66699 16.167 1.66699 13.5003V6.50033C1.66699 5.21845 2.17622 3.98907 3.08264 3.08264C3.98907 2.17622 5.21845 1.66699 6.50033 1.66699ZM6.33366 3.33366C5.53801 3.33366 4.77495 3.64973 4.21234 4.21234C3.64973 4.77495 3.33366 5.53801 3.33366 6.33366V13.667C3.33366 15.3253 4.67533 16.667 6.33366 16.667H13.667C14.4626 16.667 15.2257 16.3509 15.7883 15.7883C16.3509 15.2257 16.667 14.4626 16.667 13.667V6.33366C16.667 4.67533 15.3253 3.33366 13.667 3.33366H6.33366ZM14.3753 4.58366C14.6516 4.58366 14.9165 4.69341 15.1119 4.88876C15.3072 5.08411 15.417 5.34906 15.417 5.62533C15.417 5.90159 15.3072 6.16654 15.1119 6.3619C14.9165 6.55725 14.6516 6.66699 14.3753 6.66699C14.0991 6.66699 13.8341 6.55725 13.6388 6.3619C13.4434 6.16654 13.3337 5.90159 13.3337 5.62533C13.3337 5.34906 13.4434 5.08411 13.6388 4.88876C13.8341 4.69341 14.0991 4.58366 14.3753 4.58366ZM10.0003 5.83366C11.1054 5.83366 12.1652 6.27265 12.9466 7.05405C13.728 7.83545 14.167 8.89526 14.167 10.0003C14.167 11.1054 13.728 12.1652 12.9466 12.9466C12.1652 13.728 11.1054 14.167 10.0003 14.167C8.89526 14.167 7.83545 13.728 7.05405 12.9466C6.27265 12.1652 5.83366 11.1054 5.83366 10.0003C5.83366 8.89526 6.27265 7.83545 7.05405 7.05405C7.83545 6.27265 8.89526 5.83366 10.0003 5.83366ZM10.0003 7.50033C9.33728 7.50033 8.7014 7.76372 8.23256 8.23256C7.76372 8.7014 7.50033 9.33728 7.50033 10.0003C7.50033 10.6634 7.76372 11.2993 8.23256 11.7681C8.7014 12.2369 9.33728 12.5003 10.0003 12.5003C10.6634 12.5003 11.2993 12.2369 11.7681 11.7681C12.2369 11.2993 12.5003 10.6634 12.5003 10.0003C12.5003 9.33728 12.2369 8.7014 11.7681 8.23256C11.2993 7.76372 10.6634 7.50033 10.0003 7.50033Z" fill="#000"></path></svg>
                </Link>
                <Divider orientation="vertical" className="h-[30px] bg-black" />
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/birainy/"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M5.78329 4.16665C5.78306 4.60867 5.60726 5.03251 5.29454 5.34491C4.98182 5.65732 4.55781 5.8327 4.11578 5.83248C3.67376 5.83226 3.24992 5.65645 2.93752 5.34373C2.62511 5.03102 2.44973 4.60701 2.44995 4.16498C2.45017 3.72295 2.62598 3.29912 2.9387 2.98671C3.25141 2.67431 3.67542 2.49892 4.11745 2.49915C4.55948 2.49937 4.98331 2.67517 5.29572 2.98789C5.60812 3.30061 5.78351 3.72462 5.78329 4.16665ZM5.83329 7.06665H2.49995V17.5H5.83329V7.06665ZM11.1 7.06665H7.78329V17.5H11.0666V12.025C11.0666 8.97498 15.0416 8.69165 15.0416 12.025V17.5H18.3333V10.8916C18.3333 5.74998 12.45 5.94165 11.0666 8.46665L11.1 7.06665Z" fill="#000"></path></svg>
                </Link>
                <Divider orientation="vertical" className="h-[30px] bg-black" />
                <Link
                  target="_blank"
                  href="https://www.tiktok.com/@birainy"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.8414 3.82C16.1578 3.03962 15.7811 2.03743 15.7814 1H12.6914V13.4C12.6675 14.071 12.3842 14.7066 11.9011 15.1729C11.418 15.6393 10.7728 15.8999 10.1014 15.9C8.68137 15.9 7.50137 14.74 7.50137 13.3C7.50137 11.58 9.16137 10.29 10.8714 10.82V7.66C7.42137 7.2 4.40137 9.88 4.40137 13.3C4.40137 16.63 7.16137 19 10.0914 19C13.2314 19 15.7814 16.45 15.7814 13.3V7.01C17.0344 7.90985 18.5387 8.39265 20.0814 8.39V5.3C20.0814 5.3 18.2014 5.39 16.8414 3.82Z" fill="black"></path></svg>
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
                  aria-label="Action event example"
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
                      AZ
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
                      EN
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
                  aria-label="Main Menu"
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
        <div className="lg:hidden h-[calc(100vh-96px)]">
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
                  <Image
                    src="../icons/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/birainy/"
                  className="p-3 border border-gray-200 rounded-sm"
                >
                  <Image
                    src="../icons/linkedin.svg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
              <Link
                  target="_blank"
                  href="https://academy.birainy.com/"
                  // className="p-3 border border-gray-200 rounded-sm"
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
