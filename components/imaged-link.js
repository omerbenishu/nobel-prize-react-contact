import Link from "next/link";
import Image from "next/image";

export default function ImagedLink({ src, title, href }) {
  return (
    <>
      <Image className="linkedImage" src={src} alt={title} width="100" height="100"></Image>
      <Link href={href}>{title}</Link>
    </>
  );
}
