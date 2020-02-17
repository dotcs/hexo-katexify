import { renderToString } from "katex";
import { unescape } from "he";

const EXCLUDE_TAG: string[] = [
  'escape',
  'pre',
  'code'
];

export function filter(data: { content: string }) {

  const displayRegExp = new RegExp("\\$\\$[^\\$]*\\$\\$", "mg");
  data.content = data.content.replace(displayRegExp, (s: string) => {
    return renderToString(unescape(s).slice(2, -2).trim(), {
      displayMode: true
    });
  });

  let contents = data.content;
  let splits = contents.split(/[\r\n]/);
  var regTags = /^<([\w]+)>/

  splits.forEach((line, ind) => {

    let linetrim = line.trim();

    // skip parsing inside codes
    let htmlTagMatch = linetrim.match(regTags);
    if (htmlTagMatch != null) {
      let tag = htmlTagMatch[1];
      if (EXCLUDE_TAG.includes(tag)) {
        return;
      }
    }

    //parse single line katex
    var pendingLine = line;
    let linepart = [];

    const regMath = /\$([^\$]+)\$/
    let mathMatch: any = pendingLine.match(regMath);

    while (mathMatch != null) {
      let mathc = mathMatch[1];

      if (!mathc.replace(/\\`/g, '').includes('`')) {
        let katexc = renderToString(unescape(mathc));
        let posind = mathMatch.index + mathMatch[0].length;

        let sub1 = pendingLine.substr(0, posind);
        linepart.push(sub1.replace(mathMatch[0], katexc));
        let sub2 = pendingLine.substr(posind);
        pendingLine = sub2;
      }
      else {
        linepart.push(pendingLine.substr(0, mathMatch.index + 1));
        pendingLine = pendingLine.substr(mathMatch.index + 1);
      }
      mathMatch = pendingLine.match(regMath);
    }

    linepart.push(pendingLine);
    splits[ind] = linepart.join('');
  });

  data.content = splits.join('\n');
  return data;
}