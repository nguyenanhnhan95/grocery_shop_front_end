import { Autocomplete, Box, Paper, Popper, TextField } from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import "../../../assets/css/composite/search/inputDataSearch.css"
import { createActionURL, debounce, getScreenThem } from "../../../utils/commonUtils";
import { useFetchData } from "../../../hook/fetch/authenticated/useFetchData";
import { useScreenMode } from "../../../hook/auth/useScreenMode";
function InputDataSearch(props) {
    const { setSearchFiled, item, searchFiled } = props;
    const { data: options } = useFetchData(createActionURL(item.httpApi).instant());
    const { screenMode } = useScreenMode()
    const handleInputChange = useCallback((newInputValue) => {
        if (newInputValue !== undefined && newInputValue.length > 0) {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                searchFiled,
                [firstKey]: newInputValue,
            }
            setSearchFiled(newQueryParameter)
        } else {
            console.log(newInputValue)
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                searchFiled,
                [firstKey]: null
            }
            setSearchFiled(newQueryParameter)
        }
    }, [setSearchFiled, searchFiled, item])
    const CustomPaper = (props) => {
        return <Paper elevation={8} {...props} />;
    };
    const CustomPopper = (props) => {
        return <Popper {...props} disableScrollLock className={getScreenThem(screenMode)} />;
    };
    const debouncedHandleEnterData = useMemo(() => debounce(handleInputChange, 500), [handleInputChange]);

    return (
        <div className="col-12 col-md-4 col-xl-3 container-content-search-advanced-item">
            <Autocomplete

                getOptionLabel={(option) => option.code}
                freeSolo
                selectOnFocus
                clearOnBlur={false}
                autoHighlight
                options={options || []}
                onInputChange={(event, newInputValue) => debouncedHandleEnterData(newInputValue)}
                renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.code}>
                        {option.code}
                    </Box>
                )}
                PaperComponent={CustomPaper}
                PopperComponent={CustomPopper}
                renderInput={(params) => <TextField {...params} label={item.title} />}
            />
        </div>
    )
}
export default memo(InputDataSearch);