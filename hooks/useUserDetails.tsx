import { create } from "zustand";

interface UserDetails {
    user: {
        name: string | null;
        num: number | null;
        alt_num: number | null;
        address: string | null;
        email: string | null;
    };
    setUserDetails: (key: string, value: any) => void;
}

const useUserDetails = create<UserDetails>((set) => ({
    user: {
        name: null,
        num: null,
        alt_num: null,
        address: null,
        email:null
    },
    setUserDetails: (key, value) => set((state) => ({
        user: {
            ...state.user,
            [key]: value,
        },
    })),
}));

export default useUserDetails;
