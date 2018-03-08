"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const reqResolve = require("resolve");
const asyncReqResolve = (path) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        reqResolve(path, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
});
function filesGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        const katexRoot = yield asyncReqResolve("katex");
        // const katexRootDist = path.join(katexRoot, "..", "dist");
        const katexRootDist = path.join(katexRoot, "..");
        const katexFontDir = path.join(katexRootDist, "fonts");
        let provide = [
            {
                path: "katexify/katex.min.css",
                data: () => {
                    return new Promise((resolve, reject) => {
                        const fp = path.join(katexRootDist, "katex.min.css");
                        const content = fs.readFileSync(fp);
                        resolve(content);
                    });
                }
            }
        ];
        const fontFiles = fs.readdirSync(katexFontDir);
        const provideFonts = fontFiles.map((filename) => {
            return {
                path: "katexify/fonts/" + filename,
                data: () => {
                    return new Promise((resolve, reject) => {
                        const fp = path.join(katexFontDir, filename);
                        const content = fs.readFileSync(fp);
                        resolve(content);
                    });
                }
            };
        });
        provide = provide.concat(provideFonts);
        return provide;
    });
}
exports.filesGenerator = filesGenerator;
