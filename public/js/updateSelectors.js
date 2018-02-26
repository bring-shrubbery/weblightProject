var lightSelector = document.getElementById('lightSelector');
var switchSelector = document.getElementById('switchSelector');
var plugSelector = document.getElementById('plugSelector');
//general functions

function updateSelectors(state) {
  switch (state) {
    case 'light':
      lightSelector.style.height = '0.7em';
      switchSelector.style.height = '1em';
      plugSelector.style.height = '1em';
    break;
    case 'switch':
      lightSelector.style.height = '1em';
      switchSelector.style.height = '0.7em';
      plugSelector.style.height = '1em';
    break;
    case 'plug':
      lightSelector.style.height = '1em';
      switchSelector.style.height = '1em';
      plugSelector.style.height = '0.7em';
    break;
    default:
    lightSelector.style.height = '1em';
    switchSelector.style.height = '1em';
    plugSelector.style.height = '1em';
  }
}
