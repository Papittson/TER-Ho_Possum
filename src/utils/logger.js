class Logger {
  format(type, message) {
    return `[${type}] ${message}`;
  }

  info(message) {
    console.log(this.format("INFO", message));
  }

  warn(message) {
    console.warn(this.format("WARN", message));
  }

  error(message) {
    console.error(this.format("ERROR", message));
  }

  log(type, message, color) {
    console.log(`%c ${this.format(type, message)}`, `color: ${color}`);
  }
}

module.exports = new Logger();
