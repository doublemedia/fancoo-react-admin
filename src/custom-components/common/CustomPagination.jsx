import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";


export default function CustomPagination ({
    limit,
    offset,
    setOffset,
    currentpage,
    lastPage,
}) {
    const [page, setPage] = useState(1);
    
     useEffect(()=> {
        setPage(currentpage);
    },[currentpage])

    const handleChange = (event, value) => {
        if(value===1) {
            setOffset(0);
        }else {
            setOffset((value-1)*limit.value);
        }
        setPage(value);
    };
    return (
        <Stack spacing={1} direction="row" justifyContent="end" sx={{ px: 2.5, py: 1 }} >
            <Pagination  color="primary" count={lastPage} page={page} onChange={handleChange} />
        </Stack>
    )
}