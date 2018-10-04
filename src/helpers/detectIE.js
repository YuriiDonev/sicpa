
export const detectIE = () => {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf('MSIE ');
  let trident = ua.indexOf('Trident/');
  let edge = ua.indexOf('Edge/');

  if (msie > 0 || trident > 0 || edge > 0) {
    return 'IE';
  } else {
    return '';
  }
};
