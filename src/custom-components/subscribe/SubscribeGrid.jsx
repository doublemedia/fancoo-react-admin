import { Box, LinearProgress } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import CustomPagination from "src/custom-components/common/CustomPagination";
import CustomGridHeader from "../common/CustomGridHeader";

export default function SubscribeGrid({
    data,
    loadingFlg,
    limit,
    setLimit,
    offset,
    setOffset,
}) {

    const navigate = useNavigate();

    const columns = useMemo(()=> ([
        { field: 'num', headerName: '번호', width: 100 , headerClassName: 'my-group' , headerAlign: 'center', sortable: false },
        { field: 'status_name', headerName: '구독시작일', width: 100, headerClassName: 'my-group' , sortable: false },
        { field: 'end_date', headerName: '구독종료일', width: 150, headerClassName: 'my-group' , sortable: false },
        { field: 'buy_nick', headerName: '팬', width: 200, headerClassName: 'my-group' , sortable: false},
        { field: 'sell_nick', headerName: '크리에이터', width: 200, headerClassName: 'my-group' , sortable: false },
        { field: 'subscription_name', headerName: '구독권명', width: 250, headerClassName: 'my-group' , sortable: false },
        { field: 'grade_name', headerName: '구독등급', width: 200, headerClassName: 'my-group' , sortable: false },
        { field: 'buy_cost_price', headerName: '구독권가격', width: 200, headerClassName: 'my-group' , sortable: false },
        { field: 'price', headerName: '결제금액', width: 100, headerClassName: 'my-group' , sortable: false },
     ]),[])
     
    // 행클릭 이벤트
    const handleOnCellClick = (e) => {
        if(e.field === 'buy_nick') {
            navigate('/user/block');
        }else if(e.field === 'sell_nick') {
            navigate('/user/block');
        }
    };

    return (
        <Box>
            <CustomGridHeader 
                limit={limit}
                setLimit={setLimit}
                setOffset = {setOffset}
                totalCnt={data?.page?.total}
            />
           <Box
            sx={{
                height: 400,
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
                    rows={data.data} 
                    columns={columns}
                    // columnGroupingModel={groupColumns}
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
    )
}
