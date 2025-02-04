module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/cloud/index.ts":
/*!********************************!*\
  !*** ./src/api/cloud/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var provider_1 = __webpack_require__(/*! ./provider */ "./src/api/cloud/provider/index.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var type_1 = __webpack_require__(/*! utils/type */ "./src/utils/type.ts");
var index_1 = __webpack_require__(/*! ../index */ "./src/api/index.ts");
var Cloud = /** @class */ (function () {
    function Cloud() {
        var _this = this;
        this.inited = false;
        this.services = {};
        this.exportAPI = {
            init: this.init.bind(this),
            registerService: function (serviceProvider) {
                _this.registerService(serviceProvider.createService(_this));
            }
        };
        index_1.registerServices(this);
        this.meta = {
            session_id: (+new Date).toString()
        };
        this.defaultConfig = {};
        this.provider = provider_1.default();
    }
    Cloud.prototype.getMetaData = function () {
        return this.meta;
    };
    Cloud.prototype.getDefaultConfig = function () {
        return this.defaultConfig;
    };
    Cloud.prototype.getOverriddenConfig = function (config, service) {
        var overriden = tslib_1.__assign({}, this.defaultConfig);
        Object.assign(overriden, config);
        if (service) {
            var env = this.getEnv(overriden, service);
            overriden.env = env;
        }
        return overriden;
    };
    Cloud.prototype.getEnv = function (config, service) {
        if (!config.env)
            return;
        switch (type_1.getType(config.env)) {
            case 'string': {
                return config.env;
            }
            case 'object': {
                return config.env[service];
            }
            default: {
                return;
            }
        }
    };
    Cloud.prototype.getAPIs = function () {
        return tslib_1.__assign({}, this.exportAPI);
    };
    Cloud.prototype.init = function (config) {
        if (config === void 0) { config = {}; }
        if (this.inited)
            return;
        this.inited = true;
        this.provider.init(config);
        this.defaultConfig = config;
    };
    Cloud.prototype.registerService = function (service) {
        this.services[service.name] = service;
        var functions = service.getAPIs();
        for (var name in functions) {
            this.registerFunction(name, functions[name]);
        }
    };
    Cloud.prototype.registerFunction = function (name, func) {
        var instance = this;
        this.exportAPI[name] = function () {
            if (!instance.inited) {
                throw new error_1.CloudSDKError({
                    errMsg: 'Cloud API isn\'t enabled, please call init first\n' +
                        '请先调用 init 完成初始化后再调用其他云 API。init 方法可传入一个对象用于设置默认配置，详见文档。'
                });
            }
            return func.apply(this, arguments);
        };
    };
    return Cloud;
}());
exports.Cloud = Cloud;
var cloud = new Cloud();
exports.default = cloud;


/***/ }),

/***/ "./src/api/cloud/provider/index.ts":
/*!*****************************************!*\
  !*** ./src/api/cloud/provider/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tcb_1 = __webpack_require__(/*! ./tcb */ "./src/api/cloud/provider/tcb/index.ts");
