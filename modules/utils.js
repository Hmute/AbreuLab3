const messages = require('../lang/en');

function getDate(name) {
  const now = new Date();
  const msg = messages.greeting.replace('%1', name || 'Guest');
  return `<p style="color:blue">${msg} ${now}</p>`;
}

module.exports = { getDate };