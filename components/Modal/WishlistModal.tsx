"use client";
import React, { useCallback, useEffect, useMemo, useState, use } from "react";
import Modal from "./Modal";
import useWishListModal from "@/hooks/useWishlistModal";
import { ProductType } from "@/@types";
import Input from "../Input";
import toast from "react-hot-toast";
import useAddToWishlist from "@/hooks/useAddToWishlist";
import useAllProducts from "@/hooks/useAllProducts";


enum STEPS {
  name = 0,
  items = 1,
  confirmation = 2,
}

export default function WishlistModal() {
  const {allProducts} = useAllProducts()
  const wishListModal = useWishListModal();
  const [currentWishList, setCurrentWishList] = useState({
    listName: "",
    listItems: [] as ProductType[],
  });
  const addToWishlist = useAddToWishlist();

  const [step, setStep] = useState(STEPS.name);

  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const [isCreated, setIsCreated] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [productsList, setProductsList] = useState<ProductType[]>([]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.confirmation) {
      return "Create";
    } else return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.name) {
      return undefined;
    } else return "Back";
  }, [step]);

  const secondaryAction = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (isError) {
      setIsError(false);
    }
    setCurrentWishList({
      ...currentWishList,
      [name]: e.target.value,
    });
  };

  const onModalClose = () => {
    setCurrentWishList({ listName: "", listItems: [] });
    setStep(STEPS.name);
    setIsError(false);
    wishListModal.onClose();
    setSelected({});
  };

  const onSubmit = () => {
    if (step !== STEPS.confirmation) {
      if (
        wishListModal.all_wishlists.some(
          (list) =>
            list.listName.replaceAll(" ","").toLowerCase() === currentWishList.listName.replaceAll(" ", "").toLowerCase()
        )
      ) {
        setIsError(true);
        setErrorMsg("Wishlist with same name already exists");
        return;
      }
      if (currentWishList.listName.replaceAll(" ","") .length === 0) {
        setIsError(true);
        setErrorMsg("Cannot Be Empty");
        return;
      }
      //ADD THE PENDING PRODUCT TO WISHLIST
      const productToAdd = addToWishlist.productToAdd;
      if (productToAdd.title && productToAdd.title.length > 0) {
        setSelected((prev) => ({
          [productToAdd.title]: true,
          ...prev,
        }));
        setProductsList((prev: any) => [
          ...(prev || null),
          addToWishlist.productToAdd,
        ]);
        //@ts-ignore
        addToWishlist.setProduct({});
      }
      setIsCreated(false);
      setStep(step + 1);
      return;
    }

    setIsError(false);

    setCurrentWishList((prev) => ({
      ...prev,
      listItems: productsList,
    }));

    setIsCreated(true);
  };
  useEffect(() => {
    if (isCreated) {
      wishListModal.setAllWishlists(currentWishList);
      setCurrentWishList({
        listName: "",
        listItems: [],
      });
      setSelected({});
      setStep(STEPS.name);
      setProductsList([]);
      toast.success("Wishlist Created");
      wishListModal.onClose();
    }
  }, [isCreated]);

  const handleSelect = (product: ProductType) => {
    if (selected[product.title]) {
      const updatedProductList = productsList.filter(
        (p) => p.title !== product.title
      );
      setProductsList(updatedProductList);
    } else {
      setProductsList((prev) => [...prev, product]);
    }

    setSelected((prev) => ({
      ...prev,
      [product.title]: !prev[product.title],
    }));
  };

  let bodyContent = (
    <div
      className="

        flex flex-col
        gap-4
        "
    >
      <Input
        label="Name"
        error={isError ? errorMsg : ""}
        name="listName"
        placeholder="Enter list name"
        value={currentWishList.listName}
        onChange={(e) => handleChange(e, "listName")}
      />
    </div>
  );

  if (step === STEPS.items) {
    bodyContent = (
      <div>
        <p className="text-center text-bold">Select Products</p>
        <div
          className="
           bg-slate-white rounded-xl
          flex flex-col gap-4
          p-4
          h-32
          overflow-y-auto"
        >
          {allProducts.map((product, index) => (
            <li
              className={`
            text-sm p-1 rounded-md
            ${selected[product.title] ? "bg-green-300" : "bg-slate-50"}
            cursor-pointer ${
              selected[product.title]
                ? "hover:bg-green-300"
                : "hover:bg-slate-100"
            }`}
              key={index}
              onClick={() => handleSelect(product)}
            >
              {product.title}
            </li>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.confirmation) {
    bodyContent = (
      <div className="p-2">
        <p className=" mb-2 text-center font-bold">
          <span className="text-slate-500 text-xs">Name :</span>{" "}
          {currentWishList.listName}
        </p>
        <hr></hr>
        <p className="mb-2 font-bold">
          <span className="text-slate-500 text-xs">Selected Items :</span>
        </p>
        
         {Object.keys(selected).length === 0 ?(
          <p className="text-sm text-slate-300 font-italic">None</p>
         )
         :
            <div>
            <ul className="list-disc">
              {Object.keys(selected).map(
                (item) => selected[item] && <li key={item}>{item}</li>
              )}
            </ul>
            </div>
          }
        
      </div>
    );
  }

  return (
    <Modal
      title="Create Wishlist"
      body={bodyContent}
      isOpen={wishListModal.isOpen}
      onClose={onModalClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryAction={secondaryAction}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
}
