var config = require('./')
<% if (type == 'A CMS is for suckers!') { %>
module.exports = {
  server: {
    baseDir: config.publicDirectory
  },
  files: [config.publicDirectory+'/**/*.{html,php}']
}
<% } else { %>
module.exports = {
  proxy: '<%= url %>',
  files: [config.publicDirectory+'/**/*.{html,php}']
}
<% } %>



