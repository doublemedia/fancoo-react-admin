const { atom } = require("recoil");

const periodItemAtom = atom ({
    key: '',
    default: [
        {value:'A' ,name: '전체'},
        {value:'0' ,name: '없음'},
        {value:'3' ,name: '3일'},
        {value:'7' ,name: '7일'},
        {value:'30' ,name: '30일'},
        {value:'36500' ,name: '영구정지'},        
    ]
})

export default periodItemAtom;