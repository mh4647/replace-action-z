const core = require('@actions/core');

try {
  const files = core.getInput("files");
  const vars_string = core.getInput("replacements");
  const filenames = files.replace(" ", "").split(",");
  const vars = vars_string.split(",");
  const showDebugLogs = core.getInput("showDebugLogs") || false;
  console.log(`files l: ${filenames.length}`);
  for (let fi = 0; fi < filenames.length; fi++) {
    const filename = filenames[fi];
    const fs = require("fs");
    console.log(`file1: ${fi} filename ${filename}`);
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let result = data;
        if(showLogs) {
          console.log(data);
        }
        for (let i = 0; i < vars.length; i++) {
          const kv = vars[i].split('=')
          const key = kv[0]
          let value = "";
          for (let j = 1; j < kv.length; j++) {
            value += kv[j];
          }
          if(showLogs) {
            console.log(`key: ${key}`);
            console.log(`Value: ${value}`);
          }      
          result = result.replace(key, value);
        }
        if(showLogs) {
          console.log(`file2: ${filename}`);
        }
      
        fs.writeFile(filename, result, "utf8", function (suc, err) {
          if (err) {
            console.error("Error writing file:", err);
          } else {
            console.log("File written successfully to", filename);
          }
        });
      }
    });
  }
} catch (error) {
  core.setFailed(error.message);
}
