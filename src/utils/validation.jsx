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
    checkFunction: function (func){
        return typeof func === 'function';
    }
};   