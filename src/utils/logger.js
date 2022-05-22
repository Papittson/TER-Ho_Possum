class Logger {
  info(message, color) {
    const options = color ? `background: #202124; color: ${color}` : undefined;
    console.info(`%c${message}`, options);
  }

  warn(message) {
    console.warn(`[WARN] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }

  startRoundLog(roundNumber) {
    console.group(
      `%cTour de jeu n° ${roundNumber}.`,
      `background: #202124; color: #0eebd1`
    );
  }

  endRoundLog() {
    console.groupEnd();
  }
}

module.exports = new Logger();
