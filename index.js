let formEl;
let monstersUrl = 'http://localhost:3000/monsters';
const anchor = document.querySelector('#monster-container');
let page = 1;

const getMonsters = (page) => {
    // debugger
    let url = monstersUrl + `?_limit=50&_page=${page}`

    fetch(url)
    .then((resp) => resp.json())
    .then(renderMonsters);
};

const renderMonsters = (monsters) => {
    anchor.innerHTML = ""

    monsters.forEach(monster => {
        showMonster(monster);
    });
};

const showMonster = (monster) => {
    let monsterDiv= document.createElement('div') ;
       
       
       monsterDiv.innerHTML = `<h2>${monster.name}</h2><h4>Age: ${monster.age}</h4><p>Bio: ${monster.description}</p>`;
       anchor.appendChild(monsterDiv);
}

const renderForm = () => {
    const anchor = document.querySelector('#create-monster')

    const form = document.createElement('form')
    const a = document.createElement('input')
    const b = document.createElement('input')
    const c = document.createElement('input')
    const d = document.createElement('button')
    a.id = 'name' 
    b.id = 'age' 
    c.id = 'description' 
    a.placeholder = 'name...' 
    b.placeholder = 'age...' 
    c.placeholder = 'description...' 
    d.innerText = 'Create'

    form.append(a, b, c, d)
    anchor.appendChild(form)
    formEl = form
}

const getFormData= () => {
    
    
    return Object.assign(
        {},
        {name: formEl.name.value},
        {age: formEl.age.value},
        {description: formEl.description.value}
        );
};

const submitForm = () => {
    return fetch(monstersUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(getFormData())
    }).then(resp => resp.json().then(console.log));
};

const pageForward = () => {
    page += 1;

    getMonsters(page);
};

const pageBack = () => {
    page -= 1;

    getMonsters(page);
};


const init = () => {
    
    renderForm()
    getMonsters(page)
    
    formEl.addEventListener('submit', (event) => {
        event.preventDefault()
        submitForm() 
        formEl.reset()
    });

    document.addEventListener('click', 
        event => {if (event.target.id === 'forward') {
            pageForward();
        } else if (event.target.id === 'back') {
            pageBack();
         };
        });
};

init()


