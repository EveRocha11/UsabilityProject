(() => {
  const returnPage  = localStorage.getItem('nivela_exit_return')      || 'dashboard.html';
  const destination = localStorage.getItem('nivela_exit_destination')  || 'dashboard.html';

  function cleanup() {
    localStorage.removeItem('nivela_exit_return');
    localStorage.removeItem('nivela_exit_destination');
  }

  document.querySelector('.exit-modal-btn-confirm').addEventListener('click', () => {
    cleanup();
    globalThis.location.href = destination;
  });

  function goBack() {
    cleanup();
    globalThis.location.href = returnPage;
  }

  document.querySelector('.exit-modal-btn-cancel').addEventListener('click', goBack);
  document.querySelector('.exit-modal-close').addEventListener('click', goBack);
})();
