import { typeSearchAdvanced } from "../../../../utils/commonConstants"
import { createActionURL } from "../../../../utils/commonUtils"

export const productsHttp = {
    actionURL: createActionURL('/admin/user'),
    productionNavigate:"/admin/user",
}
export const columnProducts = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Tên ",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Mô Tả",
        style: {
            'width': "300px"
        }
    },
    {
        name: "",
        style: {
            'width': "70px"
        }
    }
]
export const sectionActions = {
    add: {
        icon: "fa-solid fa-plus fa-sm pr-1",
        name: "Thêm mới",
        style: {
            display: "block"
        }
    },
    excel: {
        icon: "fa-solid fa-file-arrow-down fa-sm pr-1",
        name: "Xuất Excel",
        style: {
            display: "none"
        }
    }
}
export const optionSearch = {
    searchAdvanced: {
        style: {
            display: "none"
        }
    },
    items: []
}
export const initialForm =
{
    name: "",
    description: "",
}
export const optionActions = [
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
        includeDeleted:false
    }
}