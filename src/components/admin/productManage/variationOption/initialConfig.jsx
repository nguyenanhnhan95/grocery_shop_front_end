import { typeSearchAdvanced } from "../../../../utils/commonConstants"
import { createActionURL } from "../../../../utils/commonUtils"
import { variationHttp } from "../variation/initialConfig"


export const variationOptionHttp={
    actionURL: createActionURL('products-variation-option'),
    variationOptionNavigate:"/admin/products-variation-option",
}
export const sectionActions = {
    add :{
        icon:"fa-solid fa-plus fa-sm pr-1",
        name:"Thêm mới",
        style:{
            display:"block"
        }
    },
    excel:{
        icon: "fa-solid fa-file-arrow-down fa-sm pr-1",
        name: "Xuất Excel",
        style:{
            display:"none"
        }
    }
}
export const initialForm={name:"",description:"",variation:""}
export const optionSearch={
    searchAdvanced:{
        style:{
            display:"block"
        }
    },
    items:[
        {
            title:"Lựa chọn Option",
            callApi:true,
            httpApi:"products-variation",
            search:{variation:null},
            component:typeSearchAdvanced.SelectModelSearch
        },
    ]
}

export const columnVariationOption=[
    {
        name:"STT",
        style:{
            width:"5%"
        }
    },
    {
        name:"Gía Trị Option",
        style:{
            width:"20%"
        }
    },
    {
        name:"Option",
        style:{
            width:"65%"
        }
    },
    {
        name:"",
        style:{
            width:"10%"
        }
    }
]
export const optionActionVariationOption=[
    {
        name: "Sửa",
        icon: "fa-solid fa-pencil mr-2",
        action: "edit"
    },
    {
        name: "Xóa",
        icon: "fa-regular fa-trash-can mr-2",
        action: "delete",
    }
]
export const queryParameterInitial = {
    size: 5,
    page: 0,
    criterias: {
        name: "",
        variation:null,
    }
}
