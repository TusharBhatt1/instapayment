import {
    RiUserLine,
    RiMapPinLine,
    RiPhoneLine,
    RiImageAddLine,
  } from "react-icons/ri";
  import { MdOutlineEmail } from "react-icons/md";
export const formConfig = [
    {
      name: "name",
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
      icon: RiUserLine,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "text",
      icon: MdOutlineEmail,
    },
    {
      name: "address",
      label: "Shipping Address",
      placeholder: "Enter your Address",
      type: "text",
      icon: RiMapPinLine,
    },
    {
      name: "contact",
      label: "Alternate Contact",
      placeholder: "Enter your contact",
      type: "",
      icon: RiPhoneLine,
    },
  ];
  