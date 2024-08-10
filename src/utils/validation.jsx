import { isString } from "formik";
import { ALLOW_ARRAY_IMAGES } from "./commonConstants";

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
    isString: function (str){
        return (typeof str === 'string' || str instanceof String)?true:false; 
    }
    ,
    checkJsonString: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    checkArrayEmpty: function (array) {
        if (Array.isArray(array)) {
            return array && array.length > 0;
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
    isNumberKey: function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    },
    checkDateGraterThenDateCurrent: function (date) {
        if(date instanceof Date && !isNaN(date)){
            const dateCurrent = new Date();
            if(dateCurrent.getFullYear()===date.getFullYear() && dateCurrent.getDate()===date.getDate()){
                return true;
            }
        }
        return false;
    }
};
export const regex = {
    string :/^[A-Za-zÀÁÂÃÈÊÌÒÓÔÙĂẰẲẴẸÊỄÌỌÔÙƯỨỲÝđĐâàầặêệễôươ\s]+$/,
    number : /^\d+\.?\d*$/
}   