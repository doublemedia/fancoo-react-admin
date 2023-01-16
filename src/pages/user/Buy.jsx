import { Card, Container, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import CustomBreadcrumbs from "src/custom-components/custom-breadcrumbs/CustomBreadcrumbs";
import Searchbar from "src/custom-components/user/buy/searchBar/SearchBar";

function Buy() {


    return (
        <Container maxWidth={false} sx={{ height: 1 } }>
            <CustomBreadcrumbs
            heading="콘텐츠구매목록"
            links={[
                { name: '회원관리' },
                { name: '콘텐츠구매목록' },
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
                     <Searchbar />
                </Stack>
            </Card>
            
        </Container>
       
    )
    
}

export default Buy;