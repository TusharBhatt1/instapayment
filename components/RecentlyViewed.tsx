"use client";
import useLRU from "@/hooks/useLRU";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import ProductCard from "./ProductCard";
import { usePathname } from "next/navigation";

export default function RecentlyViewed() {
  const { cache } = useLRU();
  const [showFiltered, setShowFiltered] = useState(false);
  const path = usePathname();
  const params = path.split("/");
  const recentCacheId = params[params.length - 1];

  useEffect(() => {
    if (recentCacheId === cache[0]?.id) {
      setShowFiltered(true);
    } else {
      setShowFiltered(false);
    }
  }, [cache, recentCacheId]);

  let displayedCache = showFiltered
    ? cache.filter((cacheItem) => cacheItem.id !== recentCacheId)
    : cache;

  if (displayedCache.length > 0) {
    return (
      <div className="flex flex-col gap-4 px-12 mb-7">
        <Heading title="Recently Viewed" />
        <div className="flex items-center flex-wrap gap-12">
          {displayedCache.map((product) => (
            <div key={product.id}>
              <ProductCard product={product.value} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
