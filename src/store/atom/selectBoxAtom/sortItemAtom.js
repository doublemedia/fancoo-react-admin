import { atom } from "recoil"


const sortItemAtom = atom({
    key: 'sort-item-atom',
    default: [
        {value: 'register', name: '제재일'},
        {value: 'begin', name: '제재시작일'},
        {value: 'expire', name: '기간'},
    ]
})
export default sortItemAtom