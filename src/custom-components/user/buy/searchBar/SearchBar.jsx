import React, { useState } from "react";
import { adultType, buyStatus, dateType, itemType, searhType } from "src/config/selectbox/user/users";
import UserSelectBox from "src/custom-components/common/UserSelectBox";
import UserTextBox from "src/custom-components/common/UserTextBox";

const SearchBar = () => {

    const [searchName, setSearchName] = useState('');

    const [searchRole, setSearchRole] = useState(searhType[0]);
    const searchItems = searhType;
    const handleSearchRole = (e) => {
        setSearchRole({value:e.target.value, name: e.target.name});
    };
    const [dateRole, setDateRole] = useState(dateType[0]);
    const dateItems = dateType;
    const handleDateRole = (e) => {
        setDateRole({value:e.target.value, name: e.target.name});
    };

    const [adultRole, setAdultRole]= useState(adultType[0]);
    const adultItmes = adultType;
    const handleAdultRole = (e) => {
        setAdultRole({value:e.target.value, name: e.target.name});
    }
    
    const [itemRole, setItemRole] = useState(itemType[0]);
    const itemItems = itemType;
    const handleItemRole = (e) => {
        setItemRole({value:e.target.value, name: e.target.name});
    }

    const [buyRole, setBuyRole] = useState(buyStatus[0]);
    const buyItems = buyStatus;
    const handleBuyRole = (e) => {
        setBuyRole({value:e.target.value, name: e.target.name});
    }

    return (
        <>
            <UserSelectBox
                labelText='검색어'
                widthSize={150}
                filterRole={searchRole}
                optionsRole={searchItems}
                onFilterRole={handleSearchRole}
            />
            <UserTextBox
                placeholder="검색어입력"
                widthSize={250}
                filterName={searchName}
                onFilterName={setSearchName}
                // onFilterName={handleSearchName}
            />
            <UserSelectBox
                labelText='일자'
                widthSize={150}
                filterRole={dateRole}
                optionsRole={dateItems}
                onFilterRole={handleDateRole}
            />
            <UserSelectBox
                labelText='성인콘텐츠'
                widthSize={150}
                filterRole={adultRole}
                optionsRole={adultItmes}
                onFilterRole={handleAdultRole}
            />
            <UserSelectBox
                labelText='상품종류'
                widthSize={150}
                filterRole={itemRole}
                optionsRole={itemItems}
                onFilterRole={handleItemRole}
            />
            <UserSelectBox
                labelText='상태'
                widthSize={150}
                filterRole={buyRole}
                optionsRole={buyItems}
                onFilterRole={handleBuyRole}
            />
        </>
    )

}

export default SearchBar;