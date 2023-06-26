import { getPageLink } from './blog-helper';

describe("getPageLink(タグとページ番号に応じたリンクの取得)", () => {
  it("1.tagが存在する場合", () => {
    const tag = "testTag";
    const page = 2;
    const expectedLink = `/blog/tag/${tag}/page/${page}`;
    const result = getPageLink(tag, page);
    expect(result).toEqual(expectedLink);
  });

  it("2.tagが存在しない場合", () => {
    const page = 2;
    const expectedLink = `/blog/page/${page}`;
    const result = getPageLink("", page);
    expect(result).toEqual(expectedLink);
  });
});

