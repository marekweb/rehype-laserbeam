const laserbeam = require("laserbeam");
const unistUtilVisit = require("unist-util-visit");
const hastUtilToString = require("hast-util-to-string");
const hastUtilClassnames = require("hast-util-classnames");
const get = require("lodash.get");

const defaultOptions = {
  removeLanguageJsClassName: true,
};

function rehypeLaserbeam(options = {}) {
  return (tree, file) => {
    if (typeof options === "function") {
      const processor = this;
      options = options.call({ processor, file, tree });
    }

    options = { ...defaultOptions, ...options };
    unistUtilVisit(tree, (node, index, parent) => {
      if (!parent || (parent.tagName !== "pre" && node.tagName !== "code")) {
        return;
      }

      if (!get(node, "properties.className", []).includes("language-js")) {
        return;
      }

      transformCodeElement(node);
      hastUtilClassnames(parent, "t-code");
      if (options.removeLanguageJsClassName) {
        hastUtilClassnames(node, { "language-js": false });
      }
    });
  };
}

function transformCodeElement(node) {
  const contents = hastUtilToString(node);
  const nodes = laserbeam.transform(contents);
  node.children = nodes;
}

module.exports = rehypeLaserbeam;
