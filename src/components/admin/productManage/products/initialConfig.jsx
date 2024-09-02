import { typeSearchAdvanced } from "../../../../utils/commonConstants"
import { createActionURL } from "../../../../utils/commonUtils"

export const productsHttp = {
    actionURL: createActionURL('products'),
    productionNavigate:"/admin/products",
}
export const columnProducts = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Tên Sản Phẩm",
        style: {
            'width': "200px"
        }
    },
    {
        name: "HÌNH ẢNH",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Thương hiệu",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Loại Sản Phẩm",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Mô tả sản phẩm",
        style: {
            'width': "180px"
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
            display: "block"
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
            title: "Mã Sản phẩm",
            callApi: true,
            data: productsHttp.productsSky,
            search: { sky: null },
            component: typeSearchAdvanced.InputDataSearch
        },
        {
            title: "Loại Sản Phẩm",
            search: { productCategory: null },
            component: typeSearchAdvanced.SelectItemModel
        },
    ]
}
export const initialForm =
{
    name: "",
    code: "",
    description: "",
    sky: "",
    qtyInStock: null,
    price: 0,
    promotions: null,
    images: [],
    ProductCategory: null,
    Variation:null
}
export const optionActions = [
    {
        name: "Xem",
        icon: "fa-solid fa-eye mr-2"
    },
    {
        name: "Sửa",
        icon: "fa-solid fa-pencil mr-2"
    },
    {
        name: "Xóa",
        icon: "fa-regular fa-trash-can mr-2"
    }
]
export const queryParameterInitial = {
    size: 5,
    page: 0,
    criterias: {
        name: ""
    }
}