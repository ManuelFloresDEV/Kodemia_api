const kodersUseCase = require("../usecases/koder.usecases");
const getArgValue = require("../lib/getArgValue");

async function add() {
  const firstName = getArgValue("firstName");
  const lastName = getArgValue("lastName");
  const email = getArgValue("email");

  const newKoder = await kodersUseCase.create({
    firstName,
    lastName,
    email,
  });

  console.log("Koder created");
  console.log(newKoder);
  process.exit(0);
}

async function rm() {
  const id = getArgValue("id");

  const koderDeleted = await kodersUseCase.deleteById(id);

  console.log("Koder deleted");
  console.log(koderDeleted);
  process.exit(0);
}

async function ls() {
  const koders = await kodersUseCase.getAll();

  console.log(koders);
  process.exit(0);
}

module.exports = { add, rm, ls };
