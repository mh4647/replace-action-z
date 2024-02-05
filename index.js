const core = require('@actions/core');

try {
  const files = core.getInput("files");
  const vars_string = core.getInput("replacements");
  const filenames = files.replace(" ", "").split(",");
  const vars = vars_string.split(",");
  console.log(`files l: ${filenames.length}`);
  for (let fi = 0; fi < filenames.length; fi++) {
    const filename = filenames[fi];
    const fs = require("fs");
    console.log(`file1: ${fi}`);
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let result = data;
        console.log(data);
        for (let i = 0; i < vars.length; i++) {
          const kv = vars[i].split('=')
          const key = kv[0]
          const value = kv[1]
          console.log(`key: ${key}`);
          console.log(`Value: ${value}`);
          result = result.replace(key, value);
        }
        console.log(`file2: ${filename}`);
        fs.writeFile(filename, result, "utf8", function (err) {
          if (err) console.log(err);
          else console.log(result);
        });
      }
    });
  }
} catch (error) {
  core.setFailed(error.message);
}
