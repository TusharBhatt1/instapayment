//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import {
  paymentSchema,
  PaymentSchemaType,
} from "../../Others/validations/paymentSchema";
import { cardsConfig } from "@/Others/CardsConfig";
import { UPIConfig } from "@/Others/UPIConfig";


export default function PaymentForm({paymentMethod,grandTotal}:{paymentMethod:string,grandTotal:number}) {

  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    clearErrors,
  } = useForm<PaymentSchemaType>({
    resolver: yupResolver(paymentSchema),
  });

  useEffect(() => {
    //@ts-ignore
    setValue("paymentMode", "UPI");


    // if (userdetails.name === "") {
    //   unAuth();
    // }
  }, []);
  const unAuth = () => {
    router.push("/checkout/details");
    toast.error("Need details first");
    return;
  }

//   const handleSelectMethod = (method: "UPI" | "CARDS") => {
//     setPayMethod(method);
//     setPaymentMethod(method);
//     //@ts-ignore
//     setValue("paymentMode", method);
//     clearErrors();
//   };

useEffect(()=>{
setValue("paymentMode",paymentMethod)
clearErrors()
},[paymentMethod])

  const onSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
     alert("Done");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center rounded-md py-4 gap-4">
        

        {paymentMethod === "UPI" && (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {UPIConfig?.map((row, id) => {
              const name: any = row?.name;
              const prop = {
                onChange: (e: any) => {
                  //@ts-ignore
                  setValue(name, e?.target?.value);
                  trigger(name);
                },
                ...row,
              };

              return <Input key={id} error={errors[name]?.message} {...prop} />;
            })}
          </div>
        )}

        {paymentMethod === "Cards" && (
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex flex-col md:flex-row gap-4">
              {cardsConfig?.map((row, id) => {
                const name: any = row?.name;
                const prop = {
                  onChange: (e: any) => {
                    //@ts-ignore
                    setValue(name, e?.target?.value);
                    trigger(name);
                  },
                  ...row,
                };

                return (
                  <Input key={id} error={errors[name]?.message} {...prop} />
                );
              })}
            </div>
          </div>
        )}
        
        <Button
          type="submit"
          label={`Pay ₹ ${grandTotal}`}
          disabled={!isValid}
          isProcessing={isProcessing}
        />
      </div>
    </form>
  );
}
