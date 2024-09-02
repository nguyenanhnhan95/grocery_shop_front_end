import React, { useCallback, useMemo } from 'react';
import { useField, useFormikContext } from 'formik';
import { debounce } from '../../../utils/commonUtils';
import { validation } from '../../../utils/validation';

const CustomField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const handleChange =useCallback( (event) => {
        if (validation.isString(event.target.value)) {
            setFieldValue(field?.name, event.target.value)
        }
    },[field]);
    const debouncedHandleEnterData = useMemo(() => debounce(handleChange, 500), [handleChange]);
    return (
        <div>
            <input
                defaultValue={field.value}
                {...props}
                onChange={debouncedHandleEnterData}
            />
        </div>
    );
};

export default CustomField;