const { atom } = require("recoil")

const statusItemsAtom = atom({
    key: 'status-item-atom',
     default : [
        {value:'Y' ,name: '정상'},
        {value:'N' ,name: '삭제'},
    ]
})
    
export default statusItemsAtom;
    
   

