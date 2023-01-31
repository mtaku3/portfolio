import Container from "./container";
import { SlSocialTwitter } from "react-icons/sl";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import SupportMeButton from "./supportMeButton";
import Image from "next/image";

export default function Footer() {
  return (
    <Container className="mb-16">
      <div className="w-full my-4 border-t border-dashed border-gray-400" />
      <p className="text-gray-500 dark:text-gray-300">
        © mtaku3 {new Date().getFullYear()}
      </p>
      <p className="text-gray-500 dark:text-gray-300 mt-2">
        このサイトはNext.js & TailwindCSSで開発しました
      </p>
      <p className="text-gray-500 dark:text-gray-300 mt-2">
        TwitterのDMにお気軽にご連絡ください
      </p>
      <div className="mt-4">
        <SupportMeButton />
      </div>
      <div className="mt-4 flex flex-row space-x-4">
        <Link href="https://webcrate-1-z5786317.deta.app/crate/public/yn51i1BLijMx9DOL" aria-label="SNS WebCrate link">
          <Image
            className=" h-5 w-5"
            src="/WebCrate.webp"
            alt="mtaku3's SNS WebCrate"
            width={32}
            height={32}
          />
        </Link>
        <Link href="https://twitter.com/mtaku3dev" aria-label="Twitter link">
          <SlSocialTwitter className="h-5 w-5" />
        </Link>
        <Link href="https://github.com/mtaku3" aria-label="Github link">
          <BsGithub className="h-5 w-5" />
        </Link>
      </div>
    </Container>
  );
}
