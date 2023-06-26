import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";

type RichText = {
  plain_text: string;
};

type SelectOption = {
  name: string;
};

type PostProperties = {
  名前: { title: RichText[] };
  概要: { rich_text: RichText[] };
  日付: { date: { start: string } };
  タグ: { multi_select: SelectOption[] };
  スラッグ: { rich_text: RichText[] };
};

type PostPage = {
  id: string;
  properties: PostProperties;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Environment variable NOTION_DATABASE_ID must be defined");
  }

  const posts = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    filter: {
      property: "公開",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "日付",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post:any) => {
  const description = post.properties.概要.rich_text[0];
  return {
    id: post.id,
    title: post.properties.名前.title[0].plain_text,
    description: description ? description.plain_text : '',
    date: post.properties.日付.date.start,
    tags: post.properties.タグ.multi_select.map((tag) => tag.name),
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
  const postsByTag = allPosts.filter((post) => post.tags.includes(tag));
  const offset = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = offset + NUMBER_OF_POSTS_PER_PAGE;
  return postsByTag.slice(offset, endIndex);
};

//タグに応じてページ数を取得
export const getNumberOfPagesByTag = async (tag: string) => {
  const allPosts = await getAllPosts();
  const postsByTag = allPosts.filter((post) => post.tags.includes(tag));
  const numberOfPages = Math.ceil(postsByTag.length / NUMBER_OF_POSTS_PER_PAGE);
  return numberOfPages;
};

//タグ一覧を取得
export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const allTags = allPosts.map((post) => post.tags).flat();
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
};


//TOPページ用に最新の記事を取得する(3つ)
// export const getLatestPosts = async (num:number) => {
//   const allPosts = await getAllPosts();
//   const latestPosts = allPosts.slice(0, num);
//   return latestPosts;
// }