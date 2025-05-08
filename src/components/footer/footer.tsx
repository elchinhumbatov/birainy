import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Tiktok from "../icons/Tiktok";
import { Divider } from "@heroui/react";
import Image from "next/image";

const footerlinks = [
  { name: "services", href: "/services" },
  { name: "projects", href: "/projects" },
  { name: "analytics", href: "/analytics" },
  { name: "blogs", href: "/blogs" },
  { name: "about", href: "/about" },
];

export default function Footer() {
  const t = useTranslations("Navbar");
  const t2 = useTranslations("Footer");
  const offices = ['az', 'cn', 'ge'] as const;

  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="container">
        {/* Links */}
        <div className="flex items-start md:items-end justify-between flex-col md:flex-row gap-2 mb-10">
          <div className="mb-10 md:mb-0">
            <h2 className="w-[70%] sm:w-[60%] md:w-[55%] text-3xl md:text-5xl mb-6 font-semibold">{t2('title')}</h2>
            <ul className="flex flex-col md:flex-row space-x-4">
              {footerlinks.map((link) => (
                <li key={link.name}>
                  <Link className="font-semibold text-lg inline-block py-1" href={link.href}>{t(link.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-left md:text-right font-semibold mb-4 text-xl">{t2('follow')}</p>
            <div className="flex justify-center space-x-4">
              <Link
                target="_blank"
                href="https://www.instagram.com/birainy_az/"
                className="block p-4 border border-white hover:border-yellow-300 rounded-full"
              >
                <Instagram color="white" width="24" height="24" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/birainy/"
                className="block p-4 border border-white hover:border-yellow-300 rounded-full"
              >
                <Linkedin color="white" width="24" height="24" />
              </Link>
              <Link 
                target="_blank" 
                href="https://www.tiktok.com/@birainy"
                className="block p-4 border border-white hover:border-yellow-300 rounded-full"
              >
                <Tiktok color="white" width="24" height="24" />
              </Link>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {offices.map((office) => (
            <div key={office}>
              <p className="text-xl mb-3">{t2(`${office}.country`)}</p>
              <p className="text-gray-400 mb-4">{t2(`${office}.address`)}</p>
            </div>
          ))}
        </div>

        <Divider className="bg-gray-400 my-10" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-5">
          <div className="flex items-center justify-center gap-3 mb-10 lg:mb-0">
            <Image src='/icons/verify.svg' alt='verify' width={37} height={37} />
            <p className="text-lg">Partner with</p>
            <Image src='/icons/microsoft.svg' alt='microsoft' width={100} height={26} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <Link href='tel:+994124886654' className="text-lg mx-5 my-2">+994 12 488 66 54</Link>
            <Link href='tel:+994776131317' className="text-lg mx-5 my-2">+994 77 613 13 17</Link>
            <Link href='mailto:info@birainy.com' className="text-lg mx-5 my-2">info@birainy.com</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
