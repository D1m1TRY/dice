import Image from "next/image";
import DiceGame from "@/components/DiceGame";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-4 sm:p-8">
      <main className="flex justify-center items-start pt-8">
        <DiceGame />
      </main>
    </div>
  );
}
