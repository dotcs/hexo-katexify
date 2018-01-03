"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./lib/filter");
const filesGenerator_1 = require("./lib/filesGenerator");
hexo.extend.filter.register("before_post_render", filter_1.filter);
hexo.extend.generator.register("katexify", filesGenerator_1.filesGenerator);
