# rehype-laserbeam

Plugin for [**rehype**][rehype] to enable syntax highlighting and annotation
with [**Laserbeam**][laserbeam].

Applies highlighting to code blocks contained in `pre > code` elements with a
language class of `language-js`.

### Options

### `rehype().use(rehypeLaserbeam[, options])`

##### `options`

###### `options.removeLanguageJsClassName`

Remove the `language-js` class from the target `code` element. This may be
useful if you want to prevent another plugin from trying to highlight the same
code block. (`boolean`, default: `true`)

###### `options.laserbeamOptions`

Options (`object`, default: `undefined`)

## License

MIT © Marek Zaluski

[rehype]: https://github.com/rehypejs/rehype
[laserbeam]: https://github.com/marekweb/laserbeam
