import { ProductType } from "@/@types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ResultProps{
  filteredResult:ProductType[],
  setShowResult:(value:boolean)=>void
}
export default function SearchResult({
  filteredResult,
  setShowResult

}:ResultProps) {
  if (filteredResult.length === 0) {
    return (
      <div className="max-h-40 w-full shadow-sm rounded-md bg-slate-50 text-black z-30 p-3 overflow-y-auto">
        <div className="flex flex-col text-xs">
          <p>Currently no result</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-h-40 w-full text-xs rounded-md shadow-sm bg-slate-50 text-black z-30 p-3 overflow-y-auto">
      <div className="flex flex-col gap-3 p-1">
        {filteredResult.map((p) => (
          <Link
            href={`/product/${p.id}`}
            key={p.id}
            className="p-2 text-sm hover:bg-white"
            onClick={()=>setShowResult(false)}
          >
            <div className="flex items-center gap-2">
            <Image src={p.image} height={14} width={14} alt={p.title}/>
            {p.title.split(" ").slice(0, 4).join(" ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
