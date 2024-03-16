//@ts-nocheck

import useUserDetails from "@/hooks/useUserDetails";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const EnterOtp = ({
  onClose,
  setShowEnterOTP,
}: {
  onClose: () => void;
  setShowEnterOTP: (v: boolean) => void;
}) => {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const router = useRouter();
  const { user } = useUserDetails();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    let value=e.target.value
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) {
      setTimeout(() => {
        router.push("/userdetails");
        onClose();
        toast.success("OTP Verified");
        setShowEnterOTP(false);
      }, 100);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col gap-3 text-center">
      <p className="text-lg font-bold">Enter OTP</p>
      <span className="text-xs font-bold">
        We have sent an OTP to {user.num?.toString().slice(0, 5)}XXXXX{" "}
      </span>
      <div className="flex justify-center gap-2 items-center">
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 text-center p-3 border-2 rounded-full border-black"
            />
          );
        })}
      </div>
      <p className="relative text-sm inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-black after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-black before:w-12 before:h-0.5">
        Any 4 Digits
      </p>
    </div>
  );
};

export default EnterOtp;
