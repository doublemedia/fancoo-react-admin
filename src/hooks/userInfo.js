import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import instance from 'src/api/api';
import { ME } from 'src/api/end-point/auth';
import { ME_KEY } from 'src/api/key/auth';
import userAtom from 'src/store/atom/userAtom';

const userInfo = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useRecoilState(userAtom);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const USERINFO_QUERY = useQuery(
        [ME_KEY],
        async () => await instance.get(ME),
        {
            enabled: false,
            onSuccess: (res) => {
              console.log(res);
              console.log('User',res.data.data);
                setUser(res.data.data);
            },
            onError: (res) =>{
              console.log('UserInfoError',res);
            }
        }
    )
    return USERINFO_QUERY;
}

export default userInfo;