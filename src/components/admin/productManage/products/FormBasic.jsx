import { memo,  useMemo } from "react";
import FormManage from "../../common/FormManage";
import SaveAction from "../../common/SaveAction";
import ContentForm from "./ContentForm";
import { useDispatch } from "react-redux";
import {  LOADING_CONTENT_FORM } from "../../../../utils/commonConstants";
import { createActionURL } from "../../../../utils/commonUtils";
import { useFetchData } from "../../../../hook/fetch/authenticated/useFetchData";



function FormBasic() {

    const { data: variations, isPending: isPendingVariations } = useFetchData(createActionURL("products-variation").instant());
    const { data: variationOptions, isPending: isPendingVariationOptions} = useFetchData(createActionURL("products-variation-option").instant());
    const { data: productCategories, isPending: isPendingProductCategories } = useFetchData(createActionURL("product-category/children").instant());
    const { data: promotions, isPending: isPendingPromotions} = useFetchData(createActionURL("shop-promotion").instant());
    console.log(variations)
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (statusChildren === FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_INITIAL) {
    //         dispatch(findChildrenCategory())
    //     }
    //     if (statusVariation === FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_INITIAL) {
    //         dispatch(findAllVariation())
    //     }
    //     if (statusPromotion === FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_INITIAL) {
    //         dispatch(findAllPromotion())
    //     }
    //     if (statusVariationOptions === FETCH_VARIATION_OPTIONS.FETCH_VARIATION_OPTIONS_INITIAL) {
    //         dispatch(findAllVariationOption())
    //     }
    // }, [statusChildren, statusVariation, dispatch])
    const isLoading = useMemo(() => {
        return isPendingVariations || isPendingVariationOptions || isPendingProductCategories ||isPendingPromotions
    }, [isPendingVariations, isPendingVariationOptions, isPendingProductCategories])
    return (
        <div className={isLoading ? LOADING_CONTENT_FORM : ''}>
            <SaveAction />
            <FormManage Form={ContentForm} variations={variations} variationOptions={variationOptions} productCategories={productCategories} promotions={promotions}/>
        </div>
    )
}
export default memo(FormBasic);