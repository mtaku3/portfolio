import { useRouter } from "next/router";
import { useCallback } from "react";

type TabProps = {
  children: string;
  path: string;
};

export default function Tab({ children, path }: TabProps) {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(path);
  }, [router, path]);

  return (
    <button
      className={`px-3 py-1.5 rounded-md hover:bg-gray-200 transition dark:hover:bg-gray-700 ${
        router.pathname === path ? "font-bold" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
