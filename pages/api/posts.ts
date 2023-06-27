import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    res.status(500).json({
      message: "Environment variable NOTION_DATABASE_ID must be defined",
    });
    return;
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

  const allPosts = posts.results.map((post) => {
    return getPageMetaData(post);
  });

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).json(allPosts);
}

const getPageMetaData = (post: any) => {
  const description = post.properties.概要.rich_text[0];
  return {
    id: post.id,
    title: post.properties.名前.title[0].plain_text,
    description: description ? description.plain_text : "",
    date: post.properties.日付.date.start,
    tags: post.properties.タグ.multi_select.map((tag: any) => tag.name),
    slug: post.properties.スラッグ.rich_text[0].plain_text,
  };
};
