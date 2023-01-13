## USING YARN (Recommend)

- yarn install
- yarn start

## USING NPM

- npm i OR npm i --legacy-peer-deps
- npm start

###### 컴포넌트 사용방법

## UserSelectBox 셀렉트박스

# 옵션

- labelText // 상단문자표시
- widthSize // width 길이 // 200
- variant // height 길이 // filled,standard
- filterRole // default값 (필수)
- optionsRole // itemsObject (필수)
- onFilterRole // 클릭이벤트 (필수)
- disabled // 비활성화

  <UserSelectBox
      labelText='검색어'
      widthSize={250}
      filterRole={searchRole}
      optionsRole={searchItems}
      onFilterRole={handleSearchRole}
      disabled
  />

## UserTextBox 텍스트박스

# 옵션

- searchIcon // 돋보기마크표시
- placeholder // 상단문자표시
- widthSize // width 길이
- isFiltered // 클리어버튼표시
- filterName // default 값 (필수)
- onFilterName // 이벤트 (필수)
- onResetFilter // isFiltered사용시 클리어이벤트

  <UserTextBox
    searchIcon
    placeholder="검색어입력"
    widthSize={450}
    isFiltered={isFiltered}
    filterName={searchName} 
    onFilterName={handleSearchName}
    onResetFilter={handleResetFilter}
  />

## DataGrid 그리드

# 옵션

- LoadingOverlay // 데이터그리드 내 로딩바
- hideFooter // MUI제공 푸터 비표시 (필수)
- hideFooterPagination // MUI제공 페이징비표시 (필수)
- hideFooterSelectedRowCount // MUI제공 건수표시비표시 (필수)
- disableSelectionOnClick // 셀선택이벤트 끄기
- loading // 로딩중표시
- getRowId // 데이터키 (id,num) (필수)
- experimentalFeatures // 컬럼그룹핑사용
- rows // 그리드데이터 (필수)
- columns // 그리드헤더 (필수)
- columnGroupingModel // 그룹핑 헤더
- onCellClick // 셀선택시 이벤트
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

## CustomPagination

# 옵션

- limit // limit useState (필수)
- offset // offset useState (필수)
- setOffset // setOffset useState (필수)
- currentpage // 서버에서오는 page(필수)
- lastPage // 마지막페이지수 (필수)

  <CustomPagination
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      currentpage={data?.page.page}
      lastPage={data?.page.lastPage}
  />

## CustomGridHeader

# 옵션

- limit // limit useState(필수)
- setLimit // setLimit useState(필수)
- setOffset // setOffset useState (필수)
- totalCnt // 총데이터수 (필수)

  <CustomGridHeader 
      limit={limit}
      setLimit={setLimit}
      setOffset = {setOffset}
      totalCnt={data?.page?.total}
  />

###### 날짜 Formatter

## DateManger

# Ex

- DateManager.convert(날짜,변환타입)
- 변환타입 'yyyy-mm-dd'/'yyyy/mm/dd'
