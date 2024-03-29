export const cardsConfig = [
    {
      name: "cardNumber",
      label: "Card Number",
      placeholder: "XXXX-XXXX-XXXX-XXXX",
      errorMessage:'Invalid CardNumber, only 16 digits',
      type: "",
      onValidate:(cardNumber:string)=>{
        try{
            if(cardNumber && cardNumber?.length==16){
                parseInt(cardNumber)    
                return true
            }
        }
        catch{
            return false
        }
        return false
      }

    },
    {
      name: "cvvNum",
      label: "CVV",
      placeholder: "Enter CVV",
      type: "password",
      errorMessage:'Invalid CVV , only digits',

      onValidate:(cvv:string)=>{
        try{
            if(cvv && cvv?.length==3){
                parseInt(cvv)    
                return true
            }
        }
        catch{
            return false
        }
        return false
      }
    },
  ];