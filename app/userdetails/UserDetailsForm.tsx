"use client";

import Button from "@/components/Button";
import { UserSchemaType, userSchema } from "@/Others/validations/userSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import { formConfig } from "@/Others/formConfig";
import { useRouter } from "next/navigation";
import useUserDetails from "@/hooks/useUserDetails";


export default function UserDetailsForm() {

  const {
    handleSubmit,
    formState: { errors , isValid },
    setValue,
    trigger,
  } = useForm<UserSchemaType>({
    resolver: yupResolver(userSchema),
  });

  const router = useRouter();

  const { setUserDetails } = useUserDetails();
  const onSubmit = (data: UserSchemaType) => {

    const { name, address, email, contact } = data;

    setUserDetails("name", name);
    setUserDetails("email", email);
    setUserDetails("address", address);
    setUserDetails("alt_num", contact);
    setUserDetails("email", email);

    toast.success("Accepted, just a moment!");
    router.push("/payment");
  };
  return (
    <div className="flex justify-center items-center sm:p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-50 rounded-lg p-3">
        <p className="text-lg font-bold text-center">Enter Details</p>
        <div className="max-w-xl flex flex-wrap p-4 justify-center items-center rounded-md  gap-2">
          {formConfig?.map((row, id) => {
            const name: any = row?.name;
            const prop = {
              onChange: (e: any) => {
                setValue(name, e?.target?.value);

                trigger(name);
              },
              ...row,
            };

            return (
              //@ts-ignore
              <Input key={id} error={errors[name]?.message} {...prop} />
            );
          })}
          <Button disabled={isValid} label="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
}
