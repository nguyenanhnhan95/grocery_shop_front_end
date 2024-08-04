import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Alignment, Autoformat, Bold, ClassicEditor, Essentials, Font, Heading, Indent, IndentBlock, Italic, List, Paragraph, SpecialCharacters, SpecialCharactersEssentials, Underline } from "ckeditor5";
import "../../../assets/css/composite/formik/ckeEditorFiled.css"
import { useField, useFormikContext } from 'formik';
import { useMemo } from "react";
import { debounce } from "../../../utils/commonUtils";
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
export const CKEditorField = (props) => {
    const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();
    const handelEnterData=(description)=>{
        setFieldValue(field.name, description);
    }
    const debouncedHandleEnterData = useMemo(() => debounce(handelEnterData, 500), [handelEnterData]);
    return (
        <CKEditor 
            editor={ClassicEditor}
            config={{
                plugins: [Essentials,
                    Bold,
                    Italic,
                    Underline,
                    Indent,
                    IndentBlock,
                    Heading,
                    Font,
                    Autoformat,
                    Paragraph,
                    Alignment,
                    List,
                    SpecialCharacters,SpecialCharactersEssentials],
                toolbar: [ 'undo',
                    'redo',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'alignment',
                    '|',
                    'indent',
                    'outdent',
                    '|',
                    'fontFamily',
                    'fontSize',
                    'fontColor',
                    'fontBackgroundColor',
                    '|',
                    'specialCharacters',
                    '|'],
            }}
            
            data={field.value || ''}
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor 1 is ready to use!', editor);
            }}
            onChange={(event,editor)=>
                debouncedHandleEnterData(editor.getData())
            }
            
        />
    )
}
