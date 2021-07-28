let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function getNotes(userId) {
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (db) => {
        const data = db.val();
        renderData(data);
    });
}

function renderData(data) {
    let html = "";
    for (const dataKey in data) {
        const note = data[dataKey];
        //const cardHtml = renderCard(note);
        //html += cardHtml;
        renderCard(note);
    }
    // add html to the page
    //document.querySelector('#app').innerHTML = html;    
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderCard(note) {
    let div = document.createElement("div");
    div.classList.add("column", "is-onequarter");
    
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("style", `background-color: ${getRandomColor()}`)
    div.appendChild(card);

    let header = document.createElement("header");
    header.classList.add("card-header");
    card.appendChild(header);

    let title = document.createElement("span");
    title.classList.add("card-header-title");
    title.innerText = note.title;
    header.appendChild(title);

    let signature = document.createElement("span");
    signature.classList.add("subtitle", "is-6");
    signature.innerText = googleUser.displayName;
    header.appendChild(signature);

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("card-content");
    card.appendChild(contentDiv);
    
    let noteText = document.createElement("div");
    noteText.classList.add("content");
    noteText.innerText = note.text;
    contentDiv.appendChild(noteText);

    let footer = document.createElement("footer");
    footer.classList.add("card-footer");
    card.appendChild(footer);

    for(const tag in note)
    {
        const tag = document.createElement("a");
        tag.classList.add("card-footer-item");
        
    }

    const currentDiv = document.getElementById("app");
    currentDiv.insertAdjacentElement("afterbegin", div);

    // convert a note to html and return it
    /* return 
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <span class="card-header-title">${note.title}</span>
                    <span class="subtitle is-6"><i>${googleUser.displayName}</i></span>
                </header>
                <div class="card-content>
                    <div class="content"">${note.text}</div>
                </div>
            </div>            
        </div>
    `;   */ 
}