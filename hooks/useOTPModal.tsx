import {create} from "zustand"

interface OTPModal{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

const useOTPModal=create<OTPModal>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useOTPModal 