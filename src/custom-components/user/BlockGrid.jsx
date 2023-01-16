import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Suspense, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import CustomPagination from "src/custom-components/common/CustomPagination";
// import ReportDialog from "src/custom-components/dialog/report/ReportDialog";
import CustomGridHeader from "../common/CustomGridHeader";

const ReportDialog = React.lazy(()=> import('src/custom-components/dialog/report/ReportDialog'));
const MemoDialog = React.lazy(()=> import('src/custom-components/dialog/report/MemoDialog'));

export default function BlockGrid({
    data,
    loadingFlg,
    limit,
    setLimit,
    offset,
    setOffset,
}) {

    console.log('dfd');
    const [open, setOpen] = useState(false);
    const [memoOpen , setMemoOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // 제제 내역이동
    const reportEvent = (p) => {
        const reportBtn = () => {
            setOpen(true);
        }
        return(
            <Button size="small" color="success"variant="contained" onClick={()=> reportBtn()}>관리</Button>
        )
    }

    const memoEvent = (p) => {
        const memoBtn = () => {
            setMsg(p.row.memo);
            setMemoOpen(true);
        }
        return (
            <Button size="small" color="success" variant="contained" onClick={()=> memoBtn()}>보기</Button>
        )
    }

    const navigate = useNavigate();

    const columns = useMemo(()=> ([
        { field: 'num', headerName: '번호', minWidth: 50 , flex:0.3, headerClassName: 'my-group' , headerAlign: 'center', sortable: false },
        { field: 'status', headerName: '상태', minWidth: 50, flex:0.3, headerClassName: 'my-group' , sortable: false },
        { field: 'block_date', headerName: '제제일자', minWidth: 250, flex:0.5, headerClassName: 'my-group' , sortable: false },
        // eslint-disable-next-line arrow-body-style
        { field: 'profile_nick', headerName: '대상자', minWidth: 200, flex:0.7, headerClassName: 'my-group' , sortable: false, renderCell: (params) => {
            return (
                <Stack spacing={1} sx={{ width: 1, py: 1 }}>
                    <span>{params.row.nick}</span>
                    <span>({params.row.profile_id})</span>
                </Stack>
            );
        }},
        { field: 'admin_nick', headerName: '제재자(관리자)', minWidth: 200, flex:0.7, headerClassName: 'my-group' , sortable: false, renderCell: (params) => (
                <Stack spacing={1} sx={{ width: 1, py: 1 }}>
                    <span>{params.row.admin_nick}</span>
                    <span>({params.row.admin_profile_id})</span>
                </Stack>
            )},
        { field: 'type_name', headerName: '제재항목', minWidth: 150, flex:0.3, headerClassName: 'my-group' , sortable: false },
        { field: 'expire_day', headerName: '기간', minWidth: 250, flex:0.5, headerClassName: 'my-group' , sortable: false, renderCell: (params) => (
                <Stack>
                    {params.row.expire_day === 0 ? <span>-</span>: params.row.expire_day === 36500 ? <span>영구</span>:<span>{params.row.expire_day}일</span>}
                </Stack>
            )},
        { field: 'content_type_name', headerName: '적용대상', minWidth: 200, flex:0.5, headerClassName: 'my-group' , sortable: false },
        { field: 'category', headerName: '분류', minWidth: 100, flex:1, headerClassName: 'my-group' , sortable: false },
        { field: 'begin_date', headerName: '제재시작', minWidth: 100, flex:0.5, headerClassName: 'my-group' , sortable: false },
        { field: 'memo', headerName: '메모', minWidth: 50, flex:0.3, headerClassName: 'my-group' , sortable: false, renderCell: memoEvent, },
        { field: 'management', headerName: '관리', minWidth: 50, flex:0.3, headerClassName: 'my-group' , sortable: false, renderCell: reportEvent, },
     // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    getRowHeight={() => 'auto'}
                    experimentalFeatures={{ columnGrouping: false }}
                    rows={data?.data} 
                    columns={columns}
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

        
        <Suspense fallback={null}>
            {open && (
            <ReportDialog
                open={open}
                setOpen={setOpen}
            />
                )}
        </Suspense>    
       
        <Suspense fallback={null}>
        {memoOpen && (
            <MemoDialog
                open={memoOpen}
                setOpen={setMemoOpen}
                msg={msg}
                setMsg={setMsg}
            />
        )}
        </Suspense>
        </>
    )
}
