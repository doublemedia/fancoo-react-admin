const {atom} = require("recoil");

const violationItemAtom =  atom({
    key: 'violation-atom',
    default: [{value:'1' ,name: '선택'}],
})

export default violationItemAtom;