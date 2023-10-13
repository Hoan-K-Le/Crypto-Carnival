"use client";
import React, { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import CustomSelect from "../Inputs/CustomSelect";
import ThemeButton from "../Buttons/Theme/Theme";
import Icon from "../Icon/Icon";
import PageLink from "../links/PageLink";
import FormInput from "../Inputs/FormInput";
import { getLocalStorage, setLocalStorage } from "@/app/utilities/localStorage";

const NavBar = () => {
  const [query, setQuery] = useState<string>("");
  const [list, setList] = useState<[]>([]);
  const [activePage, setActivePage] = useState<string>(
    getLocalStorage("active") || "coinsLink"
  );
  const pages = [
    {
      id: "coinsLink",
      href: "/",
      text: "Home",
    },
    {
      id: "portfolioLink",
      href: "../pages/Portfolio",
      text: "Portfolio",
    },
  ];
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
      );
      const filterList = data.filter((coinName: any) => {
        return coinName.name.toLowerCase().includes(query.toLowerCase());
      });
      setList(filterList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value !== "") {
      fetchData();
    } else {
      setList([]);
    }
  };

  const getDiffIcons = (id: string) => {
    if (id === "coinsLink") {
      return activePage !== "portfolioLink" ? "homeSolid" : "home";
    } else if (id === "portfolioLink") {
      return activePage === "portfolioLink" ? "portfolioSolid" : "portfolio";
    }
    return "";
  };
  useEffect(() => {
    setLocalStorage("active", activePage);
    fetchData();
  }, [activePage]);
  return (
    <nav className="font-medium shadow-xs bg-white p-4 dark:bg-[#13121A] dark:text-[#ffffff] flex items-center justify-around pt-4 text-lg ">
      <div className="flex items-center gap-2">
        <img
          className="h-[50px] w-[50px]"
          src="http://placeholder.com/200/300"
          alt="logo"
        />
        <span className="text-[#353570] dark:text-[#ffffff] font-bold">
          CryptoAlert
        </span>
      </div>
      <div className="text-1xl flex gap-4">
        {pages &&
          pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className="flex gap-2"
            >
              <PageLink
                className={`flex items-center  dark:text-[#FFFFFF] text-[#353570] ${
                  activePage === page.id
                    ? "font-semibold dark:text-[#FFFFFF]"
                    : "font-extralight "
                }`}
                id={page.id}
                href={page.href}
                text={page.text}
              >
                <Icon
                  iconVariant={getDiffIcons(page.id)}
                  className={`mr-1 text-xl`}
                />
              </PageLink>
            </button>
          ))}
      </div>
      <form
        className=" flex items-center gap-5"
        onSubmit={handleSubmit}
        action=""
      >
        <div className="relative flex items-center">
          <Icon
            className="text-xl text-[#D1D1D1] absolute ml-2.5 dark:text-white dark:text-opacity-40"
            iconVariant="search"
          />
          <FormInput
            label="Search"
            id="search"
            type="text"
            name="search"
            placeholder="Search..."
            onChange={handleChange}
          />
          <div className="flex flex-col absolute top-16 h-72  scrollbar-thin scrollbar-slate700 overflow-y-auto">
            {query === ""
              ? ""
              : list
                  .filter((coin, i) => i < 10)
                  .map((coin: any, i) => (
                    <ul
                      key={coin.id}
                      className=" flex items-center justify-center flex-col"
                    >
                      <PageLink href={`../CoinDetail/${coin.id}`}>
                        <li>{coin.name}</li>
                      </PageLink>
                    </ul>
                  ))}
          </div>
        </div>
        <CustomSelect />
        <ThemeButton />
      </form>
    </nav>
  );
};

export default NavBar;
