import { typeSearchAdvanced } from "../../../../utils/commonConstants"

export const columnUser = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Họ Và Tên",
        style: {
            'width': "180px"
        }
    }
    ,
    {
        name: "Tên Đăng Nhập ",
        style: {
            'width': "180px"
        }
    },
    {
        name: "Avatar",
        style: {
            'width': "100px"
        }
    },
    {
        name: "Email",
        style: {
            'width': "250px"
        }
    },
    {
        name: "Trạng Thái",
        style: {
            'width': "150px"
        }
    }
    ,
    {
        name: "Ngày cập nhập",
        style: {
            'width': "150px"
        }
    }
    ,
    {
        name: "",
        style: {
            'width': "150px"
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
            display: "block"
        }
    },
    items: [
        {
            title:"Chọn vai trò",
            callApi:true,
            httpApi:"role",
            search:{roleId:null},
            component:typeSearchAdvanced.SelectModelSearch
        },
        {
            title:"Chọn trạng thái",
            callApi:true,
            httpApi:"profile/account-status",
            search:{status:null},
            component:typeSearchAdvanced.SelectModelSearch
        }
    ]
}
export const initialForm =
    {
        avatar: null,
        name:null,
        nameLogin: null,
        password: null,
        confirmPassword:null,
        provinces: '48',
        districts: null,
        wards: null,
        accountStatus:null,
        phone:null,
        roles: [],
        address:null,
        birthOfDate:null,
        idCard:null
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
        roleId:null,
        status:null,
        includeDeleted:false
    }
}
export const statusAccount={
    "ACTIVATED":"badge rounded-pill badge-light-success",
    "INACTIVE":"badge rounded-pill badge-light-warning",
    "LOCK":"badge rounded-pill  badge-light-danger"
}
