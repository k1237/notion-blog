import { SingePost } from "@/types/notionAPI";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SinglePost(props: SingePost) {
  const { title, date, tags, description, slug } = props;
  const router = useRouter();

  return (
    <section
      className="w-full sm:w-5/6 bg-sky-500 my-4 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-30 mx-auto cursor-pointer"
      onClick={() => router.push(`/blog/${slug}`)}
    >
      <div className="">
        <h2 className="text-gray-100 text-xl font-medium mb-2 text-shadow-black">{title}</h2>
      </div>
      <p className="text-gray-100 text-shadow-black">{description}</p>
      <div className="text-gray-100 text-xs mb-2 text-shadow-black">{date}</div>
      {tags.map((tag:string, index:number) => (
        <Link href={`/blog/tag/${tag}/page/1`} key={index}>
          <span className="mx-1 text-white text-xs cursor-pointer px-2 font-medium py-1 rounded-xl bg-gray-400 inline-block">
            {tag}
          </span>
        </Link>
      ))}
    </section>
  );
}
