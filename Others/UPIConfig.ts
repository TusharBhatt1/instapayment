export const UPIConfig = [
    {
      name: "holderName",
      label: "Holder Name",
      placeholder: "Enter Holder Name",
      type: "text",
      onValidate: (e: string) => {
        const regex = /^[a-zA-Z]+$/;
        if (e && e.length >= 5) {
          return regex.test(e);
        }
      
        return false;
      },
      errorMessage:'Only alphabets and min length 5',

    },
    {
      name: "upiAddress",
      label: "UPI ID",
      placeholder: "Enter UPI ID",
      type: "text",
      errorMessage:'Invalid ex: xyz@oksbi',

      onValidate:(upiAddress:string)=>{
        const regex = /^[\w.-]+@[\w.-]+$/;
    if (!regex.test(upiAddress)) {
        return false;
    }
       return true;
      }
    },
  ];
  