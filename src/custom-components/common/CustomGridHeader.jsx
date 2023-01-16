import { Grid, Typography } from "@mui/material";
import { memo } from "react";
import { PAGE_CNT_LIST } from "src/config/pageSetting";
import GridSelectBox from "./GridSelectBox";


function CustomGridHeader ({
    limit,
    setLimit,
    totalCnt,
    offset,
    setOffset
}) {
    // 데이터건수 정렬
    const handlePagingRole = (e) => {
        setLimit({value:e.target.value, name: e.target.name});
        setOffset(offset);
    };

    return(
        <Grid container spacing={7} justifyContent="space-between" alignItems="center" >
            <Grid item xs={2} p={1} >
                <Typography variant="subtitle2" mt={1}>
                    &nbsp; 총 {totalCnt} 건
                </Typography>
            </Grid>
            <Grid item xs={1} p={1} justifyContent="flex-end">
                    <GridSelectBox
                        size='small'
                        widthSize={140}
                        filterRole={limit}
                        optionsRole={PAGE_CNT_LIST}
                        onFilterRole={handlePagingRole}
                    />
            </Grid>
        </Grid>
    )
}

export default memo(CustomGridHeader);