
import { ALLOW_ARRAY_IMAGES } from "./commonConstants";
import differenceInYears from "date-fns/differenceInYears";
export const validation = {
    isEmailAddress: function (str) {
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: function (str) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: function (str) {
        var pattern = /^\d+\.?\d*$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame: function (str1, str2) {
        return str1 === str2;
    },
    isPercent: function (str) {
        const num = Number(str);
        return this.isNumber(str) && num >= 0 && num <= 100;
    },
    isBoolean: function (boolean) {
        return typeof boolean == "boolean";
    },
    isTypeImage: function (str) {
        const extension = str.split('.').pop().toLowerCase();
        return ALLOW_ARRAY_IMAGES.indexOf(extension) !== -1;
    },
    isString: function (str) {
        return (typeof str === 'string' || str instanceof String) ? true : false;
    },
    isArrayEmpty: function (array) {
        if (Array.isArray(array)) {
            return array.length == 0;
        }
        return false;
    },
    isFile: function (input) {
        if ('File' in window && input instanceof File)
            return true;
        else return false;
    },
    checkJsonString: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    checkArrayNotEmpty: function (array) {
        if (array && Array.isArray(array)) {
            return array.length > 0;
        }
        return false;
    },
    checkFileTypeImage: function (files) {
        if (files) {
            for (const value of files) {
                if (!validation.isTypeImage(value.name)) {
                    return false;
                }
            }
        }
        return true;
    },
    checkFileSize: function (files) {
        if (files) {
            for (const file of files) {
                if (file.size >= 10000000) {
                    return false;
                }
            }
        }
        return true;
    },
    checkFunction: function (func) {
        return typeof func === 'function';
    },
    checkStringNotEmpty: function (str) {
        return typeof str === 'string' && str instanceof String && str.length>0
    },
    isNumberKey: function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    },
    checkDateGraterThenDateCurrent: function (date) {
        if (date instanceof Date && !isNaN(date)) {
            const dateCurrent = new Date();
            if (dateCurrent.getFullYear() === date.getFullYear() && dateCurrent.getDate() === date.getDate()) {
                return true;
            }
        }
        return false;
    },
    checkBirthOfDate: function (value) {
        return differenceInYears(new Date(), new Date(value)) >= 18;
    },

};
export const regex = {
    string: /^[A-Za-zÀÁÂÃÈÊÌÒÓÔÙĂẰẲẴẸÊỄÌỌÔÙƯỨỲÝđĐâàầặêệễôươ\s]+$/,
    number: /^\d+\.?\d*$/,
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    phone: /^[0-9\-\+]{9,11}$/,
    cccd: /^[1-9]{12}$/,
    wordVi: /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơưĂĐĨŨƠƯẠỹ ]+/,
    fullName: /^([\p{Lu}][\p{Ll}]{1,8})(\s([\p{Lu}]|[\p{Lu}][\p{Ll}]{1,10})){0,5}$/u,
    characterNormal: /[a-z0-9]+$/,
    address: /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơưĂĐĨŨƠƯẠỹ -,/]/
}   