var PROVIDER;
(function (PROVIDER) {
    PROVIDER[PROVIDER["TCB"] = 0] = "TCB";
})(PROVIDER = exports.PROVIDER || (exports.PROVIDER = {}));
function getProvider(provider) {
    if (provider === void 0) { provider = PROVIDER.TCB; }
    switch (provider) {
        default: {
            return tcb_1.default;
        }
    }
}
exports.default = getProvider;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/callFunction.ts":
/*!********************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/callFunction.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function callFunction(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tcbInstance, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()
                    /*
                    const res = await tcbRequest({
                      params: {
                        action: 'functions.invokeFunction',
                        function_name: options.name,
                        request_data: options.dataStr,
                      },
                      // TODO
                      timeout: 5 * 60 * 1000,
                      config: mergeConfig(tcb.config, config),
                      method: 'post',
                      headers: {
                        'content-type': 'application/json'
                      }
                    })
                    */
                ];
                case 1:
                    _a.sent();
                    tcbInstance = tcb.config.envName === config.env ? tcb : tcb.init(config);
                    return [4 /*yield*/, tcbInstance.callFunction({
                            name: options.name,
                            data: options.data,
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: "requestID " + res.requestId + ", " + res.message,
                            requestId: res.requestId,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                result: res.result,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.callFunction = callFunction;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/callOpenAPI.ts":
/*!*******************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/callOpenAPI.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function callOpenAPI(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()
                    // console.log('wx-server-sdk tcb.callWxOpenApi options: ', options)
                ];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tcb.callWxOpenApi({
                            apiName: options.api,
                            requestData: options.data,
                            event: options.event,
                        })
                        // console.log('wx-server-sdk tcb.callWxOpenApi res: ', res)
                    ];
                case 2:
                    res = _a.sent();
                    // console.log('wx-server-sdk tcb.callWxOpenApi res: ', res)
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                result: res.result,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.callOpenAPI = callOpenAPI;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/database.ts":
/*!****************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/database.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var tcbRequest = __webpack_require__(/*! tcb-admin-node/src/utils/httpRequest */ "tcb-admin-node/src/utils/httpRequest");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var mergeConfig = function (tcbConfig, config) {
    var ret = tslib_1.__assign({}, tcbConfig);
    if (config.env) {
        ret.env = config.env;
    }
    return ret;
};
function addDocument(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // 不得已而 sleep(0)，因为 tcb-admin-node 的 httpRequest 在返回 promise 之前竟然有逻辑可能抛错 !!!!!
                return [4 /*yield*/, sleep()];
                case 1:
                    // 不得已而 sleep(0)，因为 tcb-admin-node 的 httpRequest 在返回 promise 之前竟然有逻辑可能抛错 !!!!!
                    _a.sent();
                    return [4 /*yield*/, tcbRequest({
                            params: {
                                action: 'database.addDocument',
                                _id: options._id,
                                collectionName: options.collectionName,
                                data: options.data,
                            },
                            config: mergeConfig(tcb.config, config),
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                _id: res.data._id,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.addDocument = addDocument;
function queryDocument(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tcbRequest({
                            params: tslib_1.__assign({}, options, { action: 'database.queryDocument', collectionName: options.collectionName }),
                            config: mergeConfig(tcb.config, config),
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                list: res.data.list || [],
                                limit: res.Limit,
                                offset: res.Offset,
                                total: res.TotalCount,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.queryDocument = queryDocument;
function updateDocument(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tcbRequest({
                            params: tslib_1.__assign({}, options, { action: 'database.updateDocument', collectionName: options.collectionName }),
                            config: mergeConfig(tcb.config, config),
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                updated: res.data.updated,
                                upsertedId: res.data.upserted_id,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateDocument = updateDocument;
function removeDocument(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tcbRequest({
                            params: tslib_1.__assign({}, options, { action: 'database.removeDocument', collectionName: options.collectionName }),
                            config: mergeConfig(tcb.config, config),
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                removed: res.deleted,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.removeDocument = removeDocument;
function countDocument(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tcbRequest({
                            params: tslib_1.__assign({}, options, { action: 'database.countDocument', collectionName: options.collectionName }),
                            config: mergeConfig(tcb.config, config),
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        return [2 /*return*/, {
                                total: res.data.total,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.countDocument = countDocument;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/deleteFile.ts":
/*!******************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/deleteFile.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var error_config_2 = __webpack_require__(/*! ../../../../../config/error.config */ "./src/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function deleteFile(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tcbInstance, res, fileList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    tcbInstance = tcb.config.envName === config.env ? tcb : tcb.init(config);
                    return [4 /*yield*/, tcbInstance.deleteFile({
                            fileList: options.fileList
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        fileList = (res.fileList || []).filter(function (s) { return Boolean(s); }).map(function (f) {
                            if (f.code && error_config_1.TCB_ERR_CODE[f.code] !== 0) {
                                var code = error_config_1.TCB_ERR_CODE[f.code] || error_config_1.TCB_ERR_CODE.SYS_ERR;
                                return {
                                    fileID: f.fileID,
                                    status: error_config_1.TCB_ERR_CODE[f.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                                    errMsg: error_config_2.ERR_CODE[code]
                                };
                            }
                            return {
                                fileID: f.fileID,
                                status: 0,
                                errMsg: 'ok',
                            };
                        });
                        //@ts-ignore
                        return [2 /*return*/, {
                                fileList: fileList,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteFile = deleteFile;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/downloadFile.ts":
/*!********************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/downloadFile.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function downloadFile(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var statusCode, tcbInstance, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    statusCode = 200;
                    tcbInstance = tcb.config.envName === config.env ? tcb : tcb.init(config);
                    return [4 /*yield*/, tcbInstance.downloadFile({
                            fileID: options.fileID
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    return [2 /*return*/, {
                            statusCode: statusCode,
                            fileContent: res.fileContent,
                        }];
            }
        });
    });
}
exports.downloadFile = downloadFile;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/getTempFileURL.ts":
/*!**********************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/getTempFileURL.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var error_config_2 = __webpack_require__(/*! ../../../../../config/error.config */ "./src/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function getTempFileURL(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tcbInstance, res, fileList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    tcbInstance = tcb.config.envName === config.env ? tcb : tcb.init(config);
                    return [4 /*yield*/, tcbInstance.getTempFileURL({
                            fileList: options.fileList,
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        fileList = (res.fileList || []).filter(function (s) { return Boolean(s); }).map(function (f, i) {
                            if (f.code && error_config_1.TCB_ERR_CODE[f.code] !== 0) {
                                var code = error_config_1.TCB_ERR_CODE[f.code] || error_config_1.TCB_ERR_CODE.SYS_ERR;
                                return {
                                    fileID: f.fileID,
                                    status: error_config_1.TCB_ERR_CODE[f.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                                    errMsg: error_config_2.ERR_CODE[code],
                                    maxAge: f.maxAge,
                                    tempFileURL: '',
                                };
                            }
                            return {
                                fileID: f.fileID,
                                status: 0,
                                errMsg: 'ok',
                                maxAge: f.maxAge,
                                tempFileURL: f.tempFileURL,
                            };
                        });
                        return [2 /*return*/, {
                                fileList: fileList,
                                requestId: res.requestId,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getTempFileURL = getTempFileURL;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/api/uploadFile.ts":
/*!******************************************************!*\
  !*** ./src/api/cloud/provider/tcb/api/uploadFile.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var error_config_1 = __webpack_require__(/*! ../config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function uploadFile(options, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var statusCode, tcbInstance, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep()];
                case 1:
                    _a.sent();
                    statusCode = -1;
                    tcbInstance = tcb.config.envName === config.env ? tcb : tcb.init(config);
                    return [4 /*yield*/, tcbInstance.uploadFile({
                            cloudPath: options.cloudPath,
                            fileContent: options.fileContent,
                        }, {
                            onResponseReceived: function (resp) {
                                statusCode = resp ? resp.statusCode : statusCode;
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (res.code && error_config_1.TCB_ERR_CODE[res.code] !== 0) {
                        throw {
                            errCode: error_config_1.TCB_ERR_CODE[res.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
                            errMsg: res.message,
                        };
                    }
                    else {
                        //@ts-ignore
                        return [2 /*return*/, {
                                fileID: res.fileID,
                                requestId: res.requestId,
                                statusCode: statusCode,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadFile = uploadFile;


/***/ }),

/***/ "./src/api/cloud/provider/tcb/config/error.config.ts":
/*!***********************************************************!*\
  !*** ./src/api/cloud/provider/tcb/config/error.config.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// provider should also register the error codes in src/config/error.config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCB_ERR_CODE = {
    // 通用
    SUCCESS: 0,
    SYS_ERR: -501001,
    SERVER_TIMEOUT: -501002,
    EXCEED_REQUEST_LIMIT: -501003,
    EXCEED_CONCURRENT_REQUEST_LIMIT: -501004,
    INVALIID_ENV: -501005,
    INVALID_COMMON_PARAM: -501006,
    INVALID_PARAM: -501007,
    INVALID_REQUEST_SOURCE: -501008,
    RESOURCE_NOT_INITIAL: -501009,
    // 数据库
    DATABASE_REQUEST_FAILED: -502001,
    DATABASE_INVALID_OPERRATOR: -502002,
    DATABASE_PERMISSION_DENIED: -502003,
    DATABASE_COLLECTION_EXCEED_LIMIT: -502004,
    DATABASE_COLLECTION_NOT_EXIST: -502005,
    // 文件
    STORAGE_REQUEST_FAIL: -503001,
    STORAGE_EXCEED_AUTHORITY: -503002,
    STORAGE_FILE_NONEXIST: -503003,
    STORAGE_SIGN_PARAM_INVALID: -503004,
    // 云函数
    FUNCTIONS_REQUEST_FAIL: -504001,
    FUNCTIONS_EXECUTE_FAIL: -504002,
};


/***/ }),

/***/ "./src/api/cloud/provider/tcb/index.ts":
/*!*********************************************!*\
  !*** ./src/api/cloud/provider/tcb/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var tcbRequest = __webpack_require__(/*! tcb-admin-node/src/utils/httpRequest */ "tcb-admin-node/src/utils/httpRequest");
var database_1 = __webpack_require__(/*! ./api/database */ "./src/api/cloud/provider/tcb/api/database.ts");
var callFunction_1 = __webpack_require__(/*! ./api/callFunction */ "./src/api/cloud/provider/tcb/api/callFunction.ts");
var downloadFile_1 = __webpack_require__(/*! ./api/downloadFile */ "./src/api/cloud/provider/tcb/api/downloadFile.ts");
var uploadFile_1 = __webpack_require__(/*! ./api/uploadFile */ "./src/api/cloud/provider/tcb/api/uploadFile.ts");
var deleteFile_1 = __webpack_require__(/*! ./api/deleteFile */ "./src/api/cloud/provider/tcb/api/deleteFile.ts");
var getTempFileURL_1 = __webpack_require__(/*! ./api/getTempFileURL */ "./src/api/cloud/provider/tcb/api/getTempFileURL.ts");
var callOpenAPI_1 = __webpack_require__(/*! ./api/callOpenAPI */ "./src/api/cloud/provider/tcb/api/callOpenAPI.ts");
var provider = {
    // init
    init: tcb.init.bind(tcb),
    get config() {
        return tcb.config;
    },
    // request
    sendRequest: function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, tcbRequest(tslib_1.__assign({ config: tcb.config, params: options.data }, options))];
            });
        });
    },
    // api
    api: {
        addDocument: database_1.addDocument,
        queryDocument: database_1.queryDocument,
        updateDocument: database_1.updateDocument,
        removeDocument: database_1.removeDocument,
        countDocument: database_1.countDocument,
        callFunction: callFunction_1.callFunction,
        downloadFile: downloadFile_1.downloadFile,
        uploadFile: uploadFile_1.uploadFile,
        deleteFile: deleteFile_1.deleteFile,
        getTempFileURL: getTempFileURL_1.getTempFileURL,
        callOpenAPI: callOpenAPI_1.callOpenAPI,
    }
};
exports.default = provider;


/***/ }),

/***/ "./src/api/database/api/api.ts":
/*!*************************************!*\
  !*** ./src/api/database/api/api.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __webpack_require__(/*! ./database */ "./src/api/database/api/database.ts");
function getAPIs(cloud) {
    return {
        database: database_1.default.bind(null, cloud),
    };
}
exports.getAPIs = getAPIs;


/***/ }),

/***/ "./src/api/database/api/database.ts":
/*!******************************************!*\
  !*** ./src/api/database/api/database.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var tcb = __webpack_require__(/*! tcb-admin-node */ "tcb-admin-node");
var collection_1 = __webpack_require__(/*! ./database/collection */ "./src/api/database/api/database/collection.ts");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var error_checker_1 = __webpack_require__(/*! ./database/helper/error-checker */ "./src/api/database/api/database/helper/error-checker.ts");
var __1 = __webpack_require__(/*! .. */ "./src/api/database/index.ts");
function getDatabase(cloud, config) {
    var Database = getDatabaseClass(cloud);
    return new Database(config);
}
exports.default = getDatabase;
var getDatabaseClass = function (cloud) {
    return /** @class */ (function () {
        function Database(config) {
            if (config === void 0) { config = {}; }
            var instance = this;
            this.cloud = cloud;
            this.config = config;
            if (config.env) {
                assert_1.assertType(config.env, 'string');
            }
            var overridenConfig = cloud.getOverriddenConfig(config || {}, __1.DATABASE_SERVICE_NAME);
            var tcbInstance = tcb.init(overridenConfig);
            this._db = tcbInstance.database();
            this.command = this._db.command;
            this.Geo = this._db.Geo;
            this.serverDate = this._db.serverDate;
            this.RegExp = this._db.RegExp;
        }
        Database.prototype.collection = function (collectionName) {
            return new collection_1.CollectionReference(this._db.collection(collectionName), collectionName, this);
        };
        Database.prototype.createCollection = function (collectionName) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var apiName, result, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            apiName = 'createCollection';
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this._db.createCollection(collectionName)];
                        case 2:
                            result = _a.sent();
                            error_checker_1.checkError(result);
                            return [2 /*return*/, {
                                    errMsg: msg_1.apiSuccessMsg(apiName),
                                    requestId: result.requestId,
                                }];
                        case 3:
                            e_1 = _a.sent();
                            return [2 /*return*/, error_1.returnAsFinalCloudSDKError(e_1, apiName)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return Database;
    }());
};


/***/ }),

/***/ "./src/api/database/api/database/collection.ts":
/*!*****************************************************!*\
  !*** ./src/api/database/api/database/collection.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var query_1 = __webpack_require__(/*! ./query */ "./src/api/database/api/database/query.ts");
var document_1 = __webpack_require__(/*! ./document */ "./src/api/database/api/database/document.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_checker_1 = __webpack_require__(/*! ./helper/error-checker */ "./src/api/database/api/database/helper/error-checker.ts");
var CollectionReference = /** @class */ (function (_super) {
    tslib_1.__extends(CollectionReference, _super);
    function CollectionReference(_collection, collectionName, database) {
        var _this = _super.call(this, _collection, collectionName, database) || this;
        _this._collection = _collection;
        _this.collectionName = collectionName;
        _this.database = database;
        return _this;
    }
    CollectionReference.prototype.doc = function (docId) {
        return new document_1.DocumentReference(this._collection.doc(docId), this, docId, this.database);
    };
    CollectionReference.prototype.add = function (options) {
        var _this = this;
        var apiName = 'collection.add';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var addResult, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        assert_1.assertType(options, {
                            data: 'object'
                        });
                        assert_1.assertObjectNotEmpty({
                            name: 'options.data',
                            target: options.data,
                        });
                        return [4 /*yield*/, this._collection.add(options.data)];
                    case 1:
                        addResult = _a.sent();
                        error_checker_1.checkError(addResult);
                        resolve({
                            _id: addResult.id,
                            errMsg: msg_1.apiSuccessMsg(apiName),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_1, apiName));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return CollectionReference;
}(query_1.Query));
exports.CollectionReference = CollectionReference;


/***/ }),

/***/ "./src/api/database/api/database/document.ts":
/*!***************************************************!*\
  !*** ./src/api/database/api/database/document.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_checker_1 = __webpack_require__(/*! ./helper/error-checker */ "./src/api/database/api/database/helper/error-checker.ts");
var GET_API_NAME = 'document.get';
var UPDATE_API_NAME = 'document.update';
var SET_API_NAME = 'document.set';
var REMOVE_API_NAME = 'document.remove';
var DocumentReference = /** @class */ (function () {
    function DocumentReference(_document, collection, docId, database) {
        this._document = _document;
        this.collection = collection;
        this.database = database;
        this._id = docId;
    }
    DocumentReference.prototype.field = function (object) {
        assert_1.assertRequiredParam(object, 'object', 'field');
        assert_1.assertType(object, 'object', 'field');
        return new DocumentReference(this._document.field(object), this.collection, this._id, this.database);
    };
    DocumentReference.prototype.get = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _id, queryResult, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = this._id;
                        return [4 /*yield*/, this._document.get()];
                    case 1:
                        queryResult = _a.sent();
                        error_checker_1.checkError(queryResult);
                        if (!queryResult.data || !queryResult.data.length) {
                            throw "document with _id " + _id + " does not exist";
                        }
                        resolve({
                            data: queryResult.data[0],
                            errMsg: msg_1.apiSuccessMsg(GET_API_NAME),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_1, GET_API_NAME));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    DocumentReference.prototype.set = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _id, setResult, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        assert_1.assertType(options, {
                            data: 'object',
                        });
                        assert_1.assertObjectNotEmpty({
                            name: 'options.data',
                            target: options.data,
                        });
                        _id = this._id;
                        return [4 /*yield*/, this._document.set(options.data)];
                    case 1:
                        setResult = _a.sent();
                        error_checker_1.checkError(setResult);
                        resolve({
                            _id: _id,
                            errMsg: msg_1.apiSuccessMsg(SET_API_NAME),
                            stats: {
                                updated: setResult.updated,
                                created: setResult.upsertedId ? 1 : 0,
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_2, SET_API_NAME));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    DocumentReference.prototype.update = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var updateResult, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        assert_1.assertType(options, {
                            data: 'object',
                        });
                        assert_1.assertObjectNotEmpty({
                            name: 'options.data',
                            target: options.data,
                        });
                        return [4 /*yield*/, this._document.update(options.data)];
                    case 1:
                        updateResult = _a.sent();
                        error_checker_1.checkError(updateResult);
                        resolve({
                            stats: {
                                updated: updateResult.updated,
                            },
                            errMsg: msg_1.apiSuccessMsg(UPDATE_API_NAME),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_3, UPDATE_API_NAME));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    DocumentReference.prototype.remove = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var removeResult, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._document.remove()];
                    case 1:
                        removeResult = _a.sent();
                        error_checker_1.checkError(removeResult);
                        resolve({
                            stats: {
                                removed: removeResult.deleted || 0,
                            },
                            errMsg: msg_1.apiSuccessMsg(REMOVE_API_NAME),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_4, REMOVE_API_NAME));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return DocumentReference;
}());
exports.DocumentReference = DocumentReference;


/***/ }),

/***/ "./src/api/database/api/database/helper/error-checker.ts":
/*!***************************************************************!*\
  !*** ./src/api/database/api/database/helper/error-checker.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var error_config_1 = __webpack_require__(/*! api/cloud/provider/tcb/config/error.config */ "./src/api/cloud/provider/tcb/config/error.config.ts");
function checkError(tcbResult) {
    if (tcbResult && tcbResult.code) {
        throw error_1.returnAsCloudSDKError({
            errCode: error_config_1.TCB_ERR_CODE[tcbResult.code] || error_config_1.TCB_ERR_CODE.SYS_ERR,
            errMsg: tcbResult.message,
        });
    }
}
exports.checkError = checkError;


/***/ }),

/***/ "./src/api/database/api/database/query.ts":
/*!************************************************!*\
  !*** ./src/api/database/api/database/query.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var error_checker_1 = __webpack_require__(/*! ./helper/error-checker */ "./src/api/database/api/database/helper/error-checker.ts");
var ORDER_DIRECTION;
(function (ORDER_DIRECTION) {
    ORDER_DIRECTION["ASC"] = "asc";
    ORDER_DIRECTION["DESC"] = "desc";
})(ORDER_DIRECTION = exports.ORDER_DIRECTION || (exports.ORDER_DIRECTION = {}));
var Query = /** @class */ (function () {
    function Query(_query, collectionName, database) {
        this._query = _query;
        this.collectionName = collectionName;
        this.database = database;
    }
    Query.prototype.field = function (object) {
        return new Query(this._query.field(object), this.collectionName, this.database);
    };
    Query.prototype.where = function (condition) {
        return new Query(this._query.where(condition), this.collectionName, this.database);
    };
    Query.prototype.orderBy = function (fieldPath, order) {
        return new Query(this._query.orderBy(fieldPath, order), this.collectionName, this.database);
    };
    Query.prototype.limit = function (max) {
        return new Query(this._query.limit(max), this.collectionName, this.database);
    };
    Query.prototype.skip = function (offset) {
        return new Query(this._query.skip(offset), this.collectionName, this.database);
    };
    Query.prototype.get = function (options) {
        var _this = this;
        var apiName = 'collection.get';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var queryResult, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._query.get()];
                    case 1:
                        queryResult = _a.sent();
                        error_checker_1.checkError(queryResult);
                        resolve({
                            data: queryResult.data,
                            errMsg: msg_1.apiSuccessMsg(apiName),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_1, apiName));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Query.prototype.update = function (options) {
        var _this = this;
        var apiName = 'collection.update';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var updateResult, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        assert_1.assertType(options, {
                            data: 'object',
                        });
                        assert_1.assertObjectNotEmpty({
                            name: 'options.data',
                            target: options.data,
                        });
                        return [4 /*yield*/, this._query.update(options.data)];
                    case 1:
                        updateResult = _a.sent();
                        error_checker_1.checkError(updateResult);
                        resolve({
                            stats: {
                                updated: updateResult.updated || 0,
                            },
                            errMsg: msg_1.apiSuccessMsg(apiName),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_2, apiName));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Query.prototype.remove = function (options) {
        var _this = this;
        var apiName = 'collection.remove';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var removeResult, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._query.remove()];
                    case 1:
                        removeResult = _a.sent();
                        error_checker_1.checkError(removeResult);
                        resolve({
                            stats: {
                                removed: removeResult.deleted,
                            },
                            errMsg: msg_1.apiSuccessMsg(apiName),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_3, apiName));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Query.prototype.count = function (options) {
        var _this = this;
        var apiName = 'collection.count';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var queryResult, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._query.count()];
                    case 1:
                        queryResult = _a.sent();
                        error_checker_1.checkError(queryResult);
                        resolve({
                            total: queryResult.total,
                            errMsg: msg_1.apiSuccessMsg(apiName),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        reject(error_1.returnAsFinalCloudSDKError(err_4, apiName));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return Query;
}());
exports.Query = Query;


/***/ }),

/***/ "./src/api/database/index.ts":
/*!***********************************!*\
  !*** ./src/api/database/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(/*! ./api/api */ "./src/api/database/api/api.ts");
exports.DATABASE_SERVICE_NAME = 'database';
function createDatabaseService(cloud) {
    return {
        name: exports.DATABASE_SERVICE_NAME,
        getAPIs: api_1.getAPIs.bind(null, cloud),
    };
}
function registerService(cloud) {
    cloud.registerService(createDatabaseService(cloud));
}
exports.registerService = registerService;


/***/ }),

/***/ "./src/api/functions/api/api.ts":
/*!**************************************!*\
  !*** ./src/api/functions/api/api.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callFunction_1 = __webpack_require__(/*! ./callFunction */ "./src/api/functions/api/callFunction.ts");
function getAPIs(cloud) {
    return {
        callFunction: callFunction_1.default(cloud),
    };
}
exports.getAPIs = getAPIs;


/***/ }),

/***/ "./src/api/functions/api/callFunction.ts":
/*!***********************************************!*\
  !*** ./src/api/functions/api/callFunction.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var __1 = __webpack_require__(/*! .. */ "./src/api/functions/index.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
function getCallFunction(cloud) {
    return function callFunction(options) {
        var _this = this;
        var apiName = 'callFunction';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, parsedResult, e_1, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError({
                                    errMsg: 'Params for callFunction must be an object instead of ' + typeof options,
                                }, apiName))];
                        }
                        try {
                            assert_1.assertType(options, {
                                name: 'string'
                            });
                            if (options.hasOwnProperty('data')) {
                                assert_1.assertType(options, {
                                    data: 'object'
                                });
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e, apiName))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloud.provider.api.callFunction({
                                name: options.name,
                                data: options.data || {},
                            }, cloud.getOverriddenConfig(options.config || {}, __1.FUNCTIONS_SERVICE_NAME))];
                    case 2:
                        result = _a.sent();
                        parsedResult = result.result;
                        try {
                            if (typeof parsedResult === 'string') {
                                parsedResult = JSON.parse(result.result);
                            }
                        }
                        catch (_) {
                            // no nothing
                        }
                        return [2 /*return*/, resolve({
                                result: parsedResult,
                                errMsg: msg_1.apiSuccessMsg(apiName),
                                requestID: result.requestId,
                            })];
                    case 3:
                        e_1 = _a.sent();
                        error = error_1.returnAsFinalCloudSDKError(e_1, apiName);
                        // @ts-ignore
                        error.requestID = e_1.requestID;
                        return [2 /*return*/, reject(error)];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
}
exports.default = getCallFunction;


