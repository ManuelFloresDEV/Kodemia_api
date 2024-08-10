function getArgValue(argName) {
  const argString = process.argv.find((arg) => arg.includes(argName));

  const [_, value] = argString.split("=");
  return value;
}

module.exports = getArgValue;
