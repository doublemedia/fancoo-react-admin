import { MenuItem, TextField } from "@mui/material";
import { memo, useCallback } from "react";


function GridSelectBox({
  filterRole,
  optionsRole,
  onFilterRole,
  widthSize,
  size,
  variant,
  disabled
}) {
  console.log('그리드',filterRole);
    // default
    if(widthSize===undefined) {
        widthSize = 140;
    }
    if(size===undefined) {
      size = 'small';
    }
    if(variant===undefined) {
      variant = 'filled';
    }
    if(disabled===undefined) {
      disabled=false;
    }

    return(
    <TextField
        fullWidth
        size={size}
        select
        name={filterRole.name}
        value={filterRole.value}
        onChange={onFilterRole}
        disabled={disabled}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: widthSize },
          textTransform: 'capitalize',
        }}
      >
        <MenuItem // 필요
          disabled
          value='' // <<< 바로 이 부분 : 빈 문자열 값을 가진 MenuItem을 별도로 넣는다.
          sx={{
            display: "none", // 보여줄 지 설정
          }}>
          <em>-</em>
        </MenuItem>
        {optionsRole.map((option) => (
          <MenuItem
            value={option.value}
            key={option.value}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    )
}

export default memo(GridSelectBox);