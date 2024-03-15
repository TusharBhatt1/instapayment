"use client";
import React, { useState } from "react";
import { ProductType } from "@/@types";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import dynamic from "next/dynamic";

import { FiLoader } from "react-icons/fi";
import useAllProducts from "@/hooks/useAllProducts";

const DynamicSearchResult = dynamic(() => import("./SearchResult"));



export default function SearchBar() {
  const {allProducts}=useAllProducts()
  const [isSearching, setIsSearching] = useState(false);
  const [alreadysearched, setAlreadysearched] = useState<string[]>([]);
  const [query , setQuery]=useState("")

  const [showResult, setShowResult] = useState(false);
  const [filteredResult, setFilteredResults] =
    useState<ProductType[]>(allProducts);

  const filterResult = (query: string) => {
    setFilteredResults(
      allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    setQuery(input)
    if(input==="") {
      setFilteredResults(allProducts)
      return
    }
    if (alreadysearched.includes(input.replaceAll(" ", ""))) {
      filterResult(input);
      setIsSearching(false);
    } else if (input.charAt(input.length - 1) !== " ") {
      alreadysearched.push(input);
      input = input.replaceAll(" ", "");
      filterResult(input);
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 1000);
    } else setIsSearching(false);
  };


  const handleCloseSearch=()=>{
    setShowResult(false)
    setQuery("")
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-md mx-auto relative">
        <div className=" flex justify-center items-center">
          <div className="absolute left-3">
            <AiOutlineSearch size={20} />
          </div>
          <input
            onFocus={() => setShowResult(true)}
            onChange={handleChange}
            value={query}
            onBlur={()=>setShowResult(false)}
            type="text"
            placeholder="What are you looking for today ?"
            className="w-[32vw] p-3 px-10 shadow-md rounded-full focus:outline-none "  />
         
          {isSearching && (
            <div className="absolute right-8 animate-spin">
              <FiLoader />
            </div>
          )}
           {showResult && (
            <div className="absolute right-2 hover:bg-slate-100 rounded-full cursor-pointer">
              <AiOutlineClose size={22} onClick={handleCloseSearch} />
            </div>
          )}
          
        </div>
        <div className="w-full absolute h-full">
          {showResult && (
            <DynamicSearchResult filteredResult={filteredResult} setShowResult={setShowResult}  />
          )}
        </div>
      </div>
    </div>
  );
}

  
//   const handleChangeBetter=myDebounce(handleChange)

// const myDebounce = (cb: any) => {
//     let timer: ReturnType<typeof setTimeout>;

//     return function (e: React.ChangeEvent<HTMLInputElement>) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => cb(e), 1000); 
//     };
// };
