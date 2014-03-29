# task-combine
> Combine text files.

## The "combine" task

### Usage Examples

```js
var combine = new (require('task-combine'))
combine.run(inputs, options, logger)
```

### Options

#### options.endings
Type: `string`
Default: `'\n'`

Make sure each file endings with newline.

#### options.banner
Type: `string`
Default: `''`

The string will be prepended to the beginning of the contents.

#### options.footer
Type: `string`
Default: `''`

The string will be append to the end of the contents.

## Release History
* 2014-03-30    0.1.0    Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
