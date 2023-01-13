const { atom } = require("recoil");

const adjustItemsAtom = atom({
    key: 'adjust-items-atom',
    default: [
        {value: 'A', name: '전체'},
        {value: 'POST', name: '포스팅'},
        {value: 'COMMENT', name: '댓글'},
        {value: 'REPLY', name: '답글'},
    ]
})

export default adjustItemsAtom;