import { ProductType } from "@/@types";
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
      <div className="max-h-40 w-full shadow-sm bg-slate-50 text-black z-30 p-2 overflow-y-auto">
        <div className="flex flex-col">
          <p>No result</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-h-40 w-full shadow-sm bg-slate-50 text-black z-30 p-2 overflow-y-auto">
      <div className="flex flex-col">
        {filteredResult.map((p) => (
          <Link
            href={`/product/${p.id}`}
            key={p.id}
            className="p-2 text-sm hover:bg-slate-50"
            onClick={()=>setShowResult(false)}
          >
            {p.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
