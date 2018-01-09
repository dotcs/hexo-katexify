import { renderToString } from "katex";
import { unescape } from "he";

export function filter(data: { content: string }) {
  const displayRegExp = new RegExp("$$[^$]*$$", "mg");
  data.content = data.content.replace(displayRegExp, function(s: string) {
    return renderToString(unescape(s).slice(2, -2), {
      displayMode: true
    });
  });

  const regexp = new RegExp("$[^$]*$", "mg");
  data.content = data.content.replace(regexp, function(s: string) {
    return renderToString(unescape(s).slice(1, -1));
  });
  return data;
}