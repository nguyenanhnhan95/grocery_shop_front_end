import React from "react";
import CustomDatePicker from "../custom/customDatePicker";
import dayjs from "dayjs";

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