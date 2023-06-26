import Link from "next/link";

export default function NavPC() {
  return (
    <div>
      <ul className="flex items-center test-sm py-4">
        <li>
          <Link href="/" className="nav-link">
            PROFILE
          </Link>
        </li>
        <li>
          <Link href="/blog/page/1" className="nav-link">
            BLOG
          </Link>
        </li>
        <li>
          <Link href="/portfolio" className="nav-link">
            PORTFOLIO
          </Link>
        </li>
      </ul>
    </div>
  );
}