/***/ }),

/***/ "./src/api/functions/index.ts":
/*!************************************!*\
  !*** ./src/api/functions/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(/*! ./api/api */ "./src/api/functions/api/api.ts");
exports.FUNCTIONS_SERVICE_NAME = 'functions';
function createFunctionsService(cloud) {
    return {
        name: exports.FUNCTIONS_SERVICE_NAME,
        getAPIs: api_1.getAPIs.bind(null, cloud),
    };
}
function registerService(cloud) {
    cloud.registerService(createFunctionsService(cloud));
}
exports.registerService = registerService;


/***/ }),

/***/ "./src/api/index.ts":
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __webpack_require__(/*! ./database */ "./src/api/database/index.ts");
var storage_1 = __webpack_require__(/*! ./storage */ "./src/api/storage/index.ts");
var functions_1 = __webpack_require__(/*! ./functions */ "./src/api/functions/index.ts");
var open_1 = __webpack_require__(/*! ./open */ "./src/api/open/index.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/api/utils/index.ts");
function registerServices(cloud) {
    database_1.registerService(cloud);
    storage_1.registerService(cloud);
    functions_1.registerService(cloud);
    open_1.registerService(cloud);
    utils_1.registerService(cloud);
}
exports.registerServices = registerServices;


/***/ }),

