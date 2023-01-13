import { atom } from "recoil";

const categoryItemsAtom = atom({
    key: 'category-items-atom',
    default: [
        {value:'1' ,name: '선택'},
        {value:'2' ,name: '음란물'},
        {value:'3' ,name: '폭력성·잔혹성·혐오성'},
        {value:'4' ,name: '사회통합 및 사회질서를 저해'},
    ]
})

export default categoryItemsAtom;