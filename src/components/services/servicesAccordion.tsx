'use client'
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const accordionItems = [
  {
    id: 1,
    title: "Accordion 1",
    tabs: ["birinci", "ikincisi", "ucuncusu"],
  },
  {
    id: 2,
    title: "Accordion 2",
    tabs: ["birinci", "ikincisi", "ucuncusu"],
  },
  {
    id: 3,
    title: "Accordion 3",
  },
  {
    id: 4,
    title: "Accordion 4",
    tabs: ["birinci", "ikincisi", "ucuncusu"],
  },
];

export default function ServicesAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string, removeTab: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      
      if (removeTab) params.delete("tab");
      return params.toString();
    },
    [searchParams]
  );

  const handleAccordionId = (id: number) => {
    if (searchParams.get("id") != id.toString()) {
      router.push(pathname + "?" + createQueryString("id", id.toString(), true), { scroll: false });
    }
  };
  const handleAccordionItem = (itemIndex: number) => {
    router.push(pathname + "?" + createQueryString("tab", itemIndex.toString(), false), { scroll: false });
  };

  const toggleAccordion = (currentIndex: number) => {
    setExpandedIndex((prevIndex) =>
      prevIndex === currentIndex ? null : currentIndex
    );
  };

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const index = accordionItems.findIndex((item) => item.id === parseInt(idParam));
      setExpandedIndex(index !== -1 ? index : null);
    } else {
      setExpandedIndex(null);
    }
  }, [searchParams]);


  return (
    <div className="accordion w-full md:w-[30%] font-pp-neue start-0 static lg:sticky top-[130px] h-fit">
      <div>
        {accordionItems.map((item, index) => {
          const hasTabs = item.tabs && item.tabs.length > 0;

          return (
            <div
              key={item.id}
              className="mb-2 border border-gray-100 hover:border-yellow-300 rounded-lg"
            >
              <div
                className={`flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-lg ${
                  expandedIndex === index ? "rounded-b-none" : ""
                }`}
                onClick={() => {
                  toggleAccordion(index);
                  handleAccordionId(item.id);
                }}
              >
                <span className="text-xl font-semibold">{item.title}</span>
                <span className="text-3xl font-semibold">
                  {hasTabs ? (expandedIndex === index ? "-" : "+") : ""}
                </span>
              </div>
              {hasTabs && expandedIndex === index && (
                <div className="pl-4 bg-gray-100 border-t border-t-gray-300 py-4 rounded-b-lg">
                  {item.tabs.map((tab, tabIndex) => (
                    <p
                      key={tabIndex}
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleAccordionItem(tabIndex)}
                    >
                      {tab}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
