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
function SelectModelSearch(props) {
    const { setSearchFiled, item, searchFiled } = props;
    const [options,setOptions] = useState([]);
    const {data, code, fetchGet} = useFetchGet();
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
        const id = value.target.value;
        if (validation.isNotEmpty(id)) {
            const selectedItem = options.find(option => option.id === id);
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                ...searchFiled,
                [firstKey]: selectedItem.id,
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
                    onChange={handleSelect}
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
                        <MenuItem value={each.id} key={index}>{each.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default memo(SelectModelSearch);