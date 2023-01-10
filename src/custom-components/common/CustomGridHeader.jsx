import { Grid, Typography } from "@mui/material";
import { PAGE_CNT_LIST } from "src/config/pageSetting";
import UserSelectBox from "./UserSelectBox";


export default function CustomGridHeader ({
    limit,
    setLimit,
    totalCnt,
    offset,
    setOffset
}) {
    // 데이터건수 정렬
    const handlePagingRole = (e) => {
        console.log(e.target);
        setLimit({value:e.target.value, name: e.target.name});
        setOffset(offset);
    };

    return(
        // <Stack
        //     spacing={4}
        //     alignItems="left"
        //      direction="row" justifyContent="end"
        //     sx={{ px: 2.5, py: 1 }}  >
        //     <Typography variant="subtitle2" mt={1}>
        //         총 {totalCnt}
        //     </Typography>
                
            // <UserSelectBox
            //     size='small'
            //     widthSize={100}
            //     filterRole={limit}
            //     optionsRole={PAGE_CNT_LIST}
            //     onFilterRole={handlePagingRole}
            // />
        // </Stack>
        <Grid container spacing={11} justifyContent="space-between" alignItems="center" >
        <Grid item xs={1} p={1} >
            <Typography variant="subtitle2" mt={1}>
                &nbsp; 총 {totalCnt} 건
            </Typography>
        </Grid>
        <Grid item xs={1} p={1} >
                <UserSelectBox
                    size='small'
                    widthSize={100}
                    filterRole={limit}
                    optionsRole={PAGE_CNT_LIST}
                    onFilterRole={handlePagingRole}
                />
        </Grid>
        </Grid>
    )
}