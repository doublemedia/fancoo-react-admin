const { atom } = require("recoil");

const dateItemAtom = atom({
    key: 'date-item-atom',
    default: [
        {value:'register' ,name: '제제일'},
        {value:'begin' ,name: '제제시작일'},
    ]
})

export default dateItemAtom;