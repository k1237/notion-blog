import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

interface Props {
  isOpen: boolean;
  handleStateChange: (state: { isOpen: boolean }) => void;
  closeMenu: () => void;
}

export default function NavSP(props: Props) {
  const { isOpen, handleStateChange, closeMenu } = props;
  return (
    <Menu
      width={300}
      isOpen={isOpen}
      onStateChange={handleStateChange}
      className={"hide-on-desktop"}
    >
      <Link href="/" onClick={closeMenu} className={"burger-link"}>
        PROFILE
      </Link>
      <Link href="/blog/page/1" onClick={closeMenu} className={"burger-link"}>
        BLOG
      </Link>
      <Link href="/portfolio" onClick={closeMenu} className={"burger-link"}>
        PORTFOLIO
      </Link>
    </Menu>
  );
}
