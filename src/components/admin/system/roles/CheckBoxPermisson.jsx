import { useFormikContext } from "formik";

export const CheckBoxPermisson = ({ field, options, permisson, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const hanldeCheked = (permisson) => {       
        if(Array.isArray(field?.value)){
            let permissionTemp= [...field.value]
            let index =permissionTemp.indexOf(permisson)
            if (index !== -1) {
                permissionTemp.splice(index, 1);
            }else{
                permissionTemp.push(permisson);
            }
            setFieldValue(field.name,permissionTemp)
        } 
    }
    return (
        <>
            <input {...props} onClick={() => hanldeCheked(permisson)} checked={(Array.isArray(field?.value) && field?.value.includes(permisson)) } />
        </>
    )
}