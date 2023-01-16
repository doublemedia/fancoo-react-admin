import { Box } from "@mui/system";
import React from "react";
import CustomGridHeader from "src/custom-components/common/CustomGridHeader";

function BuyGrid({
    data,
    loadingFlg,
    limit,
    setLimit,
    offset,
    setOffset,
}) {
    return (
        <Box>
            <CustomGridHeader
                limit={limit}
                setLimit={setLimit}
                offset={offset}
                setOffset = {setOffset}
                totalCnt={data?.page?.total}
            />
        </Box>
    )

}

export default BuyGrid;