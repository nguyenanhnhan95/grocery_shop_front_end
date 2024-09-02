import React from "react";

import dayjs from "dayjs";
import CustomDatePicker from "../custom/CustomDatePicker";

export const DatePickerField = ({ field, title, form, ...props }) => {

    return (
        <CustomDatePicker 
               autoComplete="off"
               defaultValue={(field.value && dayjs()) || null}
               onChange={val => {
                   form.setFieldValue(field.name, val);
               }}
               title={title}
               {...props}
        />
    );
};