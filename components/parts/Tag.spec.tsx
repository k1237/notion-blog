import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Tag from "@/components/parts/Tag";

const mockTags = ["tag1", "tag2", "tag3"];

describe("Tag Component", () => {
  beforeEach(() => {
    render(<Tag tags={mockTags} />);
  });

  it("1.タグの数が `tags` プロパティに一致している", () => {
    const tags = screen.getAllByRole("link", { name: /tag\d+/ });
    expect(tags.length).toBe(mockTags.length);
  });

  it("2.各タグの内容が正しく表示されている", () => {
    mockTags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
