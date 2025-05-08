import React from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./services.module.css";

interface ServicesHeaderProps {
  t: (key: string) => string;
}

export default function ServicesHeader({ t }: ServicesHeaderProps) {
  return (
    <div>
      <div className="mt-15 mb-10">
        <Image src="/icons/star.svg" alt="star" width={48} height={48} />
      </div>
      <div className="flex items-end justify-between gap-15">
        <div>
          <h1 className="font-pp-neue text-3xl sm:text-5xl md:text-7xl mb-8">{t('title')}</h1>
          <p>{t('description')}</p>
        </div>
        <div className="hidden lg:flex">
          <Link href="/contact" className={s.circleContainer}>
            <div className={s.arrow}>
              <Image
                src="/icons/arrow.svg"
                alt="arrow"
                width={50}
                height={50}
              />
            </div>
            <svg
              className={s.rotatingText}
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              fill="#000000"
              width="136"
              height="136"
            >
              <circle cx="32" cy="32" r="30" fill="#000000"></circle>
              <defs>
                <path
                  id="circle"
                  d="M 32, 32
                        m -25, 0
                        a 25, 25 0 1, 0 50, 0
                        a 25, 25 0 1, 0 -50, 0
                        "
                ></path>
              </defs>
              <text>
                <textPath
                  xlinkHref="#circle"
                  className={s.text}
                >
                  {t('order')}
                </textPath>
              </text>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
