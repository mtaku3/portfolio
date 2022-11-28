import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import styleToJs from "style-to-js";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightStyles from "./github-markdown-light.module.css";
import DarkStyles from "./github-markdown-dark.module.css";

type HTMLParserProps = {
  src: string;
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element && domNode.attribs)) {
      return;
    }

    const { name, attribs, children } = domNode;

    if (name === "a") {
      return (
        <Link href={attribs.href} style={styleToJs(attribs.style)}>
          {domToReact(children, options)}
        </Link>
      );
    }

    if (name === "img") {
      const src = attribs.src.replace(/\?w=[0-9]+&h=[0-9]+/, "");
      const width = Number(attribs.src.match(/(?<=\?w=)[0-9]+/));
      const height = Number(attribs.src.match(/(?<=&h=)[0-9]+/));

      return (
        <Image
          src={src}
          width={width}
          height={height}
          alt={attribs.alt}
          style={styleToJs(attribs.style)}
        />
      );
    }

    if (name === "ol") {
      return (
        <ol className="list-decimal" style={styleToJs(attribs.style)}>
          {domToReact(children, options)}
        </ol>
      );
    }

    if (name === "ul") {
      return (
        <ol className="list-disc" style={styleToJs(attribs.style)}>
          {domToReact(children, options)}
        </ol>
      );
    }
  },
};

export default function HTMLParser({ src }: HTMLParserProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn({
        [LightStyles.markdown]: !mounted,
        [LightStyles["markdown-body"]]: mounted && resolvedTheme === "light",
        [DarkStyles["markdown-body"]]: mounted && resolvedTheme === "dark",
      })}
    >
      {parse(DOMPurify.sanitize(src), options)}
    </div>
  );
}
