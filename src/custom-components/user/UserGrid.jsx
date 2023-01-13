import { Box, Button, LinearProgress } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import CustomPagination from "src/custom-components/common/CustomPagination";
import ReportDialog from "src/custom-components/dialog/report/ReportDialog";
import searchTextAtom from "src/store/searchText/searchTextAtom";
import CustomGridHeader from "../common/CustomGridHeader";

export default function UserGrid({
    data,
    loadingFlg,
    limit,
    setLimit,
    offset,
    setOffset,
}) {
    const setSearchText = useSetRecoilState(searchTextAtom);
    const [open, setOpen] = useState(false);

    // 제제 내역이동
    const reportEvent = (p) => {
        const reportBtn = () => {
           // setSearchText(searchName);
            setSearchText(p.row.profile_id);
            navigate('/user/block');
        //    setOpen(true);
        }
        return(
            <Button size="small" color="success"variant="contained" onClick={()=> reportBtn()}>보기</Button>
        )
    }

    const navigate = useNavigate();

    const columns = useMemo(()=> ([
        { field: 'num', headerName: '번호', width: 100 , headerClassName: 'my-group' , headerAlign: 'center', sortable: false },
        { field: 'status_name', headerName: '상태', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'login_social_code_name', headerName: '가입', width: 150, headerClassName: 'my-group' , sortable: false },
        { field: 'profile_id', headerName: '프로필아이디', width: 200, headerClassName: 'my-group' , sortable: false},
        { field: 'nick', headerName: '닉네임', width: 200, headerClassName: 'my-group' , sortable: false },
        { field: 'login_id', headerName: '이메일', width: 250, headerClassName: 'my-group' , sortable: false },
        { field: 'phone', headerName: '핸드폰', width: 200, headerClassName: 'my-group' , sortable: false },
        { field: 'ipin', headerName: '아이핀', width: 200, headerClassName: 'my-group' , sortable: false },
        { field: 'name', headerName: '이름', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'gender', headerName: '성별', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'birthday', headerName: '생년월일', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'buy_total', headerName: '금액', width: 140, headerClassName: 'my-group' , sortable: false },
        { field: 'buy_count', headerName: '보유하트', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'refund_total', headerName: '사용하트', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'reg_date', headerName: '가입일', width: 150, headerClassName: 'my-group' , sortable: false },
        { field: 'ip', headerName: '접속IP', width: 150, headerClassName: 'my-group' , sortable: false },
        { field: 'report_his', headerName: '제제내역', width: 100, headerClassName: 'my-group' , sortable: false, renderCell: reportEvent, },
     // eslint-disable-next-line react-hooks/exhaustive-deps
     ]),[])

    const groupColumns = useMemo(()=> ([
        {
            groupId: 'header1',
            headerName: '',
            headerClassName:  'my-header',
            children: [{ field: 'num' }, { field: 'status_name' } ,{ field: 'login_social_code_name' }],
        },
        {
            groupId: 'header2',
            headerName: '계정정보',
            headerClassName:  'my-header',
            headerAlign: 'center',
            children: [
                // {
                //   groupId: 'status_name',
                //   children: [{ field: 'lastName' }, { field: 'firstName' }],
                // },
                { field: 'profile_id' },
                { field: 'nick' },
                { field: 'login_id' },
            ],
        },
        {
            groupId: 'header3',
            headerName: '인증정보',
            headerClassName:  'my-header',
            headerAlign: 'center',
            children: [{ field: 'phone' }, { field: 'ipin' } ],
        },
        {
            groupId: 'header4',
            headerName: '유저정보',
            headerClassName:  'my-header',
            headerAlign: 'center',
            children: [{ field: 'name' }, { field: 'gender' },{ field: 'birthday' } ],
        },
        {
            groupId: 'header5',
            headerName: '결제내역',
            headerClassName:  'my-header',
            headerAlign: 'center',
            children: [{ field: 'buy_total' }, { field: 'buy_count' },{ field: 'refund_total' } ],
        },
        {
            groupId: 'header6',
            headerName: '활동정보',
            headerClassName:  'my-header',
            headerAlign: 'center',
            children: [{ field: 'reg_date' }, { field: 'ip' },{ field: 'report_his' } ],
        },
    ]),[])

    // 행클릭 이벤트
    const handleOnCellClick = (e) => {
        if(e.field === 'profile_id') {
            navigate('/user/block');
        }
    };

    return (
        <>
        <Box>
            <CustomGridHeader 
                limit={limit}
                setLimit={setLimit}
                offset={offset}
                setOffset = {setOffset}
                totalCnt={data?.page?.total}
            />
           <Box
            sx={{
                height: 800,
                width: '100%',
                '& .my-group': {
                backgroundColor: '#BDBDBD',
                },
                '& .my-header': {
                backgroundColor: '#8C8C8C',
                }
            }}
            >
                <DataGrid
                    components={{
                        LoadingOverlay: LinearProgress,
                    }}
                    hideFooter
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    disableSelectionOnClick
                    loading={loadingFlg}
                    getRowId={(row) => row?.num}
                    experimentalFeatures={{ columnGrouping: true }}
                    rows={data?.data} 
                    columns={columns}
                    columnGroupingModel={groupColumns}
                    onCellClick={handleOnCellClick}
                />
            </Box>
            <CustomPagination
                limit={limit}
                offset={offset}
                setOffset = {setOffset}
                currentpage = {data?.page.page}
                lastPage = {data?.page.lastPage}
            />
        </Box>

        {open && (    
            <ReportDialog
                open={open}
                setOpen={setOpen}
            />)}
        </>
    )
}
