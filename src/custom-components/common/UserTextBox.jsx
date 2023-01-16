import { Button,  InputAdornment, TextField } from "@mui/material";
import { memo, useCallback } from "react";
import Iconify from "../../components/iconify/Iconify";

// UserTextBox.propTypes = {
//   isFiltered: PropTypes.bool,
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
//   onResetFilter: PropTypes.func,
// };

function UserTextBox({
  isFiltered,
  filterName,
  onFilterName,
  onResetFilter,
  searchIcon,
  placeholder,
  widthSize,
}) {
  console.log(filterName);
    // default
    if(widthSize===undefined) {
        widthSize = 240;
    }
    if(searchIcon === undefined) {
      searchIcon = false;
    }
    if(placeholder === undefined) {
      placeholder = ''
    }
    // const change = useCallback(e) => {
    //   onFilterName(e.target.value);
    // }

    const onChange = useCallback(
    e => {
      onFilterName(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterName]
  );

    return(
    <>
      <TextField
        fullWidth
        value={filterName}
        onChange={(onChange)}
        placeholder={placeholder}
        sx={{
          maxWidth: { sm: widthSize },
          textTransform: 'capitalize',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {searchIcon && (<Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />)}
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
      </>
    )
}

export default memo(UserTextBox);