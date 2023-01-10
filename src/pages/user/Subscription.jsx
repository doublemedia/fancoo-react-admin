// next
import { Box, Button, Card,Container, Stack, TextField } from '@mui/material';
// layouts
// components
import { useQuery } from 'react-query';
import { SUBSCRIBE_KEY, USERLIST_KEY } from 'src/api/key/userManagement';
import {  useEffect, useMemo, useState } from 'react';
import CustomBreadcrumbs from 'src/custom-components/custom-breadcrumbs/CustomBreadcrumbs';
import UserSelectBox from 'src/custom-components/common/UserSelectBox';
// import { TablePaginationCustom } from 'src/components/table';
import UserTextBox from 'src/custom-components/common/UserTextBox';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import SubUserGrid from 'src/custom-components/subscribe/SubUserGrid';
import DateManager from 'src/utils/DateManager';
import { DEFAULT_OFFSET, DEFAULT_PAGE_CNT } from 'src/config/pageSetting';
import AlertDialog from 'src/custom-components/dialog/AlertDialog';
import instance from 'src/api/api';
import { SUBSCRIBELIST, USERLIST } from 'src/api/end-point/userManagement';
import SubscribeGrid from 'src/custom-components/subscribe/SubscribeGrid';

// ----------------------------------------------------------------------

// Subscription.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Subscription() {
  const params = useMemo(()=>({
    profile_id: '',
    offset: 0,
    limit: 20,
    date_type : 'register',
    sort: 'register',
    adult_yn: '',
    status: '',
    end_date: '',
    start_date: '',
  }),[]);

  const dtParams = useMemo(()=> ({

  }),[]);

  const [open, setOpen] = useState(false);

  // 페이지 선택건수
  const [limit, setLimit] = useState(DEFAULT_PAGE_CNT);

  const [offset, setOffset] = useState(DEFAULT_OFFSET);

  const [dtLimit, setDtLimit] = useState(DEFAULT_PAGE_CNT);

  const [dtOffset, setDtOffset] = useState(DEFAULT_OFFSET);

  const [loadingFlg, setLoadingFlg] = useState(false);

  const [searchName, setSearchName] = useState('');

  const [searchRole, setSearchRole] = useState({value:'profile_id' ,name: '프로필아이디'});

  const searchItems = useMemo(()=> ([
    {value:'profile_id' ,name: '프로필아이디'},
    {value:'nick' ,name: '닉네임'},
    {value:'login_id' ,name: '이메일'},
    {value:'name' ,name: '이름'},
    {value:'birthday' ,name: '생년월일'},
    {value:'phone' ,name: '핸드폰'},
    {value:'ipin' ,name: '아이핀'},
    {value:'ip' ,name: 'IP'},
    {value:'ci' ,name: 'CI'},
  ]),[]);

  const [dateRole, setDateRole] = useState({value:'register' ,name: '가입일'});

  const dateItems = useMemo(()=> ([
    {value:'register' ,name: '가입일'},
    {value:'leave' ,name: '탈퇴일'},
    {value:'cert' ,name: '인증일'},
  ]),[]);

  const [adultRole, setAdultRole] = useState({value:'A', name:'전체'})

  const adultItems = useMemo(()=> ([
    {value:'A' ,name: '전체'},
    {value:'Y' ,name: '성인'},
    {value:'N' ,name: '미성년'},
  ]),[]);

  const [statusRole, setStatueRole] = useState({value:'A', name:"전체"});

  const statusItems = useMemo(()=> ([
    {value:'A' ,name: '전체'},
    {value:'cert' ,name: '인증'},
    {value:'not-cert' ,name: '미인증'},
    {value:'leave' ,name: '탈퇴'},
    {value:'block' ,name: '영구정지'},
  ]),[]);

  const [sortRole, setSortRole] = useState({value:'register', name:"가입일"});

  const sortItems = useMemo(()=> ([
    {value: 'register', name: '가입일'},
    {value: 'buy', name: '결제금액'},
    {value: 'buy-count', name: '보유하트'},
    {value: 'refund', name: '사용하트'},

  ]),[])
  
  // 회원목록 조회
  const UserListQuery = useQuery(
      [USERLIST_KEY],
      async () => await instance.get(USERLIST,{params}),
      {
        refetchOnWindowFocus: false,
        retry: 0,
        enabled:true,
        onSuccess: (res)=> {
          if(res.data?.data !== null) {
            let minNum = res.data.page.total - res.data.page.offset;
            for(let i=0; i<res.data.data.length; i++) {
              res.data.data[i].num = minNum;
              minNum -=1;
            }
          }else {
            res.data.data = [];
          }
          setLoadingFlg(false);
          console.log('res',res);
        },
        onError: (e) => {
          console.log('e', e);
          setLoadingFlg(false);
        }
    }
  )

    // 구독목록 조회
  const SubscribeListQuery = useQuery(
      SUBSCRIBE_KEY,
      async () => await instance.get(SUBSCRIBELIST,{params:dtParams}),
      {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (res)=> {
          if(res.data?.data !== null) {
            let minNum = res.data.page.total - res.data.page.offset;
            for(let i=0; i<res.data.data.length; i++) {
              res.data.data[i].num = minNum;
              minNum -=1;
            }
          }else {
            res.data.data = [];
          }
          setLoadingFlg(false);
          console.log('res',res);
        },
        onError: (e) => {
          console.log('e', e);
          setLoadingFlg(false);
        }
    }
  )
  
  
  useEffect(()=> {
    searchBtn();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[limit,offset])

  useEffect(()=> {
    searchDtBtn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dtLimit, dtOffset])

  // clear버튼 표시
  const isFiltered = searchName !== '' ;
  // 입력이벤트
  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const handleResetFilter = () => {
    setSearchName('');
  };
  // 클릭이벤트
  const handleSearchRole = (e) => {
    setSearchRole({value:e.target.value, name: e.target.name});
  };

  const handleDateRole = (e) => {
    setDateRole({value:e.target.value, name: e.target.name});
  };

  const handleAdultRole = (e) => {
    setAdultRole({value: e.target.value, name: e.target.name});
  }

  const handleStatusRole = (e) => {
    setStatueRole({value: e.target.value, name: e.target.name});
  }

  const handleSortRole = (e) => {
    setSortRole({value: e.target.value, name: e.target.name});
  }

  // 초기화 이벤트
  const initBtn = () => {
    setSearchRole({value:'profile_id' ,name: '프로필아이디'});
    setDateRole({value:'register' ,name: '가입일'});
    setAdultRole({value:'A', name:'전체'})
    setStatueRole({value:'A', name:"전체"});
    setSortRole({value:'register', name:"가입일"});
    setValue([null, null]);
    setSearchName('');
    setOpen(true);
    
  }
  // 검색 이벤트
  const searchBtn = () => {
    setLoadingFlg(true);
    // params = {};
    params.offset= offset;
    params.limit= limit.value;
    params.date_type = dateRole.value;
    params.sort = sortRole.value;
    params.adult_yn = adultRole.value;
    params.status = statusRole.value;
    params[searchRole.value] = searchName;
    if(value[0] !== null && value[1] !== null) {
      params.start_date = DateManager.convert(value[0].$d,'yyyy-mm-dd');
      params.end_date = DateManager.convert(value[1].$d,'yyyy-mm-dd');
    }else {
      params.end_date = '';
      params.start_date = '';
    }
    UserListQuery.refetch();
    
  }

  const searchDtBtn = () => {
    setLoadingFlg(true);
    dtParams.limit= dtLimit.value;
    dtParams.offset= dtOffset;
    SubscribeListQuery.refetch();
  }


const [value, setValue] = useState([null, null]);

  return (
    <>
    <Container maxWidth={false} sx={{ height: 1 } }>
        <CustomBreadcrumbs
          heading="회원관리"
          links={[
            { name: '회원관리' },
            { name: '회원목록' },
          ]}
        />
  
        <Card>
          <Stack
            spacing={2}
            alignItems="center"
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            sx={{ px: 2.5, py: 3 }}
          >
            <UserSelectBox
                labelText='검색어'
                widthSize={250}
                filterRole={searchRole}
                optionsRole={searchItems}
                onFilterRole={handleSearchRole}
            />
            <UserTextBox
                searchIcon
                placeholder="검색어입력"
                widthSize={450}
                isFiltered={isFiltered}
                filterName={searchName}
                onFilterName={handleSearchName}
                onResetFilter={handleResetFilter}
             />
            <UserSelectBox
                labelText='일자'
                widthSize={150}
                filterRole={dateRole}
                optionsRole={dateItems}
                onFilterRole={handleDateRole}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={{ start: '시작일자', end: '마지막일자' }}
            >
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField
                    {...startProps} />
                    <Box sx={{ mx: 2 }}> ~ </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
            <UserSelectBox
                labelText='성인여부'
                widthSize={100}
                filterRole={adultRole}
                optionsRole={adultItems}
                onFilterRole={handleAdultRole}
            />
            <UserSelectBox
                labelText='상태'
                widthSize={100}
                filterRole={statusRole}
                optionsRole={statusItems}
                onFilterRole={handleStatusRole}
            />
            <UserSelectBox
                labelText='정렬'
                widthSize={150}
                filterRole={sortRole}
                optionsRole={sortItems}
                onFilterRole={handleSortRole}
            />
            <Button size="large" color="error"variant="contained" onClick={()=> initBtn()}>초기화</Button>
            <Button size="large" color="success" variant="contained" onClick={()=> searchBtn()}>검색</Button>
          </Stack>
          {!UserListQuery.isLoading  &&(
            <SubUserGrid
              data={UserListQuery.data?.data}
              limit={limit}
              setLimit={setLimit}
              offset={offset}
              setOffset={setOffset}
              loadingFlg={loadingFlg}
            />)
          }
          {!SubscribeListQuery.isLoading  &&(
            <SubscribeGrid
              data={SubscribeListQuery.data?.data}
              limit={dtLimit}
              setLimit={setDtLimit}
              offset={dtOffset}
              setOffset={setDtOffset}
              loadingFlg={loadingFlg}
            />)
          }
        </Card>
         
      </Container>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          msg='리셋'
         />
      )}
      </>
  );
}
