export default class DateManager {
    static convert = (dateData, type) => {
        console.log(dateData);
        const date =  new Date(dateData);
        if(type==='yyyy-mm-dd') {
            return `${date.getFullYear()  }-${  date.getMonth()+1 < 10 ?  `0${date.getMonth() + 1}` : date.getMonth() + 1 }-${  date.getDate() <10 ? `0${date.getDate()}`: date.getDate()}`;
        }if(type==='yyyy/mm/dd') {
            return `${date.getFullYear()  }/${  date.getMonth()+1  < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1 }/${  date.getDate() <10 ? `0${date.getDate()}`: date.getDate()}`;
        }
        return 0;
    }
}