import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="felx items-center justify-items-center min-h-screen p-8 pb-20 gap-4">
      <p className="text-3xl font-pp-neue">Some regular text</p>
      <p className="text-3xl">Some regular text</p>
      <Button color="primary">Click regular</Button>
      <Image
        src="/logo.svg"
        alt="hero"
        width={500}
        height={500}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
