import { useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import authMenuAtom from "src/store/atom/authMenuAtom";


export default function AuthGuard({ children }) {
    const authMenu = useRecoilValue(authMenuAtom);
    const { pathname } = useLocation();
    let type = useMemo(()=> (false),[]);
    console.log('Checked');
    if(pathname.charAt(pathname.length-1) === '/') {
        pathname.slice(0,-1);
        type = true;
    }else {
        type = false;
    }

    if((!type && !authMenu.includes(pathname)) || (type && !authMenu.includes(pathname))) {
        if(pathname==='/user/user'|| pathname==='/user/user/') {
            return <> {children} </>;
        }
        console.log('권한없음');
        return <Navigate to="/404" replace />
    }
    return <> {children} </>;

}