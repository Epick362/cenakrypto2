require('source-map-support/register')
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var redis = __webpack_require__(11);
var _ = __webpack_require__(1);
var axios = __webpack_require__(2);

var redisClient = redis.createClient();
redisClient.on('error', function (err) {
    console.log("Redis Error " + err);
});

exports.request = function (key, apiCall) {
    var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;

    var cacheResult = void 0;

    redisClient.get(key, function (error, result) {
        if (result) {
            cacheResult = JSON.parse(result);
        }
    });

    if (cacheResult) {
        return Promise.resolve({ data: cacheResult });
    }

    return apiCall.then(function (response) {
        redisClient.set(key, JSON.stringify(response.data), 'EX', expire);

        return response;
    });
};

exports.eurRate = function () {
    var fiat = axios.get('https://api.fixer.io/latest?base=EUR');

    return exports.request('fiat', fiat, 3600).then(function (response) {
        var eurToUsd = _.get(response.data, "rates.USD");

        return eurToUsd;
    });
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(7);






var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());

// Import and Set Nuxt.js options
var config = __webpack_require__(15);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coins__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__front__ = __webpack_require__(12);





var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.use(__WEBPACK_IMPORTED_MODULE_1__coins__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_2__front__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_coinController__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_coinController___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__controllers_coinController__);



var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/coin/:coin', __WEBPACK_IMPORTED_MODULE_1__controllers_coinController___default.a.show);
router.get('/coin/:coin/history/:range', __WEBPACK_IMPORTED_MODULE_1__controllers_coinController___default.a.history);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(10);

exports.show = function (req, res) {
    Coin.show(req.params.coin).then(function (coin) {
        res.json(coin);
    });
};

exports.history = function (req, res) {
    Coin.history(req.params.coin, req.params.range).then(function (history) {
        res.json(history);
    });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = __webpack_require__(2);
var _ = __webpack_require__(1);
var cache = __webpack_require__(3);

var Coin = function () {
    function Coin() {
        _classCallCheck(this, Coin);
    }

    _createClass(Coin, null, [{
        key: 'show',
        value: function show(coin) {
            var coinDetails = axios.get('http://coincap.io/page/' + coin);

            return Promise.all([cache.eurRate(), cache.request('coin_' + coin, coinDetails)]).then(function (promises) {
                var coinData = promises[1].data;

                coinData.price = +(coinData.price / promises[0]).toFixed(2);
                coinData.volume = +(coinData.volume / promises[0]).toFixed(2);
                coinData.market_cap = +(coinData.market_cap / promises[0]).toFixed(2);

                return coinData;
            });
        }
    }, {
        key: 'history',
        value: function history(coin, range) {
            var coinHistory = axios.get('http://coincap.io/history/' + range + '/' + coin);

            return Promise.all([cache.eurRate(), cache.request('coin_' + coin + '_' + range, coinHistory)]).then(function (promises) {
                var coinHistory = promises[1].data;

                coinHistory.price = _.map(coinHistory.price, function (item) {
                    item[1] = +(item[1] / promises[0]).toFixed(2);

                    return item;
                });

                return coinHistory;
            });
        }
    }]);

    return Coin;
}();

module.exports = Coin;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_frontController__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_frontController___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__controllers_frontController__);



var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/front', __WEBPACK_IMPORTED_MODULE_1__controllers_frontController___default.a.index);
router.get('/list', __WEBPACK_IMPORTED_MODULE_1__controllers_frontController___default.a.list);
router.get('/coins', __WEBPACK_IMPORTED_MODULE_1__controllers_frontController___default.a.coins);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Front = __webpack_require__(14);
var _ = __webpack_require__(1);

exports.index = function (req, res) {
    Front.index().then(function (coins) {
        res.json({ data: coins });
    });
};

exports.list = function (req, res) {
    var perPage = 50;
    var page = req.query.page || 1;
    var sort = {
        field: req.query.sort_by.split('.')[0],
        dir: req.query.sort_by.split('.')[1]
    };

    Front.list().then(function (coins) {
        var start = perPage * (page - 1);
        var end = perPage * page;
        var total = coins.length;

        var sortedCoins = _.orderBy(coins, [sort.field], [sort.dir]);
        var filteredCoins = sortedCoins.splice(start, end);

        res.json({
            data: filteredCoins,
            total: total,
            per_page: perPage
        });
    });
};

exports.coins = function (req, res) {
    Front.coins().then(function (coins) {
        res.json(coins);
    });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = __webpack_require__(2);
var _ = __webpack_require__(1);
var cache = __webpack_require__(3);

var Front = function () {
    function Front() {
        _classCallCheck(this, Front);
    }

    _createClass(Front, null, [{
        key: 'index',
        value: function index() {
            return this.list().then(function (coins) {
                return coins.splice(0, 10);
            });
        }
    }, {
        key: 'list',
        value: function list() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var coinList = axios.get('http://coincap.io/front');

            return Promise.all([cache.eurRate(), cache.request('front', coinList)]).then(function (promises) {
                var eurRate = promises[0];
                var coins = promises[1].data;

                coins = _.map(coins, function (coin, index) {
                    coin.price = +(coin.price / eurRate).toFixed(2);
                    coin.mktcap = +(coin.mktcap / eurRate).toFixed(2);
                    coin.rank = index + 1;

                    return coin;
                });

                return coins;
            });
        }
    }, {
        key: 'coins',
        value: function coins() {
            // Cryptocompare has richer data
            var coinsData = axios.get('https://www.cryptocompare.com/api/data/coinlist');

            // but we have to filter list by this one which we have historical data from
            var coinsListSupported = axios.get('http://coincap.io/coins');

            return Promise.all([cache.request('global-coinsdata', coinsData, 60 * 60 * 24), // 1 day cache
            cache.request('global-coinslist', coinsListSupported, 60 * 60 * 24)]).then(function (promises) {
                var coinsData = promises[0].data.Data;
                var coinsList = promises[1].data;

                return _.reduce(coinsList, function (result, coin) {
                    var match = coinsData[coin];

                    if (match) {
                        result.push({
                            symbol: match.Symbol,
                            name: match.CoinName,
                            algorithm: match.Algorithm,
                            supply: match.TotalCoinSupply,
                            image: match.ImageUrl
                        });
                    }

                    return result;
                }, []);
            });
        }
    }]);

    return Front;
}();

module.exports = Front;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Aktuálna cena Bitcoin, Ethereum a iných kryptomien',
    titleTemplate: '%s | cenakrypto.sk',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Všetky informácie o Bitcoin, Ethereum, Ripple a iných kryptomenách, ktoré potrebujete. Zoznam kryptomien, aktuálne ceny a grafy.' }, { name: 'robots', content: 'index, follow' }, { name: 'author', content: 'Filip Hájek' }, { property: 'og:type', content: 'profile' }, { property: 'og:title', content: 'Aktuálne kurzy Bitcoin, Ethereum a ďalších' }, { property: 'og:url', content: 'https://cenakrypto.sk/' }, { property: 'og:image', content: 'https://cenakrypto.sk/apple-touch-icon.png' }],
    link: [{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }, { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }, { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }, { rel: 'manifest', href: '/manifest.json' }, { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5642c8' }, { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css', integrity: 'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg', crossorigin: 'anonymous' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: ['~/plugins/formatNumbers', '~/plugins/buefy', { src: '~/plugins/highcharts', ssr: false }],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['highcharts'],
    extend: function extend(config, _ref) {
      var isDev = _ref.isDev,
          isClient = _ref.isClient;

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },

    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map