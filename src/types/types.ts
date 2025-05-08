
export type AccordionItemType = {
  id: number,
  key: string;
  title: string;
  tabs?: {
    title: string;
    desc: string;
  }[];
};
export type AccordionTabs = {
  [tabKey: string]: TabData;
};
export type TabData = {
  title: string;
  desc: string;
};