// next
import { Box, Button, Card,Container, Stack, TextField } from '@mui/material';
// layouts
// components
import { useQuery } from 'react-query';
import { BLOCKLIST_KEY } from 'src/api/key/userManagement';
import {  memo, useEffect, useMemo, useState } from 'react';
import CustomBreadcrumbs from 'src/custom-components/custom-breadcrumbs/CustomBreadcrumbs';
import UserSelectBox from 'src/custom-components/common/UserSelectBox';
// import { TablePaginationCustom } from 'src/components/table';
import UserTextBox from 'src/custom-components/common/UserTextBox';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import DateManager from 'src/utils/DateManager';
import { DEFAULT_OFFSET, DEFAULT_PAGE_CNT } from 'src/config/pageSetting';
import { BLOCKLIST } from 'src/api/end-point/userManagement';
import instance from 'src/api/api';
import BlockGrid from 'src/custom-components/user/BlockGrid';
import { useRecoilValue } from 'recoil';
import searchTextAtom from 'src/store/searchText/searchTextAtom';
// ----------------------------------------------------------------------

let params = {
    profile_id: '',
    offset: 0,
    limit: 20,
    date_type : 'register',
    sort: 'register',
    adult_yn: '',
    status: '',
    end_date: '',
    start_date: '',
  };

