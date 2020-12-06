function onClick(e) {
    e.target.closest('.grid-days').nextElementSibling.lastElementChild.click();
}

Array.from(document.querySelectorAll('.grid-days')).forEach(function(value) {
    value.addEventListener('click', this.onClick.bind(this));
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((register) => {
        console.log('Registration succeeded');
      }).catch((error) => {
        console.log('Registration failed with ' + error);
      });
} else console.log('Your browser does not support the Service-Worker!');