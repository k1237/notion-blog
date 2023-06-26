import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Pagination from "@/components/parts/Pagination";
import { getPageLink } from "@/lib/blog-helper";

const numberOfPages = 5;
const tag = "test-tag";

describe("Pagination", () => {
  beforeEach(() => {
    render(<Pagination numberOfPages={numberOfPages} tag={tag} />);
  });

  it("1.ページリンクの数が `numberOfPages` プロパティに一致している", () => {
    const paginationLinks = screen.getAllByRole("link", { name: /\d+/ });
    expect(paginationLinks.length).toBe(numberOfPages);
  });

  it("2.各ページリンクが正しいURLへのリンクを持っている", () => {
    const paginationLinks = screen.getAllByRole("link", { name: /\d+/ });
    paginationLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", getPageLink(tag, index + 1));
    });
  });
});