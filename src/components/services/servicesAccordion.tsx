'use client'
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AccordionItemType } from "@/types/types";


export default function ServicesAccordion({ accordionItems }: { accordionItems: AccordionItemType[] }) {
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
    setExpandedIndex(currentIndex)
    // setExpandedIndex((prevIndex) =>
    //   prevIndex === currentIndex ? null : currentIndex
    // );
  };

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const index = accordionItems.findIndex((item) => item.id === parseInt(idParam));
      setExpandedIndex(index !== -1 ? index : null);
    } else {
      setExpandedIndex(null);
    }
  }, [searchParams, accordionItems]);


  return (
    <div className="accordion w-full lg:min-w-[35%] font-pp-neue start-0 static lg:sticky top-[130px] h-fit">
      <div>
        {accordionItems.map((item, index) => {
          const hasTabs = item.tabs && item.tabs.length > 1;

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
                <span className="font-pp-neue text-xl font-semibold">{item.title}</span>
                <span className="text-3xl font-semibold">
                  {hasTabs ? (expandedIndex === index ? "-" : "+") : ""}
                </span>
              </div>
              {hasTabs && expandedIndex === index && (
                <div className="p-4 bg-gray-100 border-t border-t-gray-300 rounded-b-lg">
                  {(item.tabs ?? []).map((tab, tabIndex) => (
                    <p
                      key={tabIndex}
                      className="font-pp-neue cursor-pointer text-gray-500 text-xl py-2"
                      onClick={() => handleAccordionItem(tabIndex)}
                    >
                      {tab.title}
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
