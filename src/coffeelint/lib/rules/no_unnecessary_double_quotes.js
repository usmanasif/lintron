// Generated by CoffeeScript 1.7.1
(function() {
  var NoUnnecessaryDoubleQuotes;

  module.exports = NoUnnecessaryDoubleQuotes = (function() {
    NoUnnecessaryDoubleQuotes.prototype.rule = {
      name: 'no_unnecessary_double_quotes',
      level: 'ignore',
      message: 'Unnecessary double quotes are forbidden',
      description: 'This rule prohibits double quotes unless string interpolation is\nused or the string contains single quotes.\n<pre>\n<code># Double quotes are discouraged:\nfoo = "bar"\n\n# Unless string interpolation is used:\nfoo = "#{bar}baz"\n\n# Or they prevent cumbersome escaping:\nfoo = "I\'m just following the \'rules\'"\n</code>\n</pre>\nDouble quotes are permitted by default.'
    };

    function NoUnnecessaryDoubleQuotes() {
      this.regexps = [];
      this.isInterpolation = false;
    }

    NoUnnecessaryDoubleQuotes.prototype.tokens = ['STRING', 'STRING_START', 'STRING_END'];

    NoUnnecessaryDoubleQuotes.prototype.lintToken = function(token, tokenApi) {
      var hasLegalConstructs, stringValue, tokenValue, type;
      type = token[0], tokenValue = token[1];
      if (type === 'STRING_START' || type === 'STRING_END') {
        return this.trackParens.apply(this, arguments);
      }
      stringValue = tokenValue.match(/^\"(.*)\"$/);
      if (!stringValue) {
        return false;
      }
      hasLegalConstructs = this.isInterpolation || this.hasSingleQuote(tokenValue);
      return !hasLegalConstructs;
    };

    NoUnnecessaryDoubleQuotes.prototype.trackParens = function(token, tokenApi) {
      if (token[0] === 'STRING_START') {
        this.isInterpolation = true;
      } else if (token[0] === 'STRING_END') {
        this.isInterpolation = false;
      }
      return null;
    };

    NoUnnecessaryDoubleQuotes.prototype.hasSingleQuote = function(tokenValue) {
      return tokenValue.indexOf("'") !== -1;
    };

    return NoUnnecessaryDoubleQuotes;

  })();

}).call(this);
