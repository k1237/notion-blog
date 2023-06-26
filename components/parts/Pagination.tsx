import { getPageLink } from "@/lib/blog-helper";
import Link from "next/link";

type Props = {
  numberOfPages: number;
  tag?: string;
};

export default function Pagination({ numberOfPages, tag }: Props) {
  const pages = [...Array(numberOfPages)].map((_, index) => index + 1);

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            className="bg-sky-500 rounded-lg w-6 h-8 relative"
          >
            <Link
              href={getPageLink(tag ?? "", pageNumber)}
              className="pagination-link text-shadow-black"
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
