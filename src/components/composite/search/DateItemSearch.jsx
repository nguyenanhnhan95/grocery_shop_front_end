import { memo, useCallback, useEffect, useRef, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/vi';
import "../../../assets/css/composite/search/dateItemSearch.css"
import { Paper, Popper } from "@mui/material";
import { getScreenThem } from "../../../utils/commonUtils";
import { useScreenMode } from "../../../hook/auth/useScreenMode";
function DateItemSearch(props) {
    const { searchFiled, item, setSearchFiled } = props;
    const { screenMode } = useScreenMode()
    const [inputWidth, setInputWidth] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }
    }, [inputRef.current]);
    const handleEnterDate = useCallback((value) => {
        const date = new Date(value)
        let newQueryParameter = null;
        if (date instanceof Date) {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            newQueryParameter = {
                searchFiled,
                [firstKey]: date,
            }
        } else {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            newQueryParameter = {
                searchFiled,
                [firstKey]: null,
            }
        }
        setSearchFiled(newQueryParameter)
    }, [setSearchFiled, item, searchFiled])
    return (
        <div className="col-12 col-md-4 col-xl-3 container-content-search-advanced-item" ref={inputRef} >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi" >
                <DemoContainer components={['DatePicker']}  >
                    <DatePicker
                        label={item.title} dateFormat="dd/MM/yyyy"
                        onChange={(value) => handleEnterDate(value)}
                        localeText={{
                            toolbarTitle: item.title,
                            cancelButtonLabel: 'Hủy ',
                            clearButtonLabel: 'Xóa',
                            okButtonLabel: 'Xác nhận',
                            todayButtonLabel: 'Hôm nay',
                            start: 'Bắt đầu',
                            end: 'Kết thúc',
                            previousMonth: 'Tháng trước',
                            nextMonth: 'Tháng sau',
                            openPicker: 'Mở trình chọn ngày',
                            calendar: 'Lịch', // Custom text for select date
                        }}
                        // inputRef={inputRef}
                        slots={{
                            popper: (props) => <Popper {...props} className={`${getScreenThem(screenMode)} date-search-admin`} style={{ width: inputWidth - 24 }} />,
                            mobilePaper: (props) => <Paper {...props} className={getScreenThem(screenMode)} />,
                        }}

                    />

                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}
export default memo(DateItemSearch)