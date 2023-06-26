import Link from "next/link";

type Props = {
  tags: string[];
};

export default function Tag(props: Props) {
  const { tags } = props;
  return (
    <div className="mx-4">
      <section className="w-full sm:w-5/6 mb-8 mx-auto bg-sky-300 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all">
        <div className="font-medium mb-4 text-white text-shadow-black">タグ検索</div>
        <div className="flex flex-wrap gap-5">
          {tags.map((tag:string, index:number) => (
            <Link href={`/blog/tag/${tag}/page/1`} key={index}>
              <span className="text-white text-xs cursor-pointer px-2 font-medium py-1 rounded-xl bg-gray-400 inline-block">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
