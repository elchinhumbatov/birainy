"use client";
import React from "react";
import { Button, Divider } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useMessages } from "next-intl";
import Link from "next/link";

import ServicesHeader from "@/components/services/servicesHeader";
import ServicesAccordion from "@/components/services/servicesAccordion";
import { AccordionItemType, AccordionTabs } from "@/types/types";
import Projects from "@/components/icons/Projects";
import Phone from "@/components/icons/Phone";


export default function Services() {
  const searchParams = useSearchParams();
  const t = useTranslations("Services");
  const messages = useMessages();
  const accordionsObj = messages.Services.accordions as Record<
    string,
    { title: string; tabs?: AccordionTabs }
  >;

  const accordionItems: AccordionItemType[] = Object.entries(accordionsObj).map(
    ([key, value], idx) => ({
      id: idx + 1,
      key,
      title: value.title,
      tabs: value.tabs
        ? Object.entries(value.tabs).map(([tabKey, tabData]) => ({
            key: tabKey,
            title: tabData.title,
            desc: tabData.desc,
          }))
        : undefined,
    })
  );

  return (
    <section>
      <div className="container">
        <ServicesHeader t={t} />
        <Divider className="my-10 bg-gray-500" />
        <div className="flex flex-col lg:flex-row gap-10 pb-20">
          <ServicesAccordion accordionItems={accordionItems} />
          <div className="info">
            <h2 className="font-pp-neue text-3xl md:text-5xl mb-8 font-semibold">
              {accordionItems[
                Number(searchParams.get("id"))
                  ? Number(searchParams.get("id")) - 1
                  : 0
              ]?.title}
            </h2>
            <p>
              {accordionItems[
                Number(searchParams.get("id"))
                  ? Number(searchParams.get("id")) - 1
                  : 0
              ]?.tabs?.[
                Number(searchParams.get("tab"))
                  ? Number(searchParams.get("tab"))
                  : 0
              ]?.desc}
            </p>
            <div className="flex flex-col lg:flex-row gap-4 my-5">
              <Link href="/contact">
                <Button
                  color="primary"
                  startContent={<Phone />}
                  className="p-6 font-semibold"
                >
                  {t("contacts")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button startContent={<Projects />} className="p-6 font-semibold">
                  {t("projects")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
