import { Button,  InputAdornment, TextField } from "@mui/material";
import { memo } from "react";
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
    return(
    <>
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
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