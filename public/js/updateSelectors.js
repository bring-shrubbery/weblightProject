//general functions

function updateSelectors(state) {
  switch (state) {
    case 'light':
      $('#lightSelector').css('height', '25px');
      $('#switchSelector').css('height', '30px');
      $('#plugSelector').css('height', '30px');
    break;
    case 'switch':
      $('#lightSelector').css('height', '30px');
      $('#switchSelector').css('height', '25px');
      $('#plugSelector').css('height', '30px');
    break;
    case 'plug':
      $('#lightSelector').css('height', '30px');
      $('#switchSelector').css('height', '30px');
      $('#plugSelector').css('height', '25px');
    break;
    default:
    $('#lightSelector').css('height', '30px');
    $('#switchSelector').css('height', '30px');
    $('#plugSelector').css('height', '30px');
  }
}