/***/ "./src/api/open/api/api.ts":
/*!*********************************!*\
  !*** ./src/api/open/api/api.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callOpenAPI_1 = __webpack_require__(/*! ./callOpenAPI */ "./src/api/open/api/callOpenAPI.ts");
function getAPIs(cloud) {
    return {
        callOpenAPI: callOpenAPI_1.default(cloud),
    };
}
exports.getAPIs = getAPIs;


/***/ }),

/***/ "./src/api/open/api/callOpenAPI.ts":
/*!*****************************************!*\
  !*** ./src/api/open/api/callOpenAPI.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
function getCallOpenAPI(cloud) {
    return function callOpenAPI(options) {
        var _this = this;
        var apiName = 'callOpenAPI';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, parsedResult, e_1, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError({
                                    errMsg: 'Params for callOpenAPI must be an object instead of ' + typeof options,
                                }, apiName))];
                        }
                        try {
                            assert_1.assertType(options, {
                                api: 'string'
                            });
                            if (options.data) {
                                assert_1.assertType(options, {
                                    data: 'object'
                                });
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e, apiName))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloud.provider.api.callOpenAPI({
                                api: options.api,
                                data: options.data || {},
                            }, options.config || {})];
                    case 2:
                        result = _a.sent();
                        parsedResult = result.result;
                        try {
                            if (typeof parsedResult === 'string') {
                                parsedResult = JSON.parse(result.result);
                            }
                        }
                        catch (_) {
                            // no nothing
                        }
                        return [2 /*return*/, resolve({
                                result: parsedResult,
                                errMsg: msg_1.apiSuccessMsg(apiName),
                            })];
                    case 3:
                        e_1 = _a.sent();
                        error = error_1.returnAsFinalCloudSDKError(e_1, apiName);
                        return [2 /*return*/, reject(error)];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
}
exports.default = getCallOpenAPI;


