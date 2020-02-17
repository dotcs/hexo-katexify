import { filter } from "./filter";

describe("filter", () => {
  it("should not do anything if content does not contain katex formula", () => {
    const content = `
# This is some content
<!-- ignore this comment -->
<h2 class="to-be-ignored">Please ignore me</h2>
Here we have do no nothing. I repeat: Nothing!
    `;
    expect(filter({ content })).toEqual({ content });
  });

  it("should return the same object reference", () => {
    const content = `
# This is some content
<!-- ignore this comment -->
<h2 class="to-be-ignored">Please ignore me</h2>
Here we have do no nothing. I repeat: Nothing!
    `;
    const obj = { content };
    expect(filter(obj)).toBe(obj);
  });

  it("should find inline formula and replace it", () => {
    const content = `
# This is some content
<!-- ignore this comment -->
<h2 class="to-be-ignored">Please ignore me</h2>
This is a formula: $E = mc^2$.
    `;
    const { content: responseContent } = filter({ content });
    expect(responseContent).not.toEqual(content);
    expect(responseContent).toContain("This is some content");
    expect(responseContent).toContain("This is a formula");
    expect(responseContent).not.toContain("katex-display");
    expect(responseContent).not.toContain("$E = mc^2$");
    expect(responseContent).not.toContain("$");
    expect(responseContent).toMatchSnapshot();
  });

  it("should find display formula and replace it", () => {
    const content = `
# This is some content
<!-- ignore this comment -->
<h2 class="to-be-ignored">Please ignore me</h2>
This is a formula: $$E = mc^2$$.
    `;
    const { content: responseContent } = filter({ content });
    expect(responseContent).not.toEqual(content);
    expect(responseContent).toContain("This is some content");
    expect(responseContent).toContain("This is a formula");
    expect(responseContent).toContain("katex-display");
    expect(responseContent).not.toContain("$$E = mc^2$$");
    expect(responseContent).not.toContain("$");
    expect(responseContent).toMatchSnapshot();
  });

  it("skip inside code block", () => {
    const content = `
        <code>var x = $(xxx); y = $ (aa);</code>
      `;
      const { content: responseContent } = filter({ content });
      expect(responseContent).toEqual(content);
      expect(responseContent).not.toContain("katex");
      expect(responseContent).toContain("(xxx); y = ");
  });

  it("skip inside inline code", () => {
    const content = '`var x = $test; `  ` var y = $y;`';
      const { content: responseContent } = filter({ content });
      expect(responseContent).toEqual(content);
      expect(responseContent).not.toContain("katex");
      expect(responseContent).toContain("test; `  ` var y = ");
  });


  it("latex with '`' ", () => {
    const content = '$ \\text{ \\`{a} }$ `test inline code contains  $`';
      const { content: responseContent } = filter({ content });
      expect(responseContent).not.toEqual(content);
      expect(responseContent).toContain("katex");
      expect(responseContent).not.toContain("$ \\text{ \\`{a} }$");
  });


  
});
