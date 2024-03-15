//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { cardsConfig } from "@/Others/CardsConfig";
import { UPIConfig } from "@/Others/UPIConfig";

// function isEmptyObject(obj) {
//   for (var key in obj) {
//       if (obj.hasOwnProperty(key)) {
//           return false;
//       }
//   }
//   return true;
// }

export default function PaymentForm({paymentMethod,grandTotal}:{paymentMethod:string,grandTotal:number}) {
  const [errors,setErrors]=useState({})
  const [values,setValues]=useState({})
  const [isProcessing, setIsProcessing] = useState(false);
  const isValid = () =>{
    let valid = true
    const config = paymentMethod==='UPI' ? UPIConfig : cardsConfig
    config?.forEach((row)=>{
        const name: any = row?.name;
        if(errors[name] || !values[name]) {
          valid=false
        }
      })
   
    return valid
  }
  const router = useRouter();
  const unAuth = () => {
    router.push("/checkout/details");
    toast.error("Need details first");
    return;
  }




useEffect(()=>{
  setValues({})
  setErrors({})
},[paymentMethod])

const onSubmit=()=>{
  setIsProcessing(true)
  setTimeout(()=>router.push("/confirmation"),2000) 
}

  return (
    <div>
      <div className="flex flex-col justify-center items-center rounded-md py-4 gap-4 bg-slate-50">
      
        {paymentMethod === "UPI" && (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {UPIConfig?.map((row, id) => {
              const name: any = row?.name;
              const prop = {
                value:values[name] || '',
                onChange: (e: any) => {
                  const val = e.target.value
                  setValues({...values,[name]:val})
                  if(!row.onValidate(val)){
                    setErrors({...errors,[name]:{message:row?.errorMessage}})
                  }else{
                    setErrors({...errors,[name]:null})
                  }
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
                  value:values[name] || '',
                  onChange: (e: any) => {
                    const val = e.target.value
                    setValues({...values,[name]:val})
                    if(!row.onValidate(val)){
                      setErrors({...errors,[name]:{message:row?.errorMessage}})
                    }else{
                      setErrors({...errors,[name]:null})
                    }
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
          onClick={onSubmit}
          label={`Pay ₹ ${grandTotal}`}
          disabled={!isValid()}
          isProcessing={isProcessing}
          
        />
      </div>
    </div>
  );
}
