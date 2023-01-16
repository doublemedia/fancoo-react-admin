import { MenuItem, TextField } from "@mui/material";
import { memo, useCallback } from "react";


function UserSelectBox({
  filterRole,
  optionsRole,
  onFilterRole,
  labelText,
  widthSize,
  variant,
  size,
  disabled
}) {
  console.log('dfdf123',filterRole);
    // default
    if(widthSize===undefined) {
        widthSize = 240;
    }
    if(size===undefined) {
      size = 'large';
    }
    if(variant===undefined) {
      variant = 'filled';
    }
    if(disabled===undefined) {
      disabled=false;
    }

    const onChange = useCallback(
    e => {
      onFilterRole({value:e.target.value, name: e.target.name});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterRole]
  );
    return(
    <TextField
        fullWidth
        size={size}
        select
        variant={variant}
        label={labelText}
        name={filterRole.name}
        value={filterRole.value}
        onChange={onChange}
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

export default memo(UserSelectBox);