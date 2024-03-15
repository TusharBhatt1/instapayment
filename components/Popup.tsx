"use client";
import React, { useState } from "react";
import {
  AiFillCode,
  AiOutlineLink,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { RiHistoryLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function Popup() {
  const [show, setShow] = useState(true);
  const contact = [
    {
      icon: <AiOutlineLink size={22} />,
      link: "https://new-portfolio-theta-jade.vercel.app/",
    },

    {
      icon: <AiOutlineMail size={22} />,
      link: "mailto:tusharbhatt0135@gmail.com",
    },
    {
      icon: <AiOutlineLinkedin size={22} />,
      link: "https://www.linkedin.com/in/tushar-bhatt-59b64623b",
    },
  ];
  const features = [
    {
      icon: <AiFillCode />,
      title: "Modern Tech Stacks",
      description: "NextJS , Typescript and Zustand",
    },
    {
      icon: <VscChecklist className="text-blue-500" />,
      title: "All Wishlists",
      description: "Similar to Groww.in , to manage items.",
    },
    {
      icon: <RiHistoryLine className="text-green-500" />,
      title: "LRU Caching",
      description: "Efficiently store and retrieve recently viewed items.",
    },
  ];

  if (show) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white flex  flex-col gap-4 rounded-lg shadow-lg p-6 max-w-md z-50">
          <div className="flex items-center justify-between  text-center">
            <h2 className="text-2xl font-bold mb-4">What makes it unique</h2>
            <button onClick={() => setShow(false)}>
              <IoMdClose size={22} />
            </button>
          </div>
          <ul className="list-disc pl-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center mb-3 gap-3">
                <span className="text-xl mr-2">{feature.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center py-4 flex flex-col items-center justify-center gap-4">
            <span className="text-gray-800 font-semibold">
              Crafted by <span className="text-lg">Tushar Bhatt</span>
            </span>
            <div className="flex gap-4">
              {contact.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className="hover:text-blue-500 transition duration-300"
                  target="_blank"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>
    );
  }
}
