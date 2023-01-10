import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined

const {persistAtom} = recoilPersist({
    key: 'persist-menu-atom',
    storage: localStorage,
});

const menuAtom = atom({
    key:'menu',
    default: [
        {
        subheader: '',
        items: [
                {title: '', path: '', icon: ''},
              ]
        }

    ],
    effects_UNSTABLE: [persistAtom],
})

export default menuAtom;