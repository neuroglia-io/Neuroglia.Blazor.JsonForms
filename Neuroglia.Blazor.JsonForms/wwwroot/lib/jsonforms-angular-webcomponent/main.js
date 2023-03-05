"use strict";
(self["webpackChunkjsonforms_angular_webcomponent"] = self["webpackChunkjsonforms_angular_webcomponent"] || []).push([["main"],{

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _jsonforms_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsonforms/core */ 4325);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _jsonforms_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsonforms/angular */ 84331);
/* harmony import */ var _jsonforms_angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsonforms/angular-material */ 71897);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);







function AppComponent_jsonforms_outlet_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "jsonforms-outlet");
  }
}
const stringType = typeof "";
class AppComponent extends _jsonforms_angular__WEBPACK_IMPORTED_MODULE_1__.JsonForms {
  constructor(jsonformsService) {
    super(jsonformsService);
    this.options = {
      schemaId: 'id',
      allErrors: true
    };
    this.renderers = _jsonforms_angular_material__WEBPACK_IMPORTED_MODULE_2__.angularMaterialRenderers;
  }
  ngOnInit() {
    this.ajv = (0,_jsonforms_core__WEBPACK_IMPORTED_MODULE_0__.createAjv)(this.options);
    if (!!this.schema) super.ngOnInit();
  }
  ngOnChanges(changes) {
    Object.entries(changes).forEach(([prop, entry]) => {
      if (entry.currentValue !== entry.previousValue) {
        if (typeof entry.currentValue === stringType) {
          try {
            entry.currentValue = JSON.parse(entry.currentValue);
            if (prop !== 'options') {
              this[prop] = entry.currentValue;
            }
          } catch {
            // ignore if the string cannot be deserialzed
          }
        }
        if (prop === 'options') {
          changes['ajv'] = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.SimpleChange(this.ajv, (0,_jsonforms_core__WEBPACK_IMPORTED_MODULE_0__.createAjv)(entry.currentValue), false);
          this.ajv = changes['ajv'].currentValue;
        }
      }
    });
    if (!!changes['schema']?.firstChange) {
      super.ngOnInit();
    }
    super.ngOnChanges(changes);
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_jsonforms_angular__WEBPACK_IMPORTED_MODULE_1__.JsonFormsAngularService));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-ng-jsonforms"]],
  inputs: {
    options: "options",
    renderers: "renderers"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_jsonforms_angular__WEBPACK_IMPORTED_MODULE_1__.JsonFormsAngularService]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]],
  decls: 1,
  vars: 1,
  consts: [[4, "ngIf"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AppComponent_jsonforms_outlet_0_Template, 1, 0, "jsonforms-outlet", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.schema);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _jsonforms_angular__WEBPACK_IMPORTED_MODULE_1__.JsonFormsOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ 37146);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _jsonforms_angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsonforms/angular-material */ 71897);
/* harmony import */ var _jsonforms_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsonforms/angular */ 84331);
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/elements */ 94555);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);







class AppModule {
  constructor(injector) {
    this.injector = injector;
  }
  ngDoBootstrap() {
    const el = (0,_angular_elements__WEBPACK_IMPORTED_MODULE_3__.createCustomElement)(_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
      injector: this.injector
    });
    customElements.define('ng-jsonforms', el);
  }
}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector));
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: AppModule
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule, _jsonforms_angular__WEBPACK_IMPORTED_MODULE_2__.JsonFormsModule, _jsonforms_angular_material__WEBPACK_IMPORTED_MODULE_1__.JsonFormsAngularMaterialModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule, _jsonforms_angular__WEBPACK_IMPORTED_MODULE_2__.JsonFormsModule, _jsonforms_angular_material__WEBPACK_IMPORTED_MODULE_1__.JsonFormsAngularMaterialModule]
  });
})();

/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map