import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { useRecoilState } from 'recoil';
import userAtom from 'src/store/atom/userAtom';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/config/propertySetting';
import { useMutation } from 'react-query';
import { LOGOUT } from 'src/api/end-point/auth';
import { LOGOUT_KEY } from 'src/api/key/auth';
import instance from 'src/api/api';
import userInfo from 'src/hooks/userInfo';
import { PATH_AUTH } from '../../../routes/paths';
// auth
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: '내정보',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  
  const [user] = useRecoilState(userAtom);
  const [mounted, setMounted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const { refetch } = userInfo();
  const User = userInfo();
  const [openPopover, setOpenPopover] = useState(null);

  useEffect(()=> {
    User; 
    setMounted(true);
  },[User]);

  /**
   * 로그아웃 값제거
   */
  const clearCookie = async () => {
    window.localStorage.removeItem('persist-user-atom');
    window.localStorage.removeItem('persist-menu-atom');
    window.localStorage.removeItem('persist-auth-menu-atom');
    Cookies.remove(ACCESS_TOKEN);
  //  Cookies.remove(CHAT_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  };

  /**
   * 로그아웃 
   */
  const logoutFunc = async () => {
    await clearCookie();
  };

  /**
   * 로그아웃API
   */
  const LogoutQuery = useMutation([LOGOUT_KEY],
    async () => await instance.post(LOGOUT), {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        logoutFunc();
      }
  })

  /**
   * 아이콘 클릭시 소메뉴 닫기
   */
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  /**
   * 아이콘 클릭시 소메뉴 열기
   */
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  /**
   * 로그아웃이벤트
   */
  const handleLogout = async () => {
    try {
      LogoutQuery.mutate();
      handleClosePopover();
      navigate(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  /**
   * 목록 이벤트
   * @param {string} path 경로
   */
  const handleClickItem = (path) => {
    handleClosePopover();
    
    navigate(path);
  };


  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {mounted && (<CustomAvatar src={user?.profileimg_url} alt={user?.name} name={user?.name} />)} 
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.login_id}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
