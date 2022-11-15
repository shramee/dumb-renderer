"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * Gets game ID from the URL.
 * Queries game data for the game ID.
 * Game data includes
 * - canvas: {w, h} // Canvas width and height
 * - assets: [asset1, asset2] // Assets to load (image urls)
 * - bids: [bid] Bidding options
 * Creates the canvas with size from game data.
 * Loads the assets.
 * Connects to the socket.
 * Renders objects whenever state update is received.
 */
var DumbRenderer = /** @class */ (function () {
    function DumbRenderer() {
    }
    DumbRenderer.prototype.loadAssets = function (assets) {
        var _this = this;
        return new Promise(function (res, rej) {
            var imagesToLoad = 0;
            var imagesLoaded = 0;
            var assetLoaded = function () {
                imagesLoaded++;
                setTimeout(function () {
                    if (imagesLoaded === imagesToLoad)
                        res(true);
                }, 1);
            };
            var fnLoadAsset = function (src) {
                imagesToLoad++;
                var img = new Image();
                img.src = src;
                img.onload = assetLoaded;
                return img;
            };
            assets.forEach(_this.prepareAsset(fnLoadAsset));
        });
    };
    DumbRenderer.prototype.prepareAsset = function (loadAsset) {
        var _this = this;
        return function (_a) {
            var id = _a.id, url = _a.url, states = _a.states;
            // Load base image
            _this.assets[id] = {
                id: id,
                img: loadAsset(url),
                states: {}
            };
            // Load state images
            if (states) {
                Object.keys(states).forEach(function (state) {
                    var url = states[state];
                    _this.assets[id][state] = loadAsset(url);
                });
            }
        };
    };
    DumbRenderer.prototype.setupCanvas = function (canvasProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.canvas = document.createElement("canvas");
                this.canvas.id = "game";
                this.canvas.width = canvasProps.w;
                this.canvas.height = canvasProps.h;
                document.body.appendChild(this.canvas);
                this.ctx = this.canvas.getContext("2d");
                return [2 /*return*/];
            });
        });
    };
    return DumbRenderer;
}());
if (window) {
    window.DumbRenderer = DumbRenderer;
}
exports["default"] = DumbRenderer;
