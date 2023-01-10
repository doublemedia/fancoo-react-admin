import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined

const {persistAtom} = recoilPersist({
    key: 'persist-auth-menu-atom',
    storage: localStorage,
});

const authMenuAtom = atom({
    key:'auth-menu',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export default authMenuAtom;