/***/ }),

/***/ "./src/api/open/index.ts":
/*!*******************************!*\
  !*** ./src/api/open/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(/*! ./api/api */ "./src/api/open/api/api.ts");
var OPEN_SERVICE_NAME = 'open';
function createOpenService(cloud) {
    return {
        name: OPEN_SERVICE_NAME,
        getAPIs: api_1.getAPIs.bind(null, cloud),
    };
}
function registerService(cloud) {
    cloud.registerService(createOpenService(cloud));
}
exports.registerService = registerService;


/***/ }),

/***/ "./src/api/storage/api/api.ts":
/*!************************************!*\
  !*** ./src/api/storage/api/api.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uploadFile_1 = __webpack_require__(/*! ./uploadFile */ "./src/api/storage/api/uploadFile.ts");
var downloadFile_1 = __webpack_require__(/*! ./downloadFile */ "./src/api/storage/api/downloadFile.ts");
var getTempFileURL_1 = __webpack_require__(/*! ./getTempFileURL */ "./src/api/storage/api/getTempFileURL.ts");
var deleteFile_1 = __webpack_require__(/*! ./deleteFile */ "./src/api/storage/api/deleteFile.ts");
function getAPIs(cloud) {
    return {
        uploadFile: uploadFile_1.default(cloud),
        downloadFile: downloadFile_1.default(cloud),
        getTempFileURL: getTempFileURL_1.default(cloud),
        deleteFile: deleteFile_1.default(cloud),
    };
}
exports.getAPIs = getAPIs;


/***/ }),

/***/ "./src/api/storage/api/deleteFile.ts":
/*!*******************************************!*\
  !*** ./src/api/storage/api/deleteFile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var __1 = __webpack_require__(/*! .. */ "./src/api/storage/index.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
function getDeleteFile(cloud) {
    return function deleteFile(options) {
        var _this = this;
        var apiName = 'deleteFile';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError({
                                    errMsg: 'Params for deleteFile must be an object instead of ' + typeof options,
                                }, apiName))];
                        }
                        try {
                            assert_1.assertType(options, {
                                fileList: 'array'
                            });
                            options.fileList.forEach(function (f, i) {
                                if (typeof f !== 'string') {
                                    throw new Error("Type of fileList[" + i + "] must be string instead of " + typeof f);
                                }
                            });
                        }
                        catch (e) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e, apiName))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloud.provider.api.deleteFile({
                                fileList: options.fileList
                            }, cloud.getOverriddenConfig(options.config || {}, __1.STORAGE_SERVICE_NAME))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, resolve({
                                fileList: result.fileList,
                                errMsg: msg_1.apiSuccessMsg(apiName),
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e_1, apiName))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
}
exports.default = getDeleteFile;


/***/ }),

/***/ "./src/api/storage/api/downloadFile.ts":
/*!*********************************************!*\
  !*** ./src/api/storage/api/downloadFile.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var __1 = __webpack_require__(/*! .. */ "./src/api/storage/index.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
function getDownloadFile(cloud) {
    return function downloadFile(options) {
        var _this = this;
        var apiName = 'downloadFile';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError({
                                    errMsg: 'Params for downloadFile must be an object instead of ' + typeof options,
                                }, apiName))];
                        }
                        try {
                            assert_1.assertType(options, {
                                fileID: 'string',
                            });
                        }
                        catch (e) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e, apiName))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloud.provider.api.downloadFile({
                                fileID: options.fileID,
                            }, cloud.getOverriddenConfig(options.config || {}, __1.STORAGE_SERVICE_NAME))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, resolve({
                                fileContent: result.fileContent,
                                statusCode: result.statusCode,
                                errMsg: msg_1.apiSuccessMsg(apiName),
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e_1, apiName))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
}
exports.default = getDownloadFile;


/***/ }),

/***/ "./src/api/storage/api/getTempFileURL.ts":
/*!***********************************************!*\
  !*** ./src/api/storage/api/getTempFileURL.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var __1 = __webpack_require__(/*! .. */ "./src/api/storage/index.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
function getGetTempFileURL(cloud) {
    return function getTempFileURL(options) {
        var _this = this;
        var apiName = 'getTempFileURL';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError({
                                    errMsg: 'Params for getTempFileURL must be an object instead of ' + typeof options,
                                }, apiName))];
                        }
                        try {
                            assert_1.assertType(options, {
                                fileList: 'array',
                            });
                        }
                        catch (e) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e, apiName))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloud.provider.api.getTempFileURL({
                                fileList: options.fileList,
                            }, cloud.getOverriddenConfig(options.config || {}, __1.STORAGE_SERVICE_NAME))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, resolve({
                                fileList: result.fileList,
                                errMsg: msg_1.apiSuccessMsg(apiName),
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e_1, apiName))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
}
exports.default = getGetTempFileURL;


/***/ }),

/***/ "./src/api/storage/api/uploadFile.ts":
/*!*******************************************!*\
  !*** ./src/api/storage/api/uploadFile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var assert_1 = __webpack_require__(/*! utils/assert */ "./src/utils/assert.ts");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var __1 = __webpack_require__(/*! .. */ "./src/api/storage/index.ts");
var msg_1 = __webpack_require__(/*! utils/msg */ "./src/utils/msg.ts");
function getUploadFile(cloud) {
    return function uploadFile(options) {
        var _this = this;
        var apiName = 'uploadFile';
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var header, result, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError({
                                    errMsg: 'Params for uploadFile must be an object instead of ' + typeof options,
                                }, apiName))];
                        }
                        try {
                            assert_1.assertType(options, {
                                cloudPath: 'string',
                            });
                            if (!options.fileContent) {
                                return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(new Error('Type of fileContent must be fs.ReadStream instead of ' + typeof options.fileContent), apiName))];
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e, apiName))];
                        }
                        header = options.header || {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloud.provider.api.uploadFile({
                                fileContent: options.fileContent,
                                cloudPath: options.cloudPath,
                                header: header,
                            }, cloud.getOverriddenConfig(options.config || {}, __1.STORAGE_SERVICE_NAME))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, resolve({
                                fileID: result.fileID,
                                statusCode: result.statusCode,
                                errMsg: msg_1.apiSuccessMsg(apiName),
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, reject(error_1.returnAsFinalCloudSDKError(e_1, apiName))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
}
exports.default = getUploadFile;


/***/ }),

/***/ "./src/api/storage/index.ts":
/*!**********************************!*\
  !*** ./src/api/storage/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(/*! ./api/api */ "./src/api/storage/api/api.ts");
exports.STORAGE_SERVICE_NAME = 'storage';
function createStorageService(cloud) {
    return {
        name: exports.STORAGE_SERVICE_NAME,
        getAPIs: api_1.getAPIs.bind(null, cloud),
    };
}
function registerService(cloud) {
    cloud.registerService(createStorageService(cloud));
}
exports.registerService = registerService;


/***/ }),

/***/ "./src/api/utils/api/api.ts":
/*!**********************************!*\
  !*** ./src/api/utils/api/api.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getWXContext_1 = __webpack_require__(/*! ./getWXContext */ "./src/api/utils/api/getWXContext.ts");
function getAPIs() {
    return {
        getWXContext: getWXContext_1.default,
    };
}
exports.getAPIs = getAPIs;


/***/ }),

/***/ "./src/api/utils/api/getWXContext.ts":
/*!*******************************************!*\
  !*** ./src/api/utils/api/getWXContext.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var error_1 = __webpack_require__(/*! utils/error */ "./src/utils/error.ts");
var WX_PREFIX = 'WX_';
var CONTEXT_KEYS_BLACKLIST = [
    'API_TOKEN',
];
function isContextKeyInBlacklist(key) {
    return CONTEXT_KEYS_BLACKLIST.some(function (v) { return v === key || (WX_PREFIX + v) === key; });
}
exports.isContextKeyInBlacklist = isContextKeyInBlacklist;
function isNumber(val) {
    return /^[-]?\d+$/.test(val);
}
exports.isNumber = isNumber;
function getWXContext() {
    var e_1, _a;
    var apiName = 'getWXContext';
    if (!process.env.WX_CONTEXT_KEYS)
        return {};
    try {
        var contextKeys = process.env.WX_CONTEXT_KEYS.split(',');
        var wxContext = {};
        try {
            for (var contextKeys_1 = tslib_1.__values(contextKeys), contextKeys_1_1 = contextKeys_1.next(); !contextKeys_1_1.done; contextKeys_1_1 = contextKeys_1.next()) {
                var key = contextKeys_1_1.value;
                if (!key)
                    continue;
                if (isContextKeyInBlacklist(key))
                    continue;
                var val = process.env[key];
                if (val === undefined)
                    continue;
                if (isNumber(val)) {
                    val = parseInt(val);
                }
                if (key.startsWith(WX_PREFIX) && key.length > 3) {
                    wxContext[key.slice(3)] = val;
                }
                else {
                    wxContext[key] = val;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (contextKeys_1_1 && !contextKeys_1_1.done && (_a = contextKeys_1.return)) _a.call(contextKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return wxContext;
    }
    catch (e) {
        var error = error_1.returnAsFinalCloudSDKError(e, apiName);
        throw error;
    }
}
exports.default = getWXContext;


/***/ }),

/***/ "./src/api/utils/index.ts":
/*!********************************!*\
  !*** ./src/api/utils/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(/*! ./api/api */ "./src/api/utils/api/api.ts");
var UTILS_SERVICE_NAME = 'utils';
function createUtilsService() {
    return {
        name: UTILS_SERVICE_NAME,
        getAPIs: api_1.getAPIs,
    };
}
function registerService(cloud) {
    cloud.registerService(createUtilsService());
}
exports.registerService = registerService;


/***/ }),

