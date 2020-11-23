function onClick(e) {
    e.target.closest('.grid-days').nextElementSibling.lastElementChild.click();
}

Array.from(document.querySelectorAll('.grid-days')).forEach(function(value) {
    value.addEventListener('click', this.onClick.bind(this));
});