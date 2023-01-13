const { atom } = require("recoil");

const searchTextAtom = atom({
    key:'search-text-atom',
    default: '',
    
})

export default searchTextAtom;