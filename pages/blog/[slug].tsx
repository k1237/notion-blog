import Sidebar from "@/components/templates/Sidebar";
import styles from "../../styles/blog/slug.module.css";
import { getSinglePost, getAllPosts } from "@/lib/notionAPI";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CustomHead from "@/components/parts/CustomHead";

interface Post {
  metadata: {
    id: number;
    title: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
  };
  markdown: {
    parent: string;
  };
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }: { slug: string }) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params!.slug as string;
  const post = await getSinglePost(slug);

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
};

export default function Post({ post }: { post: Post }) {
  return (
    <section className="container px-5 h-900 lg:w-4/5 mx-auto mt-20">
      <CustomHead
        title={post.metadata.title}
        description={post.metadata.description}
      />
      <div className="lg:flex lg:w-10/12 mx-auto justify-evenly">
        <div className="lg:w-9/12 lg:mr-5">
          <h2 className="w-full text-xl font-meduium">{post.metadata.title}</h2>
          <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
          <span className="text-gray-500">投稿日：{post.metadata.date}</span>
          <br />
          {post.metadata.tags.map((tag: string, index: number) => (
            <Link
              href={`/blog/tag/${tag}/page/1`}
              key={index}
              className="text-xs text-white bg-gray-500 rounded-xl font-medium mt-2 px-2 inline-block"
            >
              <span className="m-2">{tag}</span>
            </Link>
          ))}

          <div id={styles.slug} className="mt-10 font-medium">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code>{children}</code>
                  );
                },
              }}
            >
              {post.markdown.parent}
            </ReactMarkdown>
          </div>
          <Link href="/blog/page/1">
            <span className="pb-20 block mt-10">←戻る</span>
          </Link>
        </div>
        <div className="lg:w-3/12 hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </section>
  );
}
