import * as fs from "fs";
import * as path from "path";

const reqResolve = require("resolve");
const asyncReqResolve = async (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    reqResolve(path, (err: any, res: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

interface HexoGeneratorItem {
  path: string;
  data: () => Promise<any>;
}

export async function filesGenerator() {
  const katexRoot = await asyncReqResolve("katex");
  // const katexRootDist = path.join(katexRoot, "..", "dist");
  const katexRootDist = path.join(katexRoot, "..");
  const katexFontDir = path.join(katexRootDist, "fonts");

  let provide: HexoGeneratorItem[] = [
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
  const fontFiles: string[] = fs.readdirSync(katexFontDir);
  const provideFonts: HexoGeneratorItem[] = fontFiles.map(
    (filename: string) => {
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
    }
  );
  provide = provide.concat(provideFonts);
  return provide;
}
