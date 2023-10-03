import ThemeSwitch from "./ThemeSwitch";
import { Moon, Rss, Search, Sun } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="col-span-full my-4 flex items-center space-x-2">
      <Image
        className="h-10 w-10 rounded-full md:h-16 md:w-16"
        src="/mtaku3.webp"
        width={40}
        height={40}
        alt="Image of mtaku3"
      />
      <div className="!ml-auto space-x-2">
        <button className="rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-600">
          <Search className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <ThemeSwitch className="rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-600" />
        <button className="rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-600">
          <Rss className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </header>
  );
}
