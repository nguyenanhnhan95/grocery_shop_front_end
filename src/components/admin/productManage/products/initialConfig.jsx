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
            'min-width': "10px"
        }
    },
    {
        name: "HÌNH ẢNH",
        style: {
            'min-width': "95px"
        }
    },
    {
        name: "Tên Sản Phẩm",
        style: {
            'min-width': "250px"
        }
    },
    {
        name: "Mã Sản Phẩm",
        style: {
            'min-width': "250px"
        }
    },
    {
        name: "Loại Sản Phẩm",
        style: {
            'min-width': "150px"
        }
    },
    {
        name: "Khuyến Mãi",
        style: {
            'min-width': "150px"
        }
    },
    {
        name: "Giá Sản Phẩm",
        style: {
            'min-width': "95px"
        }
    },
    {
        name: "Giá Bán",
        style: {
            'min-width': "95px"
        }
    }
    ,
    {
        name: "",
        style: {
            'min-width': "150px"
        }
    }
]
export const productsAction = {
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
export const productsSearch = {
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
            component: typeSearchAdvanced.SelectItemSearch
        },
    ]
}
export const initialForm =
{
    name: "",
    code: "",
    description: "",
    sky: "",
    qtyInStock: 0,
    price: 0,
    promotions: null,
    images: [],
    ProductCategory: null,
    Variation:null
}
export const dataActions = [
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
export const queryParameter = {
    size: 5,
    page: 0,
    criterias: {
        name: ""
    }
}