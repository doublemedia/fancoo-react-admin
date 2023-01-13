import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { memo, useMemo, useState } from "react";
import UserSelectBox from "src/custom-components/common/UserSelectBox";


export function ReportDialog ({
    open,
    setOpen,
    data,
//    maxWidth
}) {
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
        console.log('확인')
    }
    
    const [statusRole, setStatueRole] = useState({value:'Y', name:"정상"});
    const [categoryRole, setCategoryRole] = useState({value:'1',name:"선택"});
    const [violationRole, setViolationRole] = useState({value:'1', name:"선택"});

    const statusItems = useMemo(()=> ([
        {value:'Y' ,name: '정상'},
        {value:'N' ,name: '삭제'},
    ]),[]);

    const categoryItems = useMemo(()=> ([
        {value:'1' ,name: '선택'},
        {value:'2' ,name: '음란물'},
        {value:'3' ,name: '폭력성·잔혹성·혐오성'},
        {value:'4' ,name: '사회통합 및 사회질서를 저해'},
    ]),[]);

    const violationItems = useMemo(()=> ([
        {value:'1' ,name: '선택'}
    ]),[]);

    const handleStatusRole = (e) => {
        setStatueRole({value: e.target.value, name: e.target.name});
    }

    const handleCategoryRole = (e) => {
        setCategoryRole({value: e.target.value, name: e.target.name});
    }

    const handleViolationRole = (e) => {
        setViolationRole({value: e.target.value, name: e.target.name});
    }

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
                            onFilterRole={handleStatusRole}
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
                            onFilterRole={handleCategoryRole}
                            disabled
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
                            onFilterRole={handleViolationRole}
                            disabled
                            />
                    </Grid>
                    <Grid item xs={2} p={2} sx={{...reportStyleTitle}}>
                        제제항목
                    </Grid>
                    <Grid item xs={3} p={2} sx={{...reportStyleData}}>
                        selectbox
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
            <DialogActions>
                <Button color='success' onClick={()=> chkBtn()}>설정</Button>
                <Button color='error' onClick={dialogClose}>취소</Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(ReportDialog)