declare var hexo: any;

import { filter } from "./lib/filter";
import { filesGenerator } from "./lib/filesGenerator";

hexo.extend.filter.register("before_post_render", filter);
hexo.extend.generator.register("katexify", filesGenerator);
