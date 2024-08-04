import { useMemo } from "react"
import { useSelector } from "react-redux"

export const useScreenMode=()=>{
    const { screenMode } = useSelector((state) => state.profile)
    return useMemo(()=>({screenMode}),[screenMode])
}