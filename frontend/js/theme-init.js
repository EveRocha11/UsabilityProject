// Applies dark mode and font-size preference before first paint (no flash).
(function () {
  if (localStorage.getItem('nivela_dark_mode') === 'true')
    document.documentElement.classList.add('dark-mode');
  var f = localStorage.getItem('nivela_font_size');
  if (f === 'large') document.documentElement.classList.add('text-lg');
  else if (f === 'xl') document.documentElement.classList.add('text-xl');
})();
