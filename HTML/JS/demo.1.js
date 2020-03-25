let date = new Date('2020-03-12T15:00:00.000Z').toISOString().substring(0, 10);
const editedDate = date.split('-');
var events = [
  {'Date': new Date(editedDate), 'Title': 'Грандиозная акция на шаблоны'},
  // {'Date': new Date(2020, 3 - 1, 18), 'Title': 'Раздача промокодов на покупку шаблонов'},
  // {'Date': new Date(2020, 3 - 1, 27), 'Title': 'День рождение администратора сайта'},
];



var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
