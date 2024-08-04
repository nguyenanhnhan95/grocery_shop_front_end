import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "../../../assets/css/composite/formik/datePickerFiled.css"
export const DatePickerField = ({ field, form, ...props }) => {
    return (
        <DatePicker
            {...field}
            {...props}
            autoComplete="off"
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                form.setFieldValue(field.name, val);
            }}
        />
    );
};