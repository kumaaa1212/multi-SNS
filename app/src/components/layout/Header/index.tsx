import Link from "next/link";
import React from "react";
import Logo from "../../../../public/logo.png";
import Image from "next/image";
const Header = () => {
  return (
    <header className="header">
      <nav className="header_nav">
        <Link href={""}>
          <Image src={Logo} alt={""} />
        </Link>
        <div className="header_nav_link">
          <Link href={""} className="nav_link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-map-search"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#009988"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v8" />
              <path d="M9 4v13" />
              <path d="M15 7v5" />
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M20.2 20.2l1.8 1.8" />
            </svg>
          </Link>
          <Link href={""} className="nav_link">
            HOME
          </Link>
          <Link href={""} className="nav_link">
            チャット
          </Link>
          <Link href={""} className="nav_link">
            掲示板
          </Link>
          <Link href={""} className="nav_link">
            クラブ
          </Link>
          <Link href={""} className="nav_link">
            マイページ
          </Link>
          <Link href={""} className="nav_link">
            設定
          </Link>
        </div>
      </nav>
      <div></div>
    </header>
  );
};

export default Header;
