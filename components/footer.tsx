import Container from "./container";
import { SlSocialTwitter } from "react-icons/sl";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  return (
    <Container className="mb-16">
      <div className="w-full my-4 border-t border-dashed border-gray-400" />
      <p className="text-gray-400">© mtaku3 {new Date().getFullYear()}</p>
      <p className="text-gray-400 mt-2">
        このサイトはNext.js & TailwindCSSで開発しました
      </p>
      <p className="text-gray-400 mt-2">TwitterのDMにお気軽にご連絡ください</p>
      <div className="mt-4 flex flex-row space-x-4">
        <Link href="https://twitter.com/DYZdK2oir7Pm">
          <SlSocialTwitter className="h-5 w-5" />
        </Link>
        <Link href="https://github.com/mtaku3">
          <BsGithub className="h-5 w-5" />
        </Link>
      </div>
    </Container>
  );
}
