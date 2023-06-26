import {
  getAllPosts,
  getSinglePost,
  getPaginatedPosts,
  getNumberOfPages,
  getPostsByTagAndPage,
  getNumberOfPagesByTag,
  getAllTags
} from "@/lib/notionAPI";

process.env.NOTION_DATABASE_ID = "test_id";
const NUMBER_OF_POSTS_PER_PAGE = 4;

// 大元のデータを取得するモック
jest.mock("@notionhq/client", () => ({
  Client: jest.fn().mockImplementation(() => ({
    databases: {
      query: jest.fn().mockReturnValue({
        results: Array.from({ length: 10 }, (_, i) => ({
          id: `mockPost${i + 1}`,
          properties: {
            名前: { title: [{ plain_text: `mockTitle${i + 1}` }] },
            概要: { rich_text: [{ plain_text: `mockDescription${i + 1}` }] },
            日付: { date: { start: `mockDate${i + 1}` } },
            // タグを交互にmockTag1とmockTag2に設定
            タグ: { multi_select: [{ name: `mockTag${(i % 2) + 1}` }] },
            スラッグ: { rich_text: [{ plain_text: `mockSlug${i + 1}` }] },
          },
        })),
      }),
    },
  })),
}));

//2.markdownに変換するモック
jest.mock("notion-to-md", () => {
  return {
    NotionToMarkdown: jest.fn().mockImplementation(() => {
      return {
        pageToMarkdown: jest.fn().mockResolvedValue([
          {
            type: "paragraph",
            children: [
              {
                text: {
                  content: "mockContent",
                },
              },
            ],
          },
        ]),
        toMarkdownString: jest.fn().mockReturnValue("mockContent"),
      };
    }),
  };
});

//APIを直接叩く関数をテストするのではなく、APIの応答を処理する関数のテストに重点を置いて作成
describe("NotionAPI関連のテスト", () => {
  it("1.getAllPosts(全記事取得)が適切な値を返すか", async () => {
    const expectedPosts = Array.from({ length: 10 }, (_, i) => ({
      id: `mockPost${i + 1}`,
      title: `mockTitle${i + 1}`,
      description: `mockDescription${i + 1}`,
      date: `mockDate${i + 1}`,
      tags: [`mockTag${(i % 2) + 1}`],
      slug: `mockSlug${i + 1}`,
    }));

    const result = await getAllPosts();
    expect(result).toEqual(expectedPosts);
  });

  it("2.getSinglePost(1記事内容取得)が適切な値を返すか", async () => {
    const expectedPost = {
      markdown: "mockContent",
      metadata: {
        date: "mockDate1",
        description: "mockDescription1",
        id: "mockPost1",
        slug: "mockSlug1",
        tags: ["mockTag1"],
        title: "mockTitle1",
      },
    };

    const result = await getSinglePost("mockSlug1");
    expect(result).toEqual(expectedPost);
  });

  it("3.getPaginatedPosts(ページネーションに応じた記事の取得)が適切な値を返すか", async () => {
    const expectedPosts = Array.from({ length: 10 }, (_, i) => ({
      id: `mockPost${i + 1}`,
      title: `mockTitle${i + 1}`,
      description: `mockDescription${i + 1}`,
      date: `mockDate${i + 1}`,
      tags: [`mockTag${(i % 2) + 1}`],
      slug: `mockSlug${i + 1}`,
    }));

    const expectedPostsPage1 = expectedPosts.slice(0, NUMBER_OF_POSTS_PER_PAGE); // first 4 posts
    const expectedPostsPage2 = expectedPosts.slice(
      NUMBER_OF_POSTS_PER_PAGE,
      NUMBER_OF_POSTS_PER_PAGE * 2
    );
    const expectedPostsPage3 = expectedPosts.slice(
      NUMBER_OF_POSTS_PER_PAGE * 2
    );

    const resultPage1 = await getPaginatedPosts(1);
    const resultPage2 = await getPaginatedPosts(2);
    const resultPage3 = await getPaginatedPosts(3);

    expect(resultPage1).toEqual(expectedPostsPage1);
    expect(resultPage2).toEqual(expectedPostsPage2);
    expect(resultPage3).toEqual(expectedPostsPage3);
  });

  it("4.getNumberOfPages(全記事の合計ページ数)が適切な値を返すか", async () => {
    const expectedNumberOfPages = 3;
    const result = await getNumberOfPages();
    expect(result).toEqual(expectedNumberOfPages);
  });

  it("5.getPostsByTagAndPage(タグに応じた記事の取得)が適切な値を返すか", async () => {
    const tag1 = "mockTag1";
    const tag2 = "mockTag2";

    //１ページ目の記事を取得
    const page = 1;

    const expectedPostsTag1 = Array.from(
      { length: NUMBER_OF_POSTS_PER_PAGE },
      (_, i) => {
        const index = i * 2 + 1;
        return {
          id: `mockPost${index}`,
          title: `mockTitle${index}`,
          description: `mockDescription${index}`,
          date: `mockDate${index}`,
          tags: [`mockTag1`],
          slug: `mockSlug${index}`,
        };
      }
    );

    const expectedPostsTag2 = Array.from(
      { length: NUMBER_OF_POSTS_PER_PAGE },
      (_, i) => {
        const index = i * 2 + 1;
        return {
          id: `mockPost${index + 1}`,
          title: `mockTitle${index + 1}`,
          description: `mockDescription${index + 1}`,
          date: `mockDate${index + 1}`,
          tags: [`mockTag2`],
          slug: `mockSlug${index + 1}`,
        };
      }
    );

    const result1 = await getPostsByTagAndPage(tag1, page);
    expect(result1).toEqual(expectedPostsTag1);
    const result2 = await getPostsByTagAndPage(tag2, page);
    expect(result2).toEqual(expectedPostsTag2);

    //２ページ目の記事を取得
    const page2 = 2;
    const expectedPostsTagPage1 = [
      {
        id: `mockPost9`,
        title: `mockTitle9`,
        description: `mockDescription9`,
        date: `mockDate9`,
        tags: [`mockTag1`],
        slug: `mockSlug9`,
      },
    ];

    const expectedPostsTagPage2 = [
      {
        id: `mockPost10`,
        title: `mockTitle10`,
        description: `mockDescription10`,
        date: `mockDate10`,
        tags: [`mockTag2`],
        slug: `mockSlug10`,
      },
    ];

    const resultPage1 = await getPostsByTagAndPage(tag1, page2);
    expect(resultPage1).toEqual(expectedPostsTagPage1);
    const resultPage2 = await getPostsByTagAndPage(tag2, page2);
    expect(resultPage2).toEqual(expectedPostsTagPage2);
  });

  it("6.getNumberOfPagesByTag(タグに応じてページ数を取得)が適切な値を返すか", async () => {
    const tag1 = "mockTag1";
    const tag2 = "mockTag2";
    const expectedNumberOfPages = 2;
  
    const result1 = await getNumberOfPagesByTag(tag1);
    expect(result1).toEqual(expectedNumberOfPages);
  
    const result2 = await getNumberOfPagesByTag(tag2);
    expect(result2).toEqual(expectedNumberOfPages);
  });

  it("7.getAllTags(全てのタグの取得)が適切な値を返すか", async () => {
    const expectedTags = ["mockTag1", "mockTag2"];
    const result = await getAllTags();
    expect(result).toEqual(expect.arrayContaining(expectedTags));
  });

});
