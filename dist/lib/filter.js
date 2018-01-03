"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const katex_1 = require("katex");
const he_1 = require("he");
function filter(data) {
    const displayRegExp = new RegExp("$$[^$]*$$", "mg");
    data.content = data.content.replace(displayRegExp, function (s) {
        return katex_1.renderToString(he_1.unescape(s).slice(2, -2), {
            displayMode: true
        });
    });
    const regexp = new RegExp("$[^$]*$", "mg");
    data.content = data.content.replace(regexp, function (s) {
        return katex_1.renderToString(he_1.unescape(s).slice(1, -1));
    });
    return data;
}
exports.filter = filter;
