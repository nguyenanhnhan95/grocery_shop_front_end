import React, { memo, useCallback, useEffect, useState } from "react";
import "../../../assets/css/admin/common/searchContentAdmin.css"
import { useSelector } from "react-redux";
import SearchNameAdmin from "./SearchNameAdmin";
import { componentsAdvanced } from "../../../utils/commonConstants";
function SearchContentAdmin(props) {
  const { itemSearch } = props;
  const { queryParameter } = useSelector(state => state.queryParameter)
  const [searchFiled, setSearchFiled] = useState({})
  useEffect(() => {
    if (queryParameter !== null) {
      setSearchFiled(queryParameter.criterias)
    }
  }, [queryParameter])
  const [show, setShow] = useState(false);
  const handleShowAdvanced = useCallback(() => {
    setShow(show => !show)
  }, [])
  return (
    <div className="search-content-admin">
      <form role="search">
        <div className={`container-fluid container-content-search ${show ? 'show' : ''}`} >
          <SearchNameAdmin handleShowAdvanced={handleShowAdvanced} itemSearch={itemSearch} searchFiled={searchFiled} setSearchFiled={setSearchFiled} />
          <div className="row container-content-search-advanced">
            {itemSearch.items.map((each, index) => {
              const Component = componentsAdvanced[each.component];
              if (!Component) {
                return null; // Skip rendering if the component is not defined
              }
              return (
                <Component
                  setSearchFiled={setSearchFiled}
                  searchFiled={searchFiled}
                  item={each}
                  key={index}
                />
              );
            })}

          </div>
        </div>
      </form>
    </div>
  )
}
export default memo(SearchContentAdmin);