var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Execution = require('execution');
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        banner: {
            default: '',
            type: 'string',
            placeholder: 'The string will be prepended to the beginning of the contents'
        },
        endings: {
            default: '\n',
            type: 'string',
            placeholder: 'Make sure each file endings with newline'
        },
        footer: {
            default: '',
            type: 'string',
            placeholder: 'The string will be append to the end of the contents'
        }
    },
    run: function (inputs, options, logger) {
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var logger = this.logger;
        var inputs = this.inputs;

        var endings = options.endings;
        var banner = options.banner;
        var footer = options.footer;

        var paths = _.pluck(inputs, 'path');
        logger.log('Combine', paths.join(','));

        var contents = this.concat(inputs, endings);

        resolve(new Record({
            contents: banner + contents + footer
        }));
    },
    concat: function (inputs, endings) {

        return inputs.map(function (record, index, array) {
            var contents = record.contents.toString();
            if (!RegExp(endings + '$').test(contents)) {
                contents += endings;
            }
            return contents;
        }).reduce(function (previousContents, currentContents, index, array) {
                return previousContents + currentContents;
            }, '');

    }
})
