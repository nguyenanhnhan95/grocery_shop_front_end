import { useSelector } from "react-redux";

function Test(){
    const { products } = useSelector((state) => state.product)
    console.log(products)
    return(
        <>
        </>
    )
}
export default Test;