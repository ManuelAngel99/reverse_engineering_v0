import a, {
  getStringFromStrOrFunc,
  escapeForWithinString,
} from "module-725845.js";
let r;
let i;
i = r || (r = {});
i[(i.Line = 0)] = "Line";
i[(i.Star = 1)] = "Star";
let o = new Set([92, 47, 10, 13, 42, 34, 39, 96, 123, 125]);
class s {
  constructor(e = {}) {
    let t;
    let n;

    Object.defineProperty(this, "_indentationText", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_newLine", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_useTabs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_quoteChar", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_indentNumberOfSpaces", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_currentIndentation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0,
    });

    Object.defineProperty(this, "_queuedIndentation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_queuedOnlyIfNotBlock", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_length", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0,
    });

    Object.defineProperty(this, "_newLineOnNextWrite", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false,
    });

    Object.defineProperty(this, "_currentCommentChar", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(this, "_stringCharStack", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: [],
    });

    Object.defineProperty(this, "_isInRegEx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false,
    });

    Object.defineProperty(this, "_isOnFirstLineOfBlock", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true,
    });

    Object.defineProperty(this, "_texts", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: [],
    });

    this._newLine = e.newLine || "\n";
    this._useTabs = e.useTabs || false;
    this._indentNumberOfSpaces = e.indentNumberOfSpaces || 4;
    this._indentationText =
      ((t = this._useTabs),
      (n = this._indentNumberOfSpaces),
      t ? "	" : Array(n + 1).join(" "));
    this._quoteChar = e.useSingleQuote ? "'" : '"';
  }
  getOptions() {
    return {
      indentNumberOfSpaces: this._indentNumberOfSpaces,
      newLine: this._newLine,
      useTabs: this._useTabs,
      useSingleQuote: this._quoteChar === "'",
    };
  }
  queueIndentationLevel(e) {
    this._queuedIndentation = this._getIndentationLevelFromArg(e);
    this._queuedOnlyIfNotBlock = undefined;
    return this;
  }
  hangingIndent(e) {
    return this._withResetIndentation(
      () => this.queueIndentationLevel(this.getIndentationLevel() + 1),
      e
    );
  }
  hangingIndentUnlessBlock(e) {
    return this._withResetIndentation(() => {
      this.queueIndentationLevel(this.getIndentationLevel() + 1);
      this._queuedOnlyIfNotBlock = true;
    }, e);
  }
  setIndentationLevel(e) {
    this._currentIndentation = this._getIndentationLevelFromArg(e);
    return this;
  }
  withIndentationLevel(e, t) {
    return this._withResetIndentation(() => this.setIndentationLevel(e), t);
  }
  _withResetIndentation(e, t) {
    let n = this._getIndentationState();
    e();
    try {
      t();
    } finally {
      this._setIndentationState(n);
    }
    return this;
  }
  getIndentationLevel() {
    return this._currentIndentation;
  }
  block(e) {
    this._newLineIfNewLineOnNextWrite();

    if (this.getLength() > 0 && !this.isLastNewLine()) {
      this.spaceIfLastNot();
    }

    this.inlineBlock(e);
    this._newLineOnNextWrite = true;
    return this;
  }
  inlineBlock(e) {
    this._newLineIfNewLineOnNextWrite();
    this.write("{");
    this._indentBlockInternal(e);
    this.newLineIfLastNot().write("}");
    return this;
  }
  indent(e = 1) {
    return typeof e == "number"
      ? (this._newLineIfNewLineOnNextWrite(),
        this.write(this._indentationText.repeat(e)))
      : (this._indentBlockInternal(e),
        this.isLastNewLine() || (this._newLineOnNextWrite = true),
        this);
  }
  _indentBlockInternal(e) {
    if (this.getLastChar() != null) {
      this.newLineIfLastNot();
    }

    this._currentIndentation++;
    this._isOnFirstLineOfBlock = true;

    if (e != null) {
      e();
    }

    this._isOnFirstLineOfBlock = false;
    this._currentIndentation = Math.max(0, this._currentIndentation - 1);
  }
  conditionalWriteLine(e, t) {
    if (e) {
      this.writeLine(getStringFromStrOrFunc(t));
    }

    return this;
  }
  writeLine(e) {
    this._newLineIfNewLineOnNextWrite();

    if (this.getLastChar() != null) {
      this.newLineIfLastNot();
    }

    this._writeIndentingNewLines(e);
    this.newLine();
    return this;
  }
  newLineIfLastNot() {
    this._newLineIfNewLineOnNextWrite();

    if (!this.isLastNewLine()) {
      this.newLine();
    }

    return this;
  }
  blankLineIfLastNot() {
    if (!this.isLastBlankLine()) {
      this.blankLine();
    }

    return this;
  }
  conditionalBlankLine(e) {
    if (e) {
      this.blankLine();
    }

    return this;
  }
  blankLine() {
    return this.newLineIfLastNot().newLine();
  }
  conditionalNewLine(e) {
    if (e) {
      this.newLine();
    }

    return this;
  }
  newLine() {
    this._newLineOnNextWrite = false;
    this._baseWriteNewline();
    return this;
  }
  quote(e) {
    this._newLineIfNewLineOnNextWrite();

    this._writeIndentingNewLines(
      e == null
        ? this._quoteChar
        : this._quoteChar +
            escapeForWithinString(e, this._quoteChar) +
            this._quoteChar
    );

    return this;
  }
  spaceIfLastNot() {
    this._newLineIfNewLineOnNextWrite();

    if (!this.isLastSpace()) {
      this._writeIndentingNewLines(" ");
    }

    return this;
  }
  space(e = 1) {
    this._newLineIfNewLineOnNextWrite();
    this._writeIndentingNewLines(" ".repeat(e));
    return this;
  }
  tabIfLastNot() {
    this._newLineIfNewLineOnNextWrite();

    if (!this.isLastTab()) {
      this._writeIndentingNewLines("	");
    }

    return this;
  }
  tab(e = 1) {
    this._newLineIfNewLineOnNextWrite();
    this._writeIndentingNewLines("	".repeat(e));
    return this;
  }
  conditionalWrite(e, t) {
    if (e) {
      this.write(getStringFromStrOrFunc(t));
    }

    return this;
  }
  write(e) {
    this._newLineIfNewLineOnNextWrite();
    this._writeIndentingNewLines(e);
    return this;
  }
  closeComment() {
    switch (this._currentCommentChar) {
      case r.Line: {
        this.newLine();
        break;
      }
      case r.Star: {
        if (!this.isLastNewLine()) {
          this.spaceIfLastNot();
        }

        this.write("*/");
      }
    }
    return this;
  }
  unsafeInsert(e, t) {
    let n = this._length;
    let r = this._texts;
    return ((() => {
      if (e < 0) {
        throw Error(`Provided position of '${e}' was less than zero.`);
      }
      if (e > n) {
        throw Error(
          `Provided position of '${e}' was greater than the text length of '${n}'.`
        );
      }
    })(),
    e === n)
      ? this.write(t)
      : ((() => {
          let { index, localIndex } = (() => {
            if (e < n / 2) {
              let t = 0;
              for (let n = 0; n < r.length; n++) {
                let r_n = r[n];
                let a = t;
                if ((t += r_n.length) >= e) {
                  return { index: n, localIndex: e - a };
                }
              }
            } else {
              let t = n;
              for (let n = r.length - 1; n >= 0; n--) {
                if ((t -= r[n].length) <= e) {
                  return { index: n, localIndex: e - t };
                }
              }
            }
            throw Error(
              "Unhandled situation inserting. This should never happen."
            );
          })();
          if (localIndex === 0) {
            r.splice(index, 0, t);
          } else if (localIndex === r[index].length) {
            r.splice(index + 1, 0, t);
          } else {
            let r_i = r[index];
            let n = r_i.substring(0, localIndex);
            let o = r_i.substring(localIndex);
            r.splice(index, 1, n, t, o);
          }
        })(),
        (this._length += t.length),
        this);
  }
  getLength() {
    return this._length;
  }
  isInComment() {
    return this._currentCommentChar !== undefined;
  }
  isAtStartOfFirstLineOfBlock() {
    return (
      this.isOnFirstLineOfBlock() &&
      (this.isLastNewLine() || this.getLastChar() == null)
    );
  }
  isOnFirstLineOfBlock() {
    return this._isOnFirstLineOfBlock;
  }
  isInString() {
    return (
      this._stringCharStack.length > 0 &&
      this._stringCharStack[this._stringCharStack.length - 1] !== 123
    );
  }
  isLastNewLine() {
    let e = this.getLastChar();
    return e === "\n" || e === "\r";
  }
  isLastBlankLine() {
    let e = 0;
    for (let t = this._texts.length - 1; t >= 0; t--) {
      let n = this._texts[t];
      for (let t = n.length - 1; t >= 0; t--) {
        let r = n.charCodeAt(t);
        if (r === 10) {
          if (2 == ++e) {
            return true;
          }
        } else if (r !== 13) {
          return false;
        }
      }
    }
    return false;
  }
  isLastSpace() {
    return this.getLastChar() === " ";
  }
  isLastTab() {
    return this.getLastChar() === "	";
  }
  getLastChar() {
    let e = this._getLastCharCodeWithOffset(0);
    return e == null ? undefined : String.fromCharCode(e);
  }
  endsWith(e) {
    let t = this._length;
    return (
      this.iterateLastCharCodes((n, r) => {
        let i = e.length - (t - r);
        return e.charCodeAt(i) === n && (i === 0 || undefined);
      }) || false
    );
  }
  iterateLastChars(e) {
    return this.iterateLastCharCodes((t, n) => e(String.fromCharCode(t), n));
  }
  iterateLastCharCodes(e) {
    let t = this._length;
    for (let n = this._texts.length - 1; n >= 0; n--) {
      let r = this._texts[n];
      for (let n = r.length - 1; n >= 0; n--) {
        t--;
        let i = e(r.charCodeAt(n), t);
        if (i != null) {
          return i;
        }
      }
    }
  }
  toString() {
    if (this._texts.length > 1) {
      let e = this._texts.join("");
      this._texts.length = 0;
      this._texts.push(e);
    }
    return this._texts[0] || "";
  }
  _writeIndentingNewLines(e) {
    if ((e = e || "").length === 0) {
      return void t(this, "");
    }
    function t(e, t) {
      if (!e.isInString() && (e.isLastNewLine() || e.getLastChar() == null)) {
        e._writeIndentation();
      }

      e._updateInternalState(t);
      e._internalWrite(t);
    }
    e.split(s._newLineRegEx).forEach((e, n) => {
      if (n > 0) {
        this._baseWriteNewline();
      }

      if (e.length !== 0) {
        t(this, e);
      }
    });
  }
  _baseWriteNewline() {
    if (this._currentCommentChar === r.Line) {
      this._currentCommentChar = undefined;
    }

    let e = this._stringCharStack[this._stringCharStack.length - 1];

    if ((e === 34 || e === 39) && this._getLastCharCodeWithOffset(0) !== 92) {
      this._stringCharStack.pop();
    }

    this._internalWrite(this._newLine);
    this._isOnFirstLineOfBlock = false;
    this._dequeueQueuedIndentation();
  }
  _dequeueQueuedIndentation() {
    let e;
    let t;

    if (this._queuedIndentation != null) {
      if (
        this._queuedOnlyIfNotBlock &&
        ((e = this),
        (t = false),
        e.iterateLastCharCodes((e) => {
          switch (e) {
            case 10: {
              if (t) {
                return false;
              }
              t = true;
              break;
            }
            case 13: {
              return;
            }
            case 123: {
              return true;
            }
            default: {
              return false;
            }
          }
        }))
      ) {
        this._queuedIndentation = undefined;
        this._queuedOnlyIfNotBlock = undefined;
      } else {
        this._currentIndentation = this._queuedIndentation;
        this._queuedIndentation = undefined;
      }
    }
  }
  _updateInternalState(e) {
    for (let a = 0; a < e.length; a++) {
      let s = e.charCodeAt(a);
      if (!o.has(s)) {
        continue;
      }

      let l =
        a === 0 ? this._getLastCharCodeWithOffset(0) : e.charCodeAt(a - 1);

      let c =
        a === 0
          ? this._getLastCharCodeWithOffset(1)
          : a === 1
          ? this._getLastCharCodeWithOffset(0)
          : e.charCodeAt(a - 2);

      if (this._isInRegEx) {
        if ((l !== 47 || c === 92) && l !== 10) {
          continue;
        } else {
          this._isInRegEx = false;
        }
      } else {
        let t;
        let n;
        let i;
        if (
          !this.isInString() &&
          !this.isInComment() &&
          ((t = s),
          (n = l),
          (i = c),
          n === 47 && t !== 47 && t !== 42 && i !== 42 && i !== 47)
        ) {
          this._isInRegEx = true;
          continue;
        }
      }

      if (!this.isInString()) {
        if (this._currentCommentChar == null && l === 47 && s === 47) {
          this._currentCommentChar = r.Line;
        } else if (this._currentCommentChar == null && l === 47 && s === 42) {
          this._currentCommentChar = r.Star;
        } else if (
          this._currentCommentChar === r.Star &&
          l === 42 &&
          s === 47
        ) {
          this._currentCommentChar = undefined;
        }
      }

      if (this.isInComment()) {
        continue;
      }

      let d =
        this._stringCharStack.length === 0
          ? undefined
          : this._stringCharStack[this._stringCharStack.length - 1];

      if (l !== 92 && (s === 34 || s === 39 || s === 96)) {
        if (d === s) {
          this._stringCharStack.pop();
        } else if (d === 123 || d === undefined) {
          this._stringCharStack.push(s);
        }
      } else if (c !== 92 && l === 36 && s === 123 && d === 96) {
        this._stringCharStack.push(s);
      } else if (s === 125 && d === 123) {
        this._stringCharStack.pop();
      }
    }
  }
  _getLastCharCodeWithOffset(e) {
    if (!(e >= this._length) && !(e < 0)) {
      for (let t = this._texts.length - 1; t >= 0; t--) {
        let n = this._texts[t];
        if (!(e >= n.length)) {
          return n.charCodeAt(n.length - 1 - e);
        }
        e -= n.length;
      }
    }
  }
  _writeIndentation() {
    let e = Math.floor(this._currentIndentation);
    this._internalWrite(this._indentationText.repeat(e));
    let t = this._currentIndentation - e;
    if (this._useTabs) {
      if (t > 0.5) {
        this._internalWrite(this._indentationText);
      }
    } else {
      let e = Math.round(this._indentationText.length * t);
      let n = "";
      for (let t = 0; t < e; t++) {
        n += this._indentationText[t];
      }
      this._internalWrite(n);
    }
  }
  _newLineIfNewLineOnNextWrite() {
    if (this._newLineOnNextWrite) {
      this._newLineOnNextWrite = false;
      this.newLine();
    }
  }
  _internalWrite(e) {
    if (e.length !== 0) {
      this._texts.push(e);
      this._length += e.length;
    }
  }
  _getIndentationLevelFromArg(e) {
    if (typeof e == "number") {
      if (e < 0) {
        throw Error(
          "Passed in indentation level should be greater than or equal to 0."
        );
      }
      return e;
    }
    if (typeof e == "string") {
      if (!s._spacesOrTabsRegEx.test(e)) {
        throw Error(
          "Provided string must be empty or only contain spaces or tabs."
        );
      }
      let { spacesCount, tabsCount } = ((e) => {
        let t = 0;
        let n = 0;
        for (let r = 0; r < e.length; r++) {
          let i = e.charCodeAt(r);

          if (i === 32) {
            t++;
          } else if (i === 9) {
            n++;
          }
        }
        return { spacesCount: t, tabsCount: n };
      })(e);
      return tabsCount + spacesCount / this._indentNumberOfSpaces;
    }
    throw Error("Argument provided must be a string or number.");
  }
  _setIndentationState(e) {
    this._currentIndentation = e.current;
    this._queuedIndentation = e.queued;
    this._queuedOnlyIfNotBlock = e.queuedOnlyIfNotBlock;
  }
  _getIndentationState() {
    return {
      current: this._currentIndentation,
      queued: this._queuedIndentation,
      queuedOnlyIfNotBlock: this._queuedOnlyIfNotBlock,
    };
  }
}

Object.defineProperty(s, "_newLineRegEx", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /\r?\n/,
});

Object.defineProperty(s, "_spacesOrTabsRegEx", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /^[ \t]*$/,
});

export default s;
