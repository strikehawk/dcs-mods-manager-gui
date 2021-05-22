const fs = require("fs-extra");
const path = require("path");

const modulesPath = path.resolve("./node_modules");
const symlinkPath = path.resolve("./electron/dist/node_modules");
console.log(modulesPath);
console.log(symlinkPath);

fs.symlinkSync(modulesPath, symlinkPath, "dir");
