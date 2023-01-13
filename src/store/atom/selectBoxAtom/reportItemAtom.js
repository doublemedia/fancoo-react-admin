const { atom } = require("recoil");


const reportItemAtom = atom({
    key:'report-item-atom',
    default: [
        {value:'A' ,name: '전체'},
        {value:'warning' ,name: '경고'},
        {value:'restriction' ,name: '이용제한'},
        {value:'ban' ,name: '이용정지'},
    ]
})

export default reportItemAtom;