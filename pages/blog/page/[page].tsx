import {
  getAllTags,
  getNumberOfPages,
  getPaginatedPosts,
} from "@/lib/notionAPI";
import SinglePost from "@/components/parts/SinglePost";
import Pagination from "@/components/parts/Pagination";
import { GetStaticPaths, GetStaticProps } from "next";
import { PaginatedPost } from "@/types/notionAPI";
import Tag from "@/components/parts/Tag";
import Sidebar from "@/components/templates/Sidebar";
import CustomHead from "@/components/parts/CustomHead";

export const getStaticPaths: GetStaticPaths = async () => {
  const getNumbers = await getNumberOfPages();
  const paths = [...Array(getNumbers)].map((_, index) => ({
    params: { page: (index + 1).toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params!.page as string;
  const paginatedPosts = await getPaginatedPosts(
    parseInt(currentPage.toString(), 10)
  );
  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return {
    props: {
      paginatedPosts,
      numberOfPage,
      allTags,
    },
    revalidate: 60,
  };
};

interface BlogPageListProps {
  paginatedPosts: PaginatedPost[];
  numberOfPage: number;
  allTags: string[];
}

export default function BlogPageList({
  paginatedPosts,
  numberOfPage,
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
            {paginatedPosts.map((post) => (
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
            <Pagination numberOfPages={numberOfPage} />
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
