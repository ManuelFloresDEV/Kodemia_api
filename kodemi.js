//CLI
// nos permitira administrar los recursos de kodemia
// - koders
//   - add (koders add --name=[name]  --email=[email])
//   - rm (koder rm --id =[id])
//   - ls
// - mentors
// - generations
const db = require("./src/lib/db");
const kodersActions = require("./src/commands/koders.commands");

const resource = process.argv[2];
const action = process.argv[3];

const allowedActions = {
  koders: kodersActions,
  mentors: {},
  generations: {},
};

db.connect()
  .then(async () => {
    console.log("DB connected");

    const resourceActions = allowedActions[resource];

    if (!resourceActions) {
      console.error(`UNKNOWN RESOURCE ${resource}`);
      process.exit(3);
    }

    const requestedAction = resourceActions[action];

    if (!requestedAction) {
      console.error(`UNKNOWN ACTION ${action}`);
      process.exit(2);
    }

    await requestedAction();
  })
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1);
  });
