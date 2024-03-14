"use client";

import useAllProducts from "@/hooks/useAllProducts";
import ProductCard from "./ProductCard";
import useIntro from "@/hooks/useIntro";

export default function ProductListing() {
  const { isOpen } = useIntro();
  const { allProducts } = useAllProducts();
  if (!isOpen) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-12 sm:gap-7 my-4">
        {allProducts.map((product) => (
          <div>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    );
  }
}
