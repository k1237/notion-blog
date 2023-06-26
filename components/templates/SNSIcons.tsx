import { FaTwitterSquare, FaGithubSquare } from "react-icons/fa";

export default function SNSIcons() {
  return (
    <div className="flex w-3/5 mx-auto mt-5" data-testid="sns-icons"> 
        <a
          href="https://twitter.com/kprm1237"
          target="_blank"
          rel="noopener noreferrer"
          data-testid='twitter-link'
        >
         <FaTwitterSquare size="50px" color="skyblue" />
        </a>
        <a
          href="https://github.com/k1237"
          target="_blank"
          rel="noopener noreferrer"
          data-testid='github-link'
        >
          <FaGithubSquare size="50px"/>
        </a>
    </div>
  );
}
