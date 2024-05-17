function LivesCreate() {
    // create the lives via javascript
    var livesContainer = document.querySelector('.lives');

    var livetit = document.createElement('h1');
    livetit.className = 'livestag';
    livetit.textContent = 'Lives:';
    livesContainer.appendChild(livetit);
    var ul = document.createElement('ul');

    for (var i = 1; i <= 3; i++) {
        var li = document.createElement('li');
        li.className = 'livescolour';
        li.id = i.toString();
        ul.appendChild(li);
    }

    livesContainer.appendChild(ul);

}