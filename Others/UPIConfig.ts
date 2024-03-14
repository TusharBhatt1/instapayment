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
      errorMessage:'Invalid holderName',

    },
    {
      name: "upiAddress",
      label: "UPI ID",
      placeholder: "Enter UPI ID",
      type: "text",
      errorMessage:'Invalid Upi Address',

      onValidate:(upiAddress:string)=>{
        const regex = /^[\w.-]+@[\w.-]+$/;
    if (!regex.test(upiAddress)) {
        return false;
    }
       return true;
      }
    },
  ];
  