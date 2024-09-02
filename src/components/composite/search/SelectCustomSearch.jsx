import { memo, useEffect, useState } from "react"
import "../../../assets/css/composite/search/selectItemSearch.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { validation } from "../../../utils/validation";
import { createActionURL, getScreenThem } from "../../../utils/commonUtils";
import { useFetchGet } from "../../../hook/fetch/authenticated/useFetchGet";
import { useScreenMode } from "../../../hook/auth/useScreenMode";
function SelectCustomSearch(props) {
    const { setSearchFiled, item, searchFiled } = props;
    const [options,setOptions] = useState([]);
    const {data, code, fetchGet} = useFetchGet();
    console.log(createActionURL(item.httpApi).instant())
    const { screenMode } = useScreenMode()
    useEffect(()=>{
        if(item?.callApi){
            fetchGet(createActionURL(item.httpApi).instant());
        }
    },[])
    useEffect(()=>{
        if(code===200){
            setOptions(data)
        }
    },[code])

    const handleSelect = (value) => {
        if (validation.isNotEmpty(value)) {
            const selectedItem = options.find(option => option === value);
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                ...searchFiled,
                [firstKey]: selectedItem,
            }
            setSearchFiled(newQueryParameter)
        } else {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                ...searchFiled,
                [firstKey]: null
            }
            setSearchFiled(newQueryParameter)
        }
    }
    return (
        <div className="col-12 col-md-6 col-xl-3 container-content-search-advanced-item">
            <FormControl >
                <InputLabel id={item.title} >{item.title}</InputLabel>
                <Select defaultValue={''}
                    labelId={item.title}
                    onChange={(e)=>handleSelect(e.target.value)}
                    label={item.title}
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                            className: getScreenThem(screenMode),
                        },
                    }}
                >
                    <MenuItem value="">
                        <em>{item.title}</em>
                    </MenuItem>
                    {options && options.map((each, index) => (
                        <MenuItem value={each}  key={index}>{each}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default memo(SelectCustomSearch);