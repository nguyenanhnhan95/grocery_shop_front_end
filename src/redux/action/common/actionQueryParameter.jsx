export const CHANGE_QUERY_PARAMETER={
    CHANGE_PAGE_QUERY_PARAMETER:"CHANGE_PAGE_QUERY_PARAMETER",
    CHANGE_SIZE_QUERY_PARAMETER:"CHANGE_SIZE_QUERY_PARAMETER",
    CHANGE_FILED_QUERY_PARAMETER:"CHANGE_FILED_QUERY_PARAMETER"
}
export const changeSizeQueryParameter=(data)=>{
    return{
        type:CHANGE_QUERY_PARAMETER.CHANGE_SIZE_QUERY_PARAMETER,
        data:data
    }
}
export const changePageQueryParameter=(data)=>{
    return{
        type:CHANGE_QUERY_PARAMETER.CHANGE_PAGE_QUERY_PARAMETER,
        data:data
    }
}
export const changeFiledQueryParameter=(data)=>{
    return{
        type:CHANGE_QUERY_PARAMETER.CHANGE_FILED_QUERY_PARAMETER,
        data:data
    }
}