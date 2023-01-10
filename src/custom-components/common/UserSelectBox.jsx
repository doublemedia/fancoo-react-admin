import { MenuItem, TextField } from "@mui/material";
import { memo } from "react";

function UserSelectBox({
  filterRole,
  optionsRole,
  onFilterRole,
  labelText,
  widthSize,
  size
}) {
    // default
    if(widthSize===undefined) {
        widthSize = 240;
    }
    if(size===undefined) {
      size = 'large'
    }
    return(
    <TextField
        fullWidth
        size={size}
        select
        label={labelText}
        name={filterRole.name}
        value={filterRole.value}
        onChange={onFilterRole}
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

export default memo(UserSelectBox);