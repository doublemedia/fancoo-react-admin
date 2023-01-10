import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined

const {persistAtom} = recoilPersist({
    key: 'persist-user-atom',
    storage: localStorage,
});

const userAtom = atom({
    key:"user",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export default userAtom;