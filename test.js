/* eslint-env jest */
const unified = require("unified");
const h = require("hastscript");
const rehypeLaserbeam = require(".");

async function process(input, options) {
  return unified().use(rehypeLaserbeam, options).run(input);
}

function createCodeBlock(code) {
  return h("div", h("pre", h("code.language-js", code)));
}

test("it finds and highlights a code block in html", async () => {
  const input = createCodeBlock(`const name = "alpha";`);

  const result = await process(input);

  const expected = h(
    "div",
    h(
      "pre.t-code",
      h("code", { className: [] }, [
        h("span.t-token.t-keyword", { dataType: "keyword" }, "const"),
        h("span.t-token.t-whitespace", { dataType: "whitespace" }, " "),
        h("span.t-token.t-name", { dataType: "name" }, "name"),
        h("span.t-token.t-whitespace", { dataType: "whitespace" }, " "),
        h("span.t-token.t-punctuation", { dataType: "punctuation" }, "="),
        h("span.t-token.t-whitespace", { dataType: "whitespace" }, " "),
        h("span.t-token.t-string", { dataType: "string" }, '"alpha"'),
        h("span.t-token.t-punctuation", { dataType: "punctuation" }, ";"),
        h("span.t-token.t-eof", { dataType: "eof" }, ""),
      ])
    )
  );
  expect(result).toEqual(expected);
});
