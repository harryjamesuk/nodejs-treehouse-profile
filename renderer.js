var fs= require('fs');

function mergeValues(values, content) {
  // Cycle over the keys
  for (var key in values) {
    content = content.replace("{{" + key + "}}", values[key]);
  }
  // Replace all {{key}} with the value from values object.

  return content;
}

function view(template, values, response) {
  // Read from the template files.
  var fileContents = fs.readFileSync('./views/' + template + '.html', {encoding: "utf-8"});
  // Insert values into the content.
  fileContents = mergeValues(values, fileContents);
  // Write out to the response.
  response.write(fileContents);

}

module.exports.view = view;
