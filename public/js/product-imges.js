var noOfOptions = document.getElementById('noOfOptions');
var optionTitle = document.getElementById('optionTitle');
var optionDisplay = document.getElementById('optionDisplay');
var optionImg = document.getElementById('optionImg');
var allOptionsInput = document.getElementById('allOptionsInput');

noOfOptions.addEventListener('change', () => {
    var allOptions = []
    while (optionDisplay.lastElementChild) {
        optionDisplay.removeChild(optionDisplay.lastElementChild);
    }
    // console.log(noOfOptions.value)
    for (let i = 0; i < noOfOptions.value; i++) {
        var item = `<div class="optionsInput">Image Title/Caption ${i+1}:<input type="text" name="optionTitle" placeholder="Image Title">Image Link ${i+1}:<textarea type="text" name="optionImg" rows="4" placeholder="Image Link" required></textarea></div>`
        allOptions.push(item)
        optionDisplay.insertAdjacentHTML('beforeend', item);
    }
})
