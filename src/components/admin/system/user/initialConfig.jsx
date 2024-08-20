
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
            'width': "70px"
        }
    }
    ,
    {
        name: "Tên Đăng Nhập ",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Avatar",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Email",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Trạng Thái",
        style: {
            'width': "100px"
        }
    }
    ,
    {
        name: "",
        style: {
            'width': "100px"
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
    items: []
}
export const initialForm =
{
    imgUrl:"",
    name: "",
    email:"",
    fullName:"",
    accountStatus:"",
    createDate:new Date(),
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
        role:null,
        accountStatus:null,
        includeDeleted:false
    }
}