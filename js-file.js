function add_boxes() {

    const drawContainer = document.querySelector('.draw-container');
    let dimension = Number(document.querySelector('.size').value)

    for (i = 0; i < dimension; i++) {
        const rowAdd = document.createElement('div');
        rowAdd.setAttribute('class', 'row');
        for (x = 0; x < dimension; x++) {
            const columnAdd = document.createElement('div');
            columnAdd.setAttribute('class', 'column');
            rowAdd.appendChild(columnAdd);
        };
        drawContainer.appendChild(rowAdd);
    };
    add_hover();
};

function opacityModifier(e) {
    const style = window.getComputedStyle(e);
    let eOpacity = style.getPropertyValue('opacity');
    if (e.className == 'column rainbow') {
        eOpacity = 0;
    };
    return Number(eOpacity) + 0.1;
};

function randomRGB() {
    let red = Math.floor((Math.random() * 256) + 1);
    let blue = Math.floor((Math.random() * 256) + 1);
    let green = Math.floor((Math.random() * 256) + 1);
    return `rgb(${red}, ${blue}, ${green})`
}

function change_color() {

    let e = document.querySelector('.selected-color');

    switch(e.className) {
        case 'color black selected-color':
            return { color : 'black', opacity : 1 };
        case 'color gray selected-color':
            return { color : 'gray', opacity : 0 };
        case 'color rainbow selected-color':
            return { color : 'rainbow', opacity : 1 };
    }
}

function add_hover() {
    
    const allColumns = document.querySelectorAll('.column');

    allColumns.forEach(function(element) {
        element.addEventListener('mouseover', function() {
            let colorObj = change_color(element);
            let color = colorObj.color;
            let opacity = colorObj.opacity;
            let colorAdd;
            if (color == 'rainbow') {
                this.className = 'column rainbow';
                colorAdd = randomRGB();
            } else if (color == 'gray') {
                colorAdd = 'black'
                opacity = opacityModifier(element);
                this.className = 'column'
            } else {
                this.className = 'column'
                colorAdd = 'black';
            }
            this.setAttribute('style', `background-color: ${colorAdd}; opacity: ${opacity}`);
        });
    });
};

function reset_boxes() {

    const rows = document.querySelectorAll('.row');
    rows.forEach(function(element) {
        element.remove();
    });
    add_boxes();
};

add_boxes();

const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', function() {
    reset_boxes();
});

document.querySelector('.size').addEventListener('input', function() {
    reset_boxes();
    document.querySelector('.size-text').textContent = document.querySelector('.size').value + " x " + document.querySelector('.size').value;
});

const colorButtons = document.querySelectorAll('.color');

colorButtons.forEach(function(e) {
    e.addEventListener('click', function() {
        document.querySelector('.selected-color').classList.remove('selected-color');
        e.classList.add('selected-color')
        add_hover();
    });
});