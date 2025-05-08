'use client'
import React from "react";
import { Divider } from "@heroui/react";
import { useSearchParams } from "next/navigation";

import ServicesHeader from "@/components/services/servicesHeader";
import ServicesAccordion from "@/components/services/servicesAccordion";
import { useTranslations } from "next-intl";


export default function Services() {
  const searchParams = useSearchParams();
  const t = useTranslations('Services');

  return (
    <section>
      <div className="container">
        <ServicesHeader t={t} />
        <Divider className="my-10" />
        <div className="flex flex-col md:flex-row gap-10 pb-20">
          <ServicesAccordion />
          <div className="info">
            <p>Selected Item ID: {searchParams.get("id") || "None"}</p>
            <p>Selected Tab ID: {searchParams.get("tab") || "None"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
