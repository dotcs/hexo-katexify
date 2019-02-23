"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const katex_1 = require("katex");
const he_1 = require("he");
function filter(data) {
    const displayRegExp = new RegExp("\\$\\$[^\\$]*\\$\\$", "mg");
    data.content = data.content.replace(displayRegExp, (s) => {
        return katex_1.renderToString(he_1.unescape(s).slice(2, -2).trim(), {
            displayMode: true
        });
    });
    const regexp = new RegExp("\\$([^\\$]*)\\$", "mg");
    data.content = data.content.replace(regexp, (s) => {
        return katex_1.renderToString(he_1.unescape(s).slice(1, -1).trim());
    });
    return data;
}
exports.filter = filter;