/***/ "./src/config/error.config.ts":
/*!************************************!*\
  !*** ./src/config/error.config.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR_CODE = {
    '-1': 'unknown error',
    UNKNOWN_ERROR: -1,
    // 以 6 开始的是由微信服务器侧产生的错误码
    // 以 5 开始的是由腾讯云侧产生的错误码
    // 以 4 开始的是本地 SDK 产生的错误
    // 接下来两位表示具体业务类型：01通用，02数据库，03文件，04云函数
    // 最后三位表示具体的错误
    // 小程序 SDK 云函数
    '-404001': 'empty call result',
    SDK_FUNCTIONS_EMPTY_CALL_RESULT: -404001,
    '-404002': 'empty event id',
    SDK_FUNCTIONS_EMPTY_EVENT_ID: -404002,
    '-404003': 'empty poll url',
    SDK_FUNCTIONS_EMPTY_POLL_URL: -404003,
    '-404004': 'empty poll result json',
    SDK_FUNCTIONS_EMPTY_POLL_RESULT_JSON: -404004,
    '-404005': 'exceed max poll retry',
    SDK_FUNCTIONS_EXCEED_MAX_POLL_RETRY: -404005,
    '-404006': 'empty poll result base resp',
    SDK_FUNCTIONS_EMPTY_POLL_RESULT_BASE_RESP: -404006,
    '-404007': 'error while polling for the result, poll result base resp ret %s',
    SDK_FUNCTIONS_POLL_RESULT_BASE_RESP_RET_ABNORMAL: -404007,
    '-404008': 'error while polling for the result, polling server return a status code of %s',
    SDK_FUNCTIONS_POLL_RESULT_STATUS_CODE_ERROR: -404008,
    '-404009': 'error while polling for the result: %s',
    SDK_FUNCTIONS_POLL_ERROR: -404009,
    // 微信服务器
    '-601001': 'system error',
    WX_SYSTEM_ERROR: -601001,
    '-601002': 'system args error',
    WX_SYSTEM_ARGS_ERROR: -601002,
    '-601003': 'system network error',
    WX_SYSTEM_NETWORK_ERROR: -601003,
    // 腾讯云通用
    '-501001': 'resource system error',
    TCB_RESOURCE_SYSTEM_ERROR: -501001,
    '-501002': 'resource server timeout',
    TCB_RESOURCE_SERVER_TIMEOUT: -501002,
    '-501003': 'exceed request limit',
    TCB_EXCEED_REQUEST_LIMIT: -501003,
    '-501004': 'exceed concurrent request limit',
    TCB_EXCEED_CONCURRENT_REQUEST_LIMIT: -501004,
    '-501005': 'invalid env',
    TCB_INVALID_ENV: -501005,
    '-501006': 'invalid common parameters',
    TCB_INVALID_COMMON_PARAM: -501006,
    '-501007': 'invalid parameters',
    TCB_INVALID_PARAM: -501007,
    '-501008': 'invalid request source',
    TCB_INVALID_REQUEST_SOURCE: -501008,
    '-501009': 'resource not initialized',
    TCB_RESOURCE_NOT_INITIALIZED: -501009,
    // 腾讯云数据库
    '-502001': 'database request fail',
    TCB_DB_REQUEST_FAIL: -502001,
    '-502002': 'database invalid command',
    TCB_DB_INVALID_COMMAND: -502002,
    '-502003': 'database permission denied',
    TCB_DB_PERMISSION_DENIED: -502003,
    '-502004': 'database exceed collection limit',
    TCB_DB_EXCEED_COLLECTION_LIMIT: -502004,
    '-502005': 'database collection not exists',
    TCB_DB_COLLECTION_NOT_EXISTS: -502005,
    // 腾讯云文件管理
    '-503001': 'storage request fail',
    TCB_STORAGE_REQUEST_FAIL: -503001,
    '-503002': 'storage permission denied',
    TCB_STORAGE_PERMISSION_DENIED: -503002,
    '-503003': 'storage file not exists',
    TCB_STORAGE_FILE_NOT_EXISTS: -503003,
    '-503004': 'storage invalid sign parameter',
    TCB_STORAGE_INVALID_SIGN_PARAM: -503004,
    // 腾讯云云函数
    '-504001': 'functions request fail',
    TCB_FUNCTIONS_REQUEST_FAIL: -504001,
    '-504002': 'functions execute fail',
    TCB_FUNCTIONS_EXEC_FAIL: -504002,
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var cloud_1 = __webpack_require__(/*! ./api/cloud */ "./src/api/cloud/index.ts");
module.exports = cloud_1.default.exportAPI;


/***/ }),

/***/ "./src/utils/assert.ts":
/*!*****************************!*\
  !*** ./src/utils/assert.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = __webpack_require__(/*! ./type */ "./src/utils/type.ts");
var error_1 = __webpack_require__(/*! ./error */ "./src/utils/error.ts");
var error_config_1 = __webpack_require__(/*! config/error.config */ "./src/config/error.config.ts");
function sameType(input, ref, name) {
    function sameTypeImpl(input, ref, name) {
        var inputType = type_1.getType(input);
        var refType = type_1.getType(ref);
        if (inputType !== refType) {
            return name + " should be " + refType + " instead of " + inputType + "; ";
        }
        var errors = '';
        switch (inputType) {
            case 'object': {
                for (var key in ref) {
                    errors += sameTypeImpl(input[key], ref[key], name + "." + key);
                }
                break;
            }
            case 'array': {
                for (var i = 0; i < ref.length; i++) {
                    errors += sameTypeImpl(input[i], ref[i], name + "[" + i + "]");
                }
                break;
            }
            default: {
                break;
            }
        }
        return errors;
    }
    var error = sameTypeImpl(input, ref, name);
    return {
        passed: !error,
        reason: error,
    };
}
exports.sameType = sameType;
function validType(input, ref, name) {
    if (name === void 0) { name = 'parameter'; }
    function validTypeImpl(input, ref, name) {
        var inputType = type_1.getType(input);
        var refType = type_1.getType(ref);
        if (refType === 'string') {
            if (inputType !== ref) {
                return name + " should be " + ref + " instead of " + inputType + ";";
            }
            return '';
        }
        else {
            if (inputType !== refType) {
                return name + " should be " + refType + " instead of " + inputType + "; ";
            }
            var errors = '';
            switch (inputType) {
                case 'object': {
                    for (var key in ref) {
                        errors += validTypeImpl(input[key], ref[key], name + "." + key);
                    }
                    break;
                }
                case 'array': {
                    for (var i = 0; i < ref.length; i++) {
                        errors += validTypeImpl(input[i], ref[i], name + "[" + i + "]");
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            return errors;
        }
    }
    var error = validTypeImpl(input, ref, name);
    return {
        passed: !error,
        reason: error,
    };
}
exports.validType = validType;
function validObjectOptionalType(input, ref, name) {
    if (name === void 0) { name = 'parameter'; }
    function validImpl(input, ref, name) {
        var inputType = type_1.getType(input);
        var refType = type_1.getType(ref);
        if (refType !== 'object')
            return '';
        if (inputType === 'object') {
            for (var key in input) {
                var val = input[key];
                if (val === undefined || key === null) {
                    continue;
                }
                var assertResult = validType(val, ref[key], name + "." + key);
                return assertResult.passed ? '' : assertResult.reason;
            }
        }
        else {
            return name + " should be object instead of " + inputType;
        }
        return '';
    }
    var error = validImpl(input, ref, name);
    return {
        passed: !error,
        reason: error,
    };
}
exports.validObjectOptionalType = validObjectOptionalType;
function assertType(param, ref, name, ErrorClass) {
    if (name === void 0) { name = 'parameter'; }
    if (ErrorClass === void 0) { ErrorClass = error_1.CloudSDKError; }
    // check param validity
    var paramCheckResult = validType(param, ref, name);
    if (!paramCheckResult.passed) {
        throw new ErrorClass({
            errMsg: paramCheckResult.reason,
        });
    }
}
exports.assertType = assertType;
function assertObjectOptionalType(param, ref, name, ErrorClass) {
    if (name === void 0) { name = 'parameter'; }
    if (ErrorClass === void 0) { ErrorClass = error_1.CloudSDKError; }
    // check param validity
    var paramCheckResult = validObjectOptionalType(param, ref, name);
    if (!paramCheckResult.passed) {
        throw new ErrorClass({
            errMsg: paramCheckResult.reason,
        });
    }
}
exports.assertObjectOptionalType = assertObjectOptionalType;
function assertRequiredParam(param, name, funcName, ErrorClass) {
    if (ErrorClass === void 0) { ErrorClass = error_1.CloudSDKError; }
    if (param === undefined || param === null) {
        throw new ErrorClass({
            errMsg: "parameter " + name + " of function " + funcName + " must be provided",
        });
    }
}
exports.assertRequiredParam = assertRequiredParam;
function assertObjectNotEmpty(_a) {
    var target = _a.target, name = _a.name, _b = _a.ErrorClass, ErrorClass = _b === void 0 ? error_1.CloudSDKError : _b;
    if (Object.keys(target).length === 0) {
        throw new ErrorClass({
            errCode: error_config_1.ERR_CODE.SDK_API_PARAMETER_ERROR,
            errMsg: name + " must not be empty"
        });
    }
}
exports.assertObjectNotEmpty = assertObjectNotEmpty;
/*
export function constructTypeRef(typeDef: any): any {

  const type = getType(typeDef)

  switch(type) {
    case 'string': {
      return ''
    }
    case 'number': {

    }
  }

}
*/ 


/***/ }),

/***/ "./src/utils/error.ts":
/*!****************************!*\
  !*** ./src/utils/error.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var type_1 = __webpack_require__(/*! ./type */ "./src/utils/type.ts");
