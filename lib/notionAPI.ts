import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Post } from "@/types/notionAPI";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }
  const response = await fetch(apiUrl);
  const allPosts = await response.json();

  return allPosts
}

const getPageMetaData = (post:any) => {
  const description = post.properties.概要.rich_text[0];
  return {
    id: post.id,
    title: post.properties.名前.title[0].plain_text,
    description: description ? description.plain_text : '',
    date: post.properties.日付.date.start,
    tags: post.properties.タグ.multi_select.map((tag:any) => tag.name),
    slug: post.properties.スラッグ.rich_text[0].plain_text,
  };
};

export const getSinglePost = async (slug: string) => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Environment variable NOTION_DATABASE_ID must be defined");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "スラッグ",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    metadata,
    markdown: mdString,
  };
};

//ページ番号に応じて記事を取得
export const getPaginatedPosts = async (page: number) => {
  const allPosts = await getAllPosts();
  const offset = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = offset + NUMBER_OF_POSTS_PER_PAGE;
  return allPosts.slice(offset, endIndex);
};

//ページ数を取得
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();
  const numberOfPages = Math.ceil(allPosts.length / NUMBER_OF_POSTS_PER_PAGE);
  return numberOfPages;
};

//タグに応じて記事を取得
export const getPostsByTagAndPage = async (tag: string, page: number) => {
  const allPosts = await getAllPosts();
  const postsByTag = allPosts.filter((post:Post) => post.tags.includes(tag));
  const offset = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = offset + NUMBER_OF_POSTS_PER_PAGE;
  return postsByTag.slice(offset, endIndex);
};

//タグに応じてページ数を取得
export const getNumberOfPagesByTag = async (tag: string) => {
  const allPosts = await getAllPosts();
  const postsByTag = allPosts.filter((post:Post) => post.tags.includes(tag));
  const numberOfPages = Math.ceil(postsByTag.length / NUMBER_OF_POSTS_PER_PAGE);
  return numberOfPages;
};

//タグ一覧を取得
export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const allTags = allPosts.map((post:Post) => post.tags).flat();
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
};
