var lightSelector = document.getElementById('lightSelector');
var switchSelector = document.getElementById('switchSelector');
var plugSelector = document.getElementById('plugSelector');
//general functions

function updateSelectors(state) {
  switch (state) {
    case 'light':
      lightSelector.style.height = '25px';
      switchSelector.style.height = '30px';
      plugSelector.style.height = '30px';
    break;
    case 'switch':
      lightSelector.style.height = '30px';
      switchSelector.style.height = '25px';
      plugSelector.style.height = '30px';
    break;
    case 'plug':
      lightSelector.style.height = '30px';
      switchSelector.style.height = '30px';
      plugSelector.style.height = '25px';
    break;
    default:
    lightSelector.style.height = '30px';
    switchSelector.style.height = '30px';
    plugSelector.style.height = '30px';
  }
}
