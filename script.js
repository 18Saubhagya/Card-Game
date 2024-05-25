const cardContainer = document.getElementById('card-container');
cardContainer.innerHTML = '';
const imageFolder = 'images';
const hidden = 'images/hidden.png'
const imageList = [];
for (var i = 1; i <= 10; i++)
    imageList.push('img' + i + '.png');

imageList.forEach(imageName => {
    const imgElement = document.createElement('img');
    imgElement.src = `${hidden}`;
    imgElement.classList.add('check');
    imgElement.dataset.imgsrc = `${imageFolder}/${imageName}`

    const imgItem = document.createElement('div');
    imgItem.className = 'image-item';
    imgItem.appendChild(imgElement);

    cardContainer.appendChild(imgItem);
});

const imageItems = document.querySelectorAll('.check');
imageItems.forEach(imageItem => imageItem.addEventListener('click', function() {
    const str = this.src;
    if (str.includes(hidden))
        this.src = this.dataset.imgsrc;
    else
        this.src = hidden;
}));