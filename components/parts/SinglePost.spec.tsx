import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import SinglePost from "@/components/parts/SinglePost";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SinglePost", () => {
  const mockPost = {
    title: "Test Title",
    date: "2023-01-01",
    tags: ["tag1", "tag2"],
    description: "Test Description",
    slug: "test-slug",
  };

  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    render(<SinglePost {...mockPost} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("1.タイトル、日付、タグ、説明を正しく表示している", () => {
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    mockPost.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
    expect(screen.getByText(mockPost.description)).toBeInTheDocument();
  });

  it("2.ユーザーがクリックしたときに、router.pushが適切な引数(/blog/${slug})で呼び出されること。", () => {
    screen.getByText(mockPost.title).click();
    expect(pushMock).toHaveBeenCalledWith(`/blog/${mockPost.slug}`);
  });
});