var msg_1 = __webpack_require__(/*! ./msg */ "./src/utils/msg.ts");
var error_config_1 = __webpack_require__(/*! config/error.config */ "./src/config/error.config.ts");
var CloudSDKError = /** @class */ (function (_super) {
    tslib_1.__extends(CloudSDKError, _super);
    function CloudSDKError(options) {
        var _this = _super.call(this, options.errMsg) || this;
        _this.errCode = -1;
        Object.defineProperties(_this, {
            message: {
                get: function () {
                    return "errCode: " + this.errCode + " " + (error_config_1.ERR_CODE[this.errCode] || '') + " | errMsg: " + this.errMsg;
                },
                set: function (msg) {
                    this.errMsg = msg;
                }
            }
        });
        _this.errCode = options.errCode || -1;
        _this.errMsg = options.errMsg;
        return _this;
    }
    Object.defineProperty(CloudSDKError.prototype, "message", {
        get: function () {
            return "errCode: " + this.errCode + " | errMsg: " + this.errMsg;
        },
        set: function (msg) {
            this.errMsg = msg;
        },
        enumerable: true,
        configurable: true
    });
    return CloudSDKError;
}(Error));
exports.CloudSDKError = CloudSDKError;
function createError(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.errCode, errCode = _c === void 0 ? 1 : _c, _d = _b.errMsg, errMsg = _d === void 0 ? '' : _d, _e = _b.errClass, errClass = _e === void 0 ? CloudSDKError : _e;
    return new errClass({
        errCode: errCode,
        errMsg: errMsg,
    });
}
exports.createError = createError;
function isSDKError(error) {
    return error && (error instanceof Error) && type_1.isString(error.errMsg);
}
exports.isSDKError = isSDKError;
function returnAsCloudSDKError(err, appendMsg) {
    if (appendMsg === void 0) { appendMsg = ''; }
    if (err) {
        if (isSDKError(err)) {
            if (appendMsg) {
                err.errMsg += '; ' + appendMsg;
            }
            return err;
        }
        var errCode = err ? err.errCode : undefined;
        var errMsg = (err && err.errMsg || err.toString() || 'unknown error') + '; ' + appendMsg;
        return new CloudSDKError({
            errCode: errCode,
            errMsg: errMsg,
        });
    }
    return new CloudSDKError({
        errMsg: appendMsg
    });
}
exports.returnAsCloudSDKError = returnAsCloudSDKError;
function returnAsFinalCloudSDKError(err, apiName) {
    if (err && isSDKError(err)) {
        return err;
    }
    var e = returnAsCloudSDKError(err, "at " + apiName + " api; ");
    e.errMsg = msg_1.apiFailMsg(apiName, e.errMsg);
    return e;
}
exports.returnAsFinalCloudSDKError = returnAsFinalCloudSDKError;


/***/ }),

/***/ "./src/utils/msg.ts":
/*!**************************!*\
  !*** ./src/utils/msg.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function apiSuccessMsg(apiName) {
    return apiName + ":ok";
}
exports.apiSuccessMsg = apiSuccessMsg;
function apiCancelMsg(apiName, msg) {
    return apiName + ":cancel " + msg;
}
exports.apiCancelMsg = apiCancelMsg;
function apiFailMsg(apiName, msg) {
    return apiName + ":fail " + msg;
}
exports.apiFailMsg = apiFailMsg;


/***/ }),

/***/ "./src/utils/symbol.ts":
/*!*****************************!*\
  !*** ./src/utils/symbol.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var _symbols = [];
var __internalMark__ = {};
var HiddenSymbol = /** @class */ (function () {
    function HiddenSymbol(target) {
        Object.defineProperties(this, {
            target: {
                enumerable: false,
                writable: false,
                configurable: false,
                value: target,
            },
        });
    }
    return HiddenSymbol;
}());
var InternalSymbol = /** @class */ (function (_super) {
    tslib_1.__extends(InternalSymbol, _super);
    function InternalSymbol(target, __mark__) {
        var _this = this;
        if (__mark__ !== __internalMark__) {
            throw new TypeError('InternalSymbol cannot be constructed with new operator');
        }
        _this = _super.call(this, target) || this;
        return _this;
    }
    InternalSymbol.for = function (target) {
        for (var i = 0, len = _symbols.length; i < len; i++) {
            if (_symbols[i].target === target) {
                return _symbols[i].instance;
            }
        }
        var symbol = new InternalSymbol(target, __internalMark__);
        _symbols.push({
            target: target,
            instance: symbol,
        });
        return symbol;
    };
    return InternalSymbol;
}(HiddenSymbol));
exports.InternalSymbol = InternalSymbol;
exports.default = InternalSymbol;


/***/ }),

/***/ "./src/utils/type.ts":
/*!***************************!*\
  !*** ./src/utils/type.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var symbol_1 = __webpack_require__(/*! ./symbol */ "./src/utils/symbol.ts");
exports.getType = function (x) { return Object.prototype.toString.call(x).slice(8, -1).toLowerCase(); };
exports.isObject = function (x) { return exports.getType(x) === 'object'; };
exports.isString = function (x) { return exports.getType(x) === 'string'; };
exports.isNumber = function (x) { return exports.getType(x) === 'number'; };
exports.isPromise = function (x) { return exports.getType(x) === 'promise'; };
exports.isFunction = function (x) { return typeof x === 'function'; };
exports.isArray = function (x) { return Array.isArray(x); };
exports.isDate = function (x) { return exports.getType(x) === 'date'; };
exports.isInternalObject = function (x) { return x && (x._internalType instanceof symbol_1.InternalSymbol); };
exports.isPlainObject = function (obj) {
    if (typeof obj !== 'object' || obj === null)
        return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
};


/***/ }),

/***/ "tcb-admin-node":
/*!*********************************!*\
  !*** external "tcb-admin-node" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tcb-admin-node");

/***/ }),

/***/ "tcb-admin-node/src/utils/httpRequest":
/*!*******************************************************!*\
  !*** external "tcb-admin-node/src/utils/httpRequest" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tcb-admin-node/src/utils/httpRequest");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ });