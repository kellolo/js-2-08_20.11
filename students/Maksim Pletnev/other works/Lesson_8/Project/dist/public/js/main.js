(function(modules) {
var installedModules = {};
function __webpack_require__(moduleId) {
if(installedModules[moduleId]) {
return installedModules[moduleId].exports;
}
var module = installedModules[moduleId] = {
i: moduleId,
l: false,
exports: {}
};
modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
module.l = true;
return module.exports;
}
__webpack_require__.m = modules;
__webpack_require__.c = installedModules;
__webpack_require__.d = function(exports, name, getter) {
if(!__webpack_require__.o(exports, name)) {
Object.defineProperty(exports, name, { enumerable: true, get: getter });
}
};
__webpack_require__.r = function(exports) {
if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
}
Object.defineProperty(exports, '__esModule', { value: true });
};
__webpack_require__.t = function(value, mode) {
if(mode & 1) value = __webpack_require__(value);
if(mode & 8) return value;
if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
var ns = Object.create(null);
__webpack_require__.r(ns);
Object.defineProperty(ns, 'default', { enumerable: true, value: value });
if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
return ns;
};
__webpack_require__.n = function(module) {
var getter = module && module.__esModule ?
function getDefault() { return module['default']; } :
function getModuleExports() { return module; };
__webpack_require__.d(getter, 'a', getter);
return getter;
};
__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
__webpack_require__.p = "";
return __webpack_require__(__webpack_require__.s = "./src/public/index.js");
})
({
"./src/public/index.js":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/main */ \"./src/public/js/main.js\");\n/* harmony import */ var _style_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/normalize.css */ \"./src/public/style/normalize.css\");\n/* harmony import */ var _style_normalize_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_normalize_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/style.css */ \"./src/public/style/style.css\");\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar app = new Vue(_js_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/public/index.js?");
}),

"./src/public/js/cart.js":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar cartProduct = {\n  props: ['prod'],\n  template: \"         \\n        <div class=\\\"cart-item\\\">\\n            <div class=\\\"product-bio\\\">\\n                <img :src=\\\"prod.img\\\" alt=\\\"Some image\\\">\\n                <div class=\\\"product-desc\\\">\\n                    <p class=\\\"product-title\\\">{{prod.product_name}}</p>\\n                    <p class=\\\"product-quantity\\\">Quantity: {{prod.quantity}}</p>\\n                    <p class=\\\"product-single-price\\\">{{prod.price}}</p>\\n                </div>\\n            </div>\\n            <div class=\\\"right-block\\\">\\n                <p class=\\\"product-price\\\">{{prod.quantity * prod.price}}</p>\\n                <button class=\\\"del-btn\\\" v-on:click=\\\"removeItem\\\">&times;</button>\\n            </div>\\n        </div>\\n  \\n    \",\n  methods: {\n    removeItem: function removeItem() {\n      this.$emit('remove', this.prod.id_product);\n    }\n  }\n};\nvar cart = {\n  data: function data() {\n    return {\n      products: []\n    };\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$parent.getJson('/api/cart').then(function (data) {\n      _this.products = data.contents;\n    });\n  },\n  methods: {\n    addProduct: function addProduct(prod) {\n      var _this2 = this;\n\n      var find = this.products.find(function (item) {\n        return item.id_product === prod.id_product;\n      });\n\n      if (find) {\n        this.$parent.putJson('/api/cart/' + find.id_product, {\n          quantity: 1\n        }).then(function (data) {\n          if (data.result) {\n            find.quantity++;\n          }\n        });\n      } else {\n        var item = Object.assign({}, prod, {\n          quantity: 1,\n          img: prod.img.replace(/img/, 'img\\/small')\n        });\n        this.$parent.postJson('/api/cart', item).then(function (data) {\n          if (data.result) {\n            _this2.products.push(item);\n          }\n        });\n      }\n    },\n    removeProduct: function removeProduct(id) {\n      var _this3 = this;\n\n      var find = this.products.find(function (item) {\n        return item.id_product === id;\n      });\n      var index = this.products.findIndex(function (item) {\n        return item.id_product === id;\n      });\n      this.$parent.putJson('/api/cart/' + id, {\n        quantity: -1\n      }).then(function () {\n        find.quantity--;\n      }).then(function () {\n        if (find.quantity < 1) {\n          _this3.products.splice(index, 1);\n        }\n      });\n    }\n  },\n  template: \"<div class=\\\"cart-block\\\" v-if=\\\"$parent.isVisibleCart\\\">\\n    <cart-product v-for=\\\"product in products\\\" :prod=\\\"product\\\" :key=\\\"product.id_product\\\" @remove=\\\"removeProduct\\\">\\n    </cart-product>\\n    </div>\\n  \",\n  components: {\n    'cart-product': cartProduct\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (cart);\n\n//# sourceURL=webpack:///./src/public/js/cart.js?");
}),
    
"./src/public/js/catalog.js":
(function(module, __webpack_exports__, __webpack_require__) {
"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar product = {\n  props: ['prod'],\n  template: \"        \\n      <div class=\\\"product-item\\\">\\n          <img :src=\\\"prod.img\\\" alt=\\\"Some img\\\">\\n          <div class=\\\"desc\\\">\\n              <h3> {{prod.product_name}} </h3>\\n              <p>{{prod.price}} $</p>\\n              <button class=\\\"buy-btn\\\" @click=\\\"buyItem\\\">\\u041A\\u0443\\u043F\\u0438\\u0442\\u044C</button>\\n          </div>\\n      </div>\\n  \",\n  methods: {\n    buyItem: function buyItem() {\n      this.$emit('buy', this.prod);\n    }\n  }\n};\nvar catalog = {\n  data: function data() {\n    return {\n      products: [],\n      filtered: []\n    };\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$parent.getJson('/api/products').then(function (data) {\n      _this.products = data;\n      _this.filtered = data;\n    });\n  },\n  methods: {\n    filter: function filter(value) {\n      var reg = new RegExp(value, 'i');\n      this.filtered = this.products.filter(function (el) {\n        return reg.test(el.product_name);\n      });\n    }\n  },\n  template: \"        \\n  <div class=\\\"products\\\">\\n    <product v-for=\\\"product in filtered\\\" :prod=\\\"product\\\" :key=\\\"product.id_product\\\" @buy=\\\"$root.$refs.basket.addProduct\\\">\\n    </product>\\n  </div>\\n\",\n  components: {\n    product: product\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalog);\n\n//# sourceURL=webpack:///./src/public/js/catalog.js?");
}),

"./src/public/js/filter.js":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar filterComp = {\n  data: function data() {\n    return {\n      userSearch: ''\n    };\n  },\n  template: \"\\n        <form action=\\\"#\\\" class=\\\"search-form\\\" @submit.prevent=\\\"$root.$refs.cata.filter (userSearch)\\\">\\n          <input type=\\\"text\\\" class=\\\"search-field\\\" v-model=\\\"userSearch\\\">\\n          <button class=\\\"btn-search\\\" type=\\\"submit\\\">\\n              <i class=\\\"fas fa-search\\\"></i>\\n          </button>\\n        </form>\\n      \"\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (filterComp);\n\n//# sourceURL=webpack:///./src/public/js/filter.js?");
}),

"./src/public/js/main.js":

(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/public/js/cart.js\");\n/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ \"./src/public/js/catalog.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter */ \"./src/public/js/filter.js\");\n\n\n\nvar app = new Vue({\n  el: '#app',\n  components: {\n    'catalog': _catalog__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    'cart': _cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    'filter-comp': _filter__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  data: {\n    API: 'https://raw.githubusercontent.com/berryllium/-js-gb-second-05.10/gorkun/students/Gorkun%20Dmitriy/project/db',\n    isVisibleCart: true\n  },\n  methods: {\n    getJson: function getJson(url) {\n      return fetch(url).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    postJson: function postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    },\n    putJson: function putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    }\n  },\n  mounted: function mounted() {}\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/public/js/main.js?");

}),

"./src/public/style/normalize.css":


(function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/style/normalize.css?");

}),

"./src/public/style/style.css":

(function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/style/style.css?");

})

 });