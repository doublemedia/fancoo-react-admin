import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import menuAtom from "src/store/atom/menuAtom";


export default function GuestGuard({ children }) {
    const menu = useRecoilValue(menuAtom);
    const menuInfo = window.localStorage.getItem('persist-auth-menu-atom');
    const userInfo = window.localStorage.getItem('persist-user-atom');
    if(menuInfo !== null && userInfo !== null) {
        const move = menu[0].items[0].children[0].path;
        return <Navigate to={move} />;
    }
    return <> {children} </>;

}