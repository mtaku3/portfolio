import ThemeSwitch from "./ThemeSwitch";
import { Rss, Search } from "lucide-react";
import Link from "next/link";

type Props = {
  lang?: string;
};

export default function Header({ lang }: Props = {}) {
  // TODO: Implement search
  // TODO: Implement RSS feed
  return (
    <header className="col-span-full my-4 flex items-center space-x-2">
      <div className="mx-auto space-x-6">
        <Link
          href={lang ? `/${lang}` : "/"}
          className="font-semibold text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white md:text-lg"
        >
          About
        </Link>
        <Link
          href={lang ? `/${lang}/projects` : "/projects"}
          className="font-semibold text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white md:text-lg"
        >
          Projects
        </Link>
        <Link
          href={lang ? `/${lang}/blog` : "/blog"}
          className="font-semibold text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white md:text-lg"
        >
          Blog
        </Link>
      </div>
      <div className="space-x-2">
        {/* <button className="rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-600">
          <Search className="h-5 w-5 md:h-6 md:w-6" />
        </button> */}
        <ThemeSwitch className="rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-600" />
        {/* <button className="rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-600">
          <Rss className="h-5 w-5 md:h-6 md:w-6" />
        </button> */}
      </div>
    </header>
  );
}
