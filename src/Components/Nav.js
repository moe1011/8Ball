import github from "../images/github.png";
import linkedin from "../images/linkedin.png";
import portfolio from "../images/portfolio.png";

import "./Nav.css";

export default function Nav() {
  return (
    <div
      className="absolute top-5 sm:top-auto sm:bottom-10 sm:right-10 px-5 py-2 
        rounded-lg text-3xl sm:text-4xl border-gray-50 border
        bg-gradient-to-br from-blue-500 to-blue-700 flex space-x-5 z-20
        Nav"
    >
      <a href="https://github.com/moe1011" target={"_blank"}>
        <img
          className="h-10 w-10 sm:h-14 sm:w-14 hover:opacity-80 transition-opacity ease-in-out duration-200"
          src={github}
        />
      </a>
      <a
        href="https://www.linkedin.com/in/mohammed-abdulla-b5281b19a/"
        target={"_blank"}
      >
        <img
          className="h-10 w-10 sm:h-14 sm:w-14 hover:opacity-80 transition-opacity ease-in-out duration-200"
          src={linkedin}
        />
      </a>
      <a href="https://moe1011.github.io/" target={"_blank"}>
        <img
          className="h-10 w-10 sm:h-14 sm:w-14 hover:opacity-80 transition-opacity ease-in-out duration-200 Portfolio"
          src={portfolio}
        />
      </a>
    </div>
  );
}
