


import { DOMAIN_CLIENT, DOMAIN_SERVER, LINK_DOMAIN, LINK_USER, SCREEN_DARK, SCREEN_LIGHT, SCREEN_THEME, SCREEN_THEME_MODE, SLASH } from "./commonConstants";

/**
* AUTHENTICATION 
*/
// export const createHeader = () => {
//     return {
//         headers: {
//             Authorization: 'Bearer ' + getToken()
//         }
//     }
// }
// export const getToken = () => {
//     return localStorage.getItem(CONST_LOGIN.ACCESS_TOKEN)
// }
// export const removeToken = () => {
//     return localStorage.removeItem(CONST_LOGIN.ACCESS_TOKEN)
// }
/**
* HANDLE DATE 
*/
export function getBeforeDateCurrent() {
    const oneDayAgo = getDateCurrent();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return oneDayAgo;
}
export const getDateCurrent = () => {
    try {
        const currentDateUTC = new Date();
        const timezoneOffset = 7 * 60;
        const utcTime = currentDateUTC.getTime() + (currentDateUTC.getTimezoneOffset() * 60000);
        return new Date(utcTime + (timezoneOffset * 60000));
    } catch (error) {
        console.error("getDateCurrent " + error);
    }

}
export function convertDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
}

/**
* HANDLE URL 
*/
export const getURICurrent = () => {
    return window.location.href;
}
export const createActionURL = (sub) => {
    const createUrl = (action) => `${DOMAIN_SERVER}/${sub}${action ? `/${action}` : ''}`;
    return {
        instant: () => createUrl(''),
        add: () => createUrl('add'),
        edit: () => createUrl('edit'),
        search: () => createUrl('search'),
        delete: () => createUrl('?id='),
        requestParam: (attribute) => {
            if (!Array.isArray(attribute) || attribute.length === 0) return createUrl('');
            let size = attribute.length;
            if (size === 1) {
                return createUrl(`?${attribute[0].key}=${attribute[0].value}`)
            }
            const queryParams = attribute.map(attr => `${attr.key}=${attr.value}`).join('&');
            return createUrl(`?${queryParams}`);
        }
    };
};
export const removeURIDomain = (urlCurrent) => {
    try {
        const size = DOMAIN_CLIENT.length;
        return urlCurrent.substring(size, urlCurrent.length);
    } catch (error) {
        return "";
    }
}
export const removeSlashURILast = (href) => {
    return href.endsWith(SLASH) ? href.slice(0, -1) : href;
};
export function removeURIAction(href) {
    return href.replace("/add", "").replace(/\/edit\/\d+/, "").replace(/\/view\/\d+/, "");
}
export function handlePathMenuAdmin(href) {
    return removeURIDomain(removeSlashURILast(href));
}
export function createUrlImage(file) {
    try {
        return URL.createObjectURL(file)
    } catch (error) {
        console.log(error)
    }
}
export function convertToJsonFile(data){
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    return blob;
}

export function convertFileToImg(files) {
    let images = [];
    let size = files.length;
    for (let i = 0; i < size; ++i) {
        console.log(files[i].type)
        images.push({
            "extension": files[i].type,
            "imageUrl": URL.createObjectURL(files[i]),
            "name": files[i].name
        })
    }
    return images;
}

export function getNameFile(keyName){
    try{
        return keyName.substring(keyName.lastIndexOf("/") + 1, keyName.lastIndexOf("."));
    }catch(error){
        console.error(keyName)
        return "";
    }
}
/**
* HANDLE Redirect 
*/
export const handleRedirectAdmin = () => {
    window.location.href = LINK_DOMAIN.domainAdmin
}
export const handleRedirectHome = () => {
    window.location.href = LINK_DOMAIN.domainClient
}
export const handleRedirectLogout = () => {
    window.location.href = `${LINK_USER.linkLogOut}`;
}
export const handleRedirectLogIn = () => {
    window.location.href = LINK_USER.linkLogin;
}


/**
* HANDLE EXCEPTION 
*/
export const handleArrayVariables = (data) => Array.isArray(data) ? data : [];

export const handleExceptionView = (props) => {
    const { code, error, dispatch } = props;
    console.log(code)
    switch (code) {
        case 403:
            handleRedirectHome()
            break;
        case 4006:
            handleRedirectLogIn()
            break;
        case 4007:
            window.location.href = LINK_USER.linkLogin;
            break;
        case 4008:
            console.log("ádasd")
            dispatch(fetchRefreshToken())
            break;
        default:
        // handleRedirectLogIn()
    }
}
/**
* HANDLE ASSIGN DATA  
*/
export const handleAssignData = (data) => ({
    updateArrayList: () => {
        return data?.payload?.result || [];
    },
    getStatusCode: () => {
        return data?.code || 9999;
    },
    updateObject: () => {
        return data?.payload?.result || null;
    }
});
/**
* HANDLE CHANGE SCREEN THEME 
*/
export const changeScreenTheme = (theme) => {
    if (theme === SCREEN_THEME_MODE.SCREEN_DARK.alias) {
        console.log(theme)
        localStorage.setItem(SCREEN_THEME, SCREEN_THEME_MODE.SCREEN_DARK.alias);
    } else {
        localStorage.setItem(SCREEN_THEME, SCREEN_THEME_MODE.SCREEN_LIGHT.alias);
    }

}
export const getScreenThem = (screen) => {
    return screen === SCREEN_THEME_MODE.SCREEN_DARK.alias ? SCREEN_DARK : SCREEN_LIGHT;
}
/**
* HANDLE STRING 
*/
export const removeStartZero = (str) => {
    return str.replace(/^0+/, '');
};

/**
* HANDLE MENU ADMIN 
*/
export const loadMenuParentActive = (menus) => {
    try {
        const resourceCurrent = removeURIDomain(getURICurrent());
        let matchingParent = null;
        let longestMatchLength = 0;
        menus.forEach((parent) => {
            if (parent.subMenus.length > 0) {
                parent.subMenus.forEach((child) => {
                    if (
                        resourceCurrent.length >= child.href.length &&
                        resourceCurrent.startsWith(child.href) &&
                        child.href.length > longestMatchLength
                    ) {
                        matchingParent = parent;
                        longestMatchLength = child.href.length;
                    }
                });
            }
        });

        if (matchingParent) {
            return matchingParent;
        }
    } catch (error) {
        console.error("Lỗi Hệ thống")
    }

}
/**
* DEBOUNCE
*/
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

