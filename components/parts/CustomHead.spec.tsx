import { render } from "@testing-library/react";
import CustomHead from "@/components/parts/CustomHead";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("PROFILE", () => {
  test("1.タイトル", () => {
    render(
      <CustomHead title="PROFILE" description="プロフィールページです。" />,
      {
        container: document.head,
      }
    );
    expect(document.title).toBe("PROFILE");
  });

  test("2.metaタグのdescription", () => {
    render(<CustomHead title="PROFILE" description="プロフィールページです。"/>, {
      container: document.head,
    });
    expect(
      document
        .querySelector("meta[name='description']")
        ?.attributes.getNamedItem("content")?.value
    ).toBe("プロフィールページです。");
  });

  test("3.metaタグのog:title", () => {
    render(<CustomHead title="PROFILE" description="プロフィールページです。"/>, {
      container: document.head,
    });
    expect(
      document
        .querySelector("meta[property='og:title']")
        ?.attributes.getNamedItem("content")?.value
    ).toBe("PROFILE");
  });

  test("4.metaタグのog:description", () => {
    render(<CustomHead title="PROFILE" description="プロフィールページです。"/>, {
      container: document.head,
    });
    expect(
      document
        .querySelector("meta[property='og:description']")
        ?.attributes.getNamedItem("content")?.value
    ).toBe("プロフィールページです。");
  });
});
