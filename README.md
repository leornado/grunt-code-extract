# grunt-code-extract

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-code-extract --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-code-extract');
```

## The "codeExtract" task

### Overview
In your project's Gruntfile, add a section named `codeExtract` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  codeExtract: {
    jsExample1: {
      options: {
        blocks: [
          {start: '/* code-extract-start */', end: '/* code-extract-end */', replace: '"a"'},
          {
            start  : '/* start */', end: '/* end */',
            replace: function (srcFilepath, replacedSrcPath, origniSrc, 
              currentDealedPartialSrc, currentDealedRemainedSrcArray, extractedSrcArray) {
              return '//sdf';
            }
          }
        ]
      },
      files  : [{
        expand : true, flatten: true,
        src    : ['test/source*.js'], dest: 'tmp/',
        replace       : function (block, srcFilepath) {
          return block.replace === '"a"' ? '"A"' : '//' + srcFilepath;
        }, extractDest: 'tmp/extract.json'
      }]
    }
  },
});
```

### Options

#### options.blocks
Type: `Array`
Default value: 
```js
blocks: [{
  start: '/* code-extract-start */',
  end  : '/* code-extract-end */',
  replace: ''
}]
```

Defines the start and end identifier of the replacement block.

#### options.blocks[.replace]
Type: `String` Or `Function`
Default value: `''`

Define a replacement string or a custom replacement function.

## Release History
_(Nothing yet)_
