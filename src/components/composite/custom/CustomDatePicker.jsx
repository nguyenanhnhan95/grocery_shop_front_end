import { memo, useRef } from "react"
import { useScreenMode } from "../../../hook/auth/useScreenMode";
import useSizeAndPosition from "../../../hook/layout/useSizeAndPosition";
import "../../../assets/css/composite/custom/customDatePicker.css";
import 'dayjs/locale/vi';
import { Paper, Popper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getScreenThem } from "../../../utils/commonUtils";
function CustomDatePicker({title,...props}) {
    const paperRef = useRef(null);
    const {width} = useSizeAndPosition(paperRef)
    const { screenMode } = useScreenMode()
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <DemoContainer components={['DatePicker']}  >
                <DatePicker
                    
                    {...props}
                    slots={{
                        popper: (props) => <Popper {...props} className={`${getScreenThem(screenMode)} `} style={{ width: width }} />,
                        mobilePaper: (props) => <Paper {...props} className={getScreenThem(screenMode)} />,
                    }}
                    localeText={{
                        toolbarTitle: title,
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
                    ref={paperRef}
                    dayOfWeekFormatter={(date) => date.format("dd")}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}
export default memo(CustomDatePicker)