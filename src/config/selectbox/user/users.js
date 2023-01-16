export const searhType = [
    {value:'profile_id' ,name: '프로필아이디'},
    {value:'nick' ,name: '닉네임'},
    {value:'item_idx' ,name: '콘텐츠코드'},
];
export const dateType = [
    {value:'buy' ,name: '구매일'},
    {value:'cancel' ,name: '취소일'},
];
export const adultType = [
    {value:'A' ,name: '전체'},
    {value:'Y' ,name: '성인'},
    {value:'N' ,name: '미성년'},
];

export const itemType = [
    {value:'A' ,name: '전체'},
    {value:'CONTENT' ,name: '콘텐츠'},
    {value:'SPON' ,name: '후원'},
    {value:'PAYPOST' ,name: '유료포스트'},
];

export const buyStatus = [
    {value:'A' ,name: '전체'},
    {value:'Y' ,name: '정상'},
    {value:'N' ,name: '구매취소'},
];

export const paramType = {
    buy_profile_id: '',  
    offset: 0,
    limit: 20,
    date_type: 'buy',
    sort: 'buy',
    item_type:'',
    buy_status:'',
    sell_profile_adult_yn:'',
    end_date:'',
    start_date:'',
}