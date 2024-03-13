import {create} from "zustand"

interface CartModal{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

const useCartModal=create<CartModal>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useCartModal 