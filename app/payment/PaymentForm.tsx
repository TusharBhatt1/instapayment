//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { cardsConfig } from "@/Others/CardsConfig";
import { UPIConfig } from "@/Others/UPIConfig";


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
      <div className="flex flex-col justify-center items-center rounded-md py-5 gap-7 sm:bg-slate-50">
      
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
                    if(name==="cardNumber" && val.length>16 || name==="cvvNum" && val.length>3) return
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
          
          onClick={onSubmit}
          label={`Pay ₹ ${grandTotal}`}
          disabled={!isValid()}
          isProcessing={isProcessing}
          
        />
      </div>
    </div>
  );
}