// ----------------------------------------------------------------------
function Block() {

  const setSearch = useRecoilValue(searchTextAtom);
  // 페이지 선택건수
  const [limit, setLimit] = useState(DEFAULT_PAGE_CNT);

  const [offset, setOffset] = useState(DEFAULT_OFFSET);

  const [loadingFlg, setLoadingFlg] = useState(false);

  const [searchName, setSearchName] = useState(setSearch);

  const [searchRole, setSearchRole] = useState({value:'profile_id' ,name: '프로필아이디'});

  const searchItems = useMemo(()=> ([
    {value:'profile_id' ,name: '프로필아이디'},
    {value:'nick' ,name: '닉네임'},
    {value:'category' ,name: '분류'},
  ]),[]);

  const [dateRole, setDateRole] = useState({value:'register' ,name: '가입일'});

  const dateItems = useMemo(()=> ([
    {value:'register' ,name: '제제일'},
    {value:'begin' ,name: '제제시작일'},
  ]),[]);

  const [reportRole, setReportRole] = useState({value:'A', name:'전체'})

  const reportItems = useMemo(()=> ([
    {value:'A' ,name: '전체'},
    {value:'warning' ,name: '경고'},
    {value:'restriction' ,name: '이용제한'},
    {value:'ban' ,name: '이용정지'},
  ]),[]);

  const [periodRole, setPeriodRole] = useState({value:'A', name:"전체"});

  const periodItems = useMemo(()=> ([
    {value:'A' ,name: '전체'},
    {value:'0' ,name: '없음'},
    {value:'3' ,name: '3일'},
    {value:'7' ,name: '7일'},
    {value:'30' ,name: '30일'},
    {value:'36500' ,name: '영구정지'},
  ]),[]);

  const [adjustRole, setAdjustRole] = useState({value:'A', name:"전체"});

  const adjustItems = useMemo(()=> ([
    {value: 'A', name: '전체'},
    {value: 'POST', name: '포스팅'},
    {value: 'COMMENT', name: '댓글'},
    {value: 'REPLY', name: '답글'},
  ]),[])
  
  const [sortRole, setSortRole] = useState({value:'register', name:"제재일"});

  const sortItems = useMemo(()=> ([
    {value: 'register', name: '제재일'},
    {value: 'begin', name: '제재시작일'},
    {value: 'expire', name: '기간'},
  ]),[])
  
  // 회원목록 조회
  const {data, refetch, isLoading} = useQuery(
      [BLOCKLIST_KEY],
      async () => await instance.get(BLOCKLIST,{params}),
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
        },
        onError: (e) => {
          setLoadingFlg(false);
        }
    }
  )
  
  useEffect(()=> {
    searchBtn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[limit,offset])

  // clear버튼 표시
  const isFiltered = searchName !== '' ;

  const handleResetFilter = () => {
    setSearchName('');
  };

  // 초기화 이벤트
  const initBtn = () => {
    setSearchRole({value:'profile_id' ,name: '프로필아이디'});
    setDateRole({value:'register' ,name: '가입일'});
    setReportRole({value:'A', name:'전체'})
    setPeriodRole({value:'A', name:"전체"});
    setAdjustRole({value:'A', name:"전체"});
    setSortRole({value:'register',name:'제재일'});
    setValue([null, null]);
    setSearchName('');
    
  }
  // 검색 이벤트
  const searchBtn = () => {
    setLoadingFlg(true);
    params = {};
    params.offset= offset;
    params.limit= limit.value;
    params.date_type = dateRole.value;
    params.sort = sortRole.value;
    params.adult_yn = reportRole.value;
    params.status = periodRole.value;
    params[searchRole.value] = searchName;
    if(value[0] !== null && value[1] !== null) {
      params.start_date = DateManager.convert(value[0].$d,'yyyy-mm-dd');
      params.end_date = DateManager.convert(value[1].$d,'yyyy-mm-dd');
    }else {
      params.end_date = '';
      params.start_date = '';
    }
    refetch();
  }

  const [value, setValue] = useState([null, null]);

  return (
    <Container maxWidth={false} sx={{ height: 1 } }>
        <CustomBreadcrumbs
          heading="제제목록"
          links={[
            { name: '회원관리' },
            { name: '제제목록' },
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
                widthSize={150}
                filterRole={searchRole}
                optionsRole={searchItems}
                onFilterRole={setSearchRole}
            />
            <UserTextBox
                searchIcon
                placeholder="검색어입력"
                widthSize={250}
                isFiltered={isFiltered}
                filterName={searchName}
                onFilterName={setSearchName}
                // onFilterName={handleSearchName}
                onResetFilter={handleResetFilter}
             />
            <UserSelectBox
                labelText='일자'
                widthSize={150}
                filterRole={dateRole}
                optionsRole={dateItems}
                onFilterRole={setDateRole}
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
                    <TextField  {...startProps} sx={{ mixWidth: { sm: 150 }}}
                    />
                    <Box sx={{ mx: 2 }}> ~ </Box>
                    <TextField {...endProps} sx={{ mixWidth: { sm: 150 }}}/>
                  </>
                )}
              />
            </LocalizationProvider>
            <UserSelectBox
                labelText='제재항목'
                widthSize={100}
                filterRole={reportRole}
                optionsRole={reportItems}
                onFilterRole={setReportRole}
            />
            <UserSelectBox
                labelText='기간'
                widthSize={100}
                filterRole={periodRole}
                optionsRole={periodItems}
                onFilterRole={setPeriodRole}
            />
            <UserSelectBox
                labelText='적용대상'
                widthSize={150}
                filterRole={adjustRole}
                optionsRole={adjustItems}
                onFilterRole={setAdjustRole}
            />
            <UserSelectBox
                labelText='제제일'
                widthSize={150}
                filterRole={sortRole}
                optionsRole={sortItems}
                onFilterRole={setSortRole}
            />
            <Button sx={{fontSize: 10}} size="large" color="error"variant="contained" onClick={()=> initBtn()}>리셋</Button>
            <Button sx={{fontSize: 10}} size="large" color="success" variant="contained" onClick={()=> searchBtn()}>검색</Button>
          </Stack>
          {!isLoading &&(
            <BlockGrid
              data={data?.data}
              limit={limit}
              setLimit={setLimit}
              offset={offset}
              setOffset={setOffset}
              loadingFlg={loadingFlg}
            />)
          }
        </Card>
         
      </Container>
  );
}

export default memo(Block);