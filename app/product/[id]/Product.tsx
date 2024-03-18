"use client";

import { ProductType } from "@/@types";
import Spinner from "@/Others/Spinner";
import { getProductDetails } from "@/fetch/getProductDetails";
import useLRU from "@/hooks/useLRU";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicProductDetails = dynamic(() => import("./ProductDetails"), {
  loading: () => (
    <div className="h-[50vh] w-[60vw] flex justify-center items-center">
      <div>
        <Spinner />
      </div>
    </div>
  ),
});

export default function Product({ id }: { id: number }) {
  const [details, setDetails] = useState<ProductType>();
  const { cache, setItem } = useLRU();

  const fetchData = async (id: any) => {
    const data = await getProductDetails(id);
    setDetails(data);
    setItem(`${id}`, data);
  };

  const getData = (id: number) => {
    //@ts-ignore
    const cachedItem = cache.find((item) => item.key === `${id}`);

    if (cachedItem) {
      setDetails(cachedItem.value);
      return;
    } else fetchData(id);
  };
  useEffect(() => {
    getData(id);
  }, []);

  if (!details) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4 w-60">
          <div>
            <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
            <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
          </div>
          <div className="h-7 bg-slate-400 w-full rounded-md"></div>
          <div className="h-7 bg-slate-400 w-full rounded-md"></div>
          <div className="h-7 bg-slate-400 w-full rounded-md"></div>
          <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
        </div>
      </div>
    );
  }
  return (
    details && (
      <div className="p-7">
        <DynamicProductDetails details={details} />
      </div>
    )
  );
}