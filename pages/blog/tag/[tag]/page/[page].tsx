import {
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
  getAllTags,
} from "@/lib/notionAPI";
import SinglePost from "@/components/parts/SinglePost";
import Pagination from "@/components/parts/Pagination";
import { GetStaticPaths, GetStaticProps } from "next";
import { PaginatedPost } from "@/types/notionAPI";
import Tag from "@/components/parts/Tag";
import Sidebar from "@/components/templates/Sidebar";
import CustomHead from "@/components/parts/CustomHead";

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();
  const paths = await Promise.all(
    allTags.map(async (tag: string) => {
      const numberOfPageByTag = await getNumberOfPagesByTag(tag);
      return [...Array(numberOfPageByTag)].map((_, index) => ({
        params: { tag: tag, page: (index + 1).toString() },
      }));
    })
  );
  return {
    paths: paths.flat(),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params!.page as string;
  const currentTag = context.params!.tag as string;
  const upperCaseTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1);
  const posts = await getPostsByTagAndPage(
    upperCaseTag,
    parseInt(currentPage, 10)
  );
  const numberOfPageByTag = await getNumberOfPagesByTag(upperCaseTag);
  const allTags = await getAllTags();
  return {
    props: {
      posts,
      numberOfPageByTag,
      currentTag,
      allTags,
    },
    revalidate: 60,
  };
};

interface BlogPageListProps {
  posts: PaginatedPost[];
  numberOfPageByTag: number;
  currentTag: string;
  allTags: string[];
}

export default function BlogTagPageList({
  posts,
  numberOfPageByTag,
  currentTag,
  allTags,
}: BlogPageListProps) {
  return (
    <div>
      <CustomHead
        title="BLOG"
        description="ブログページです。"
      />
      <main className="container w-full mt-16 mx-auto h-900">
        <h1 className="text-4xl font-bold text-center">BLOG</h1>
        <div className="lg:flex lg:w-9/12 mx-auto">
          <div className="lg:w-8/12">
            {posts.map((post) => (
              <div className="mx-4" key={post.id}>
                <SinglePost
                  title={post.title}
                  date={post.date}
                  tags={post.tags}
                  description={post.description}
                  slug={post.slug}
                />
              </div>
            ))}
            <Pagination numberOfPages={numberOfPageByTag} tag={currentTag} />
            <Tag tags={allTags} />
          </div>
          <div className="lg:w-4/12 hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
