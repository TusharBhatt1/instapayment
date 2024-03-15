import {create} from "zustand"

interface Intro{
    isOpen:boolean,
    onClose:()=>void
}

const useIntro=create<Intro>((set)=>({
    isOpen:true,
    onClose:()=>set({isOpen:false})
}))

export default useIntro 