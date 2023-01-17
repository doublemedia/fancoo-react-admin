import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { memo, useMemo, useState , useEffect } from "react";

import { useQuery } from "react-query";
import instance from "src/api/api";
import { BLOCK_CODELIST, BLOCK_CODE_VIOLIST } from "src/api/end-point/userManagement";
import { BLOCK_CODE_KEY_1, BLOCK_CODE_KEY_2 } from "src/api/key/userManagement";
import UserSelectBox from "src/custom-components/common/UserSelectBox";


export function ReportDialog ({
    open,
    setOpen,
    data,
    options,
}) {
    const [setting,setSetting] = useState(false);
    const reportStyleTitle = {
        backgroundColor:'#36B37E',
        color:'#FFFFFF',
        marginBottom: '2px',
        
    }
    const reportStyleData = {
        backgroundColor:'#F6F6F6',
        marginBottom: '2px',
    }

    const dialogClose = () => {
        setOpen(false);
    }


    // 설정 API처리
    const chkBtn = () => {
        console.log('categoryRole,',categoryRole);
        console.log('확인')
    }

    const categoryItems = useMemo(()=> ([
        {value:'0' ,name: '선택'},
    ]),[]);

    const blockCodeListQuery = useQuery(
        [BLOCK_CODE_KEY_1],
        async () => await instance.get(BLOCK_CODELIST),
        {
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                for(let i=0; i<Object.keys(res.data.data).length; i++){
                    const obj = {};
                    obj.value = Object.keys(res.data.data)[i];
                    obj.name = Object.values(res.data.data)[i];
                    categoryItems.push(obj);
                }
            },
            onError: (res) => {
                console.log(res);
            }
        }

    )

    const blockCodeVioListQuery = useQuery(() => ([
        [BLOCK_CODE_KEY_2],
        async () => await instance.get(BLOCK_CODE_VIOLIST),
        {
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                for(let i=0; i<Object.keys(res.data.data).length; i++){
                    const obj = {};
                    obj.value = Object.keys(res.data.data)[i];
                    obj.name = Object.values(res.data.data)[i];
                    violationItems.push(obj);
                }
            },
            onError: (res) => {
                console.log(res);
            }
        }
    ]))

    useEffect (() => {
        if(!options) {
            const dataRender = async () => {
                await blockCodeListQuery.refetch();
                await blockCodeVioListQuery.refetch();

                setSetting(true);
            }
        }else {
            setSetting(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    const [statusRole, setStatueRole] = useState({value:'Y', name:"정상"});
    const [categoryRole, setCategoryRole] = useState({value:'0',name:"선택"});
    const [violationRole, setViolationRole] = useState({value:'0', name:"선택"});

    const statusItems = useMemo(()=> ([
        {value:'Y' ,name: '정상'},
        {value:'N' ,name: '삭제'},
    ]),[]);



    const violationItems = useMemo(()=> ([
        {value:'0' ,name: '선택'}
    ]),[]);


    return(
        <Dialog fullWidth maxWidth="md" open={open} onClose={dialogClose}>
            <DialogTitle>
                <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                    <Grid item xs={3} p={1}>
                        제제관리
                    </Grid>
                    <Grid item xs={1} p={1} >
                       <Button variant="text" color='error' onClick={dialogClose}>X</Button>
                    </Grid>
                </Grid>
                
            </DialogTitle>
            {setting &&(
                <DialogContent>
                    <Grid container spacing={0} >
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            처리자(관리자)
                        </Grid>
                        <Grid item xs={3} p={2} sx={{...reportStyleData}}>
                            data
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            처리일
                        </Grid>
                        <Grid item xs={5} p={2} sx={{...reportStyleData}}>
                            2023-01-09:09:18:31
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            상태
                        </Grid>
                        <Grid item xs={10} p={2} sx={{...reportStyleData}}>
                            <UserSelectBox 
                                widthSize={150}
                                variant="standard"
                                filterRole={statusRole}
                                optionsRole={statusItems}
                                onFilterRole={setStatueRole}
                                />
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            적용대상
                        </Grid>
                        <Grid item xs={3} p={2} sx={{...reportStyleData}}>
                            data
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            대분류
                        </Grid>
                        <Grid item xs={5} p={2} sx={{...reportStyleData}}>
                            <UserSelectBox 
                                widthSize={150}
                                variant="standard"
                                filterRole={categoryRole}
                                optionsRole={categoryItems}
                                onFilterRole={setCategoryRole}
                                disabled = {options}
                                />
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            위반항목
                        </Grid>
                        <Grid item xs={10} p={2} sx={{...reportStyleData}}>
                            <UserSelectBox 
                                widthSize={150}
                                variant="standard"
                                filterRole={violationRole}
                                optionsRole={violationItems}
                                onFilterRole={setViolationRole}
                                disabled = {options}
                                />
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            제제항목
                        </Grid>
                        <Grid item xs={3} p={2} sx={{...reportStyleData}}>
                            <UserSelectBox 
                                widthSize={150}
                                variant="standard"
                                filterRole={violationRole}
                                optionsRole={violationItems}
                                onFilterRole={setViolationRole}
                                disabled = {options}
                                />
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            기간
                        </Grid>
                        <Grid item xs={5} p={2} sx={{...reportStyleData}}>
                            selectbox
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            위반항목
                        </Grid>
                        <Grid item xs={10} p={2} sx={{...reportStyleData}}>
                            selectbox
                            selectbox
                            selectbox
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            메시지(회원)
                        </Grid>
                        <Grid item xs={10} p={2} sx={{...reportStyleData}}>
                            *자동발송
                        </Grid>
                        <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                            메시지(관리자)
                        </Grid>
                        <Grid item xs={10} p={2} sx={{...reportStyleData}}>
                            input
                        </Grid>
                    </Grid>
                </DialogContent>
            )}
            <DialogActions>
                <Button color='success' onClick={()=> chkBtn()}>설정</Button>
                <Button color='error' onClick={dialogClose}>취소</Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(ReportDialog)