const { atom } = require("recoil");

  const searchItemsAtom = atom({
    key:'search-items-atom',
    default: [
        {value:'profile_id' ,name: '프로필아이디'},
        {value:'nick' ,name: '닉네임'},
        {value:'category' ,name: '분류'},
    ]
  })

  export default searchItemsAtom;