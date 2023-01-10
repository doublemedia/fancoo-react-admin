import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import userAtom from 'src/store/atom/userAtom';
import menuAtom from 'src/store/atom/menuAtom';
// components
import { useQuery } from 'react-query';
import { MENU_KEY } from 'src/api/key/auth';
import {LOGIN, LOGOUT, ME, MENU} from 'src/api/end-point/auth'
import instance from 'src/api/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/config/propertySetting';
import { useNavigate } from 'react-router';
import authMenuAtom from 'src/store/atom/authMenuAtom';
import Iconify from '../../components/iconify';
// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  // const { login } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authMenu, setAuthMenu] = useRecoilState(authMenuAtom)
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [user, setUser] = useRecoilState(userAtom);


  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  // const onSubmit = async (data) => {
  //   try {
  //     await login(data.email, data.password);
  //   } catch (error) {
  //     console.error(error);

  //     reset();

  //     setError('afterSubmit', {
  //       ...error,
  //       message: error.message,
  //     });
  //   }
  // };

    const socialTest = () => {
    const url = 'https://dev-adminapi.fancoo.com/v1/admins/oauth/login';
    window.open(
      url,
      "WORKPLACE-LOGIN",
      {
        width: 500,
        height: 700,
      }
    )
    window.addEventListener("message", workplaceCallback, false);
  }

  async function workplaceCallback(e) {
    // eslint-disable-next-line no-constant-condition
    if (typeof e.data === 'string') {
      const data = JSON.parse(e.data.substring(16));
      console.log(data);
      Cookies.set(ACCESS_TOKEN, data.token.access_token);
      Cookies.set(REFRESH_TOKEN, data.token.refresh_token);
      console.log(data.userInfo);
      setUser(data.userInfo);

      menuQuery.refetch();
      window.removeEventListener("message", workplaceCallback);
    }
  }

  const authMenuEvent = (data) => {
    const authArray = [];
    for(let i=0; i<data.length; i++ ){
      for(let j=0; j<data[i].menus.length; j++ ){
        authArray.push(data[i].menus[j].path);
      }
    }
    setAuthMenu(authArray);
  }

  const menuQuery = useQuery(
    [MENU_KEY],
    async () => await instance.get(MENU),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: async (res) => {
        console.log(res);
        if(res.status === 200) {
          // 권한설정
          authMenuEvent(res.data.data);
          // 메뉴설정
          const array = [];
          for(let i=0; i<res.data.data.length; i++) {
            const obj = { 
              subheader : '',
              items: []
            }
            obj.subheader = res.data.data[i].title;
            const obj1 = {title: '', path: '', icon:'', children: []};
            obj1.title = res.data.data[i].title;
            if(obj1.title === '회원관리') {
              obj1.path = '/user';
            }else {
              obj1.path = '/';
            }

            
            for(let j =0; j<res.data.data[i].menus.length; j++) {
              const obj2 = {title: '', path: ''};
              if(res.data.data[i].menus[j].type ==="menu") {
                obj2.title = res.data.data[i].menus[j].sub_title;
                if(obj2.title === '회원목록'){
                  obj2.path = '/user/user';
                }else {
                  obj2.path = res.data.data[i].menus[j].path;
                }
               
                obj1.children.push(obj2);
              }
            }
            obj.items.push(obj1);
            array.push(obj);
            
          }
          setMenu(array);
          
        //  await login(email,pw);
          
          navigate('/user/user');
          // console.log(menu);
        //  router.push(array[0].items[0].children[0].path);
        }
      }
    }
  )

  const onLogin = async (data) => {
    try {
    //  await login(email);
   // await login(email,pw);
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };



  return (
    <>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <TextField
         
         fullWidth
         onChange={(e) => setEmail(e.currentTarget.value)}
         />
         <TextField
         
         fullWidth
         onChange={(e) => setPw(e.currentTarget.value)}
         // value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
         // error={!!error}
         // helperText={error ? error?.message : helperText}
         // {...other}
         InputProps={{
           endAdornment: (
             <InputAdornment position="end">
               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                 <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
               </IconButton>
             </InputAdornment>
           ),
         }}
       />
      </Stack>

       <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link variant="body2" color="inherit" underline="always">
          Forgot password?
        </Link>
      </Stack>
          
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        onClick={() => {
          onLogin();
        }}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Login
      </LoadingButton>
        <br />
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        onClick={() => {
          socialTest();
        }}
        sx={{
          bgcolor: 'green',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'teal',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        소셜로그인
      </LoadingButton>
    </>
  );
}
