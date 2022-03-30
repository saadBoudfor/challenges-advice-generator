let currentID = -1;
let cpt = 1;

function generate() {
    enableLoading();
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(response => response['slip'])
        .then(response => displayAdvice(response))
        .catch(reason => console.error('request Advise API failed', {reason}));
}


function displayAdvice(adviceWrapper) {
    if (currentID === adviceWrapper.id) {
        cpt++;
        generate();
    } else {
        console.log('New advice "' + adviceWrapper['advice'] + '" in ' + cpt + ' attempts')
        const adviceTitle = document.querySelector('.advice h1');
        adviceTitle.innerHTML = 'advice #' + adviceWrapper.id;

        const adviceDescription = document.querySelector('.advice p');
        adviceDescription.innerHTML = '“' + adviceWrapper['advice'] + '”';
        currentID = adviceWrapper.id;
        cpt = 1;
        disableLoading();
    }
}


function enableLoading() {
    const divider = document.querySelector('.divider');
    divider.className = 'divider loading';
}

function disableLoading() {
    const divider = document.querySelector('.divider');
    divider.className = 'divider';
}