
showNotes();
//if user add a note add it to a local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        highlight: 1
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = ""
    
    showNotes();

});
let clrBtn=document.getElementById("clrBtn");
clrBtn.addEventListener("click",(e)=>{
    confirmed=confirm("Are u sure u want to delete the notes")
    
    if(confirmed){
    localStorage.clear();
    showNotes();}
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.highlight == 1) {
            html += `<div class="noteCard my-2 mx-2 card normal" style="width: 18rem;">
                
        <div class="card-body">
          <h5 class="card-title">Notes ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Notes</button>
          <button id="imp${index}" onclick="highlightNotes(this.id)" class="btn btn-warning">IMP</button>
        </div>

      </div>`}
        else {
            html += `<div class="noteCard my-2 mx-2 card pink" style="width: 18rem;">
                
        <div class="card-body">
          <h5 class="card-title">Notes ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Notes</button>
          <button id="imp${index}" onclick="unhighlightNotes(this.id)" class="btn btn-warning">less imp</button>
        
        </div>

      </div>`

        }
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = '<b>nothing to show in notes as u have already done your task</b>'
    }
}

//function to delete note
function deleteNotes(index) {
    // console.log('i am deleting',index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
function highlightNotes(idindex) {

    let notes = localStorage.getItem("notes");
    let parent = document.getElementById(idindex).parentElement.parentElement;
    console.log(parent)
    // parent.style.backgroundColor="red"
    parent.classList.add("pink");
    parent.classList.remove("normal");

    let i = +idindex.slice(3);
    console.log(i);
    notesObj = JSON.parse(notes);
    notesObj[i].highlight = 0;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    
 
    showNotes();
}
function unhighlightNotes(idindex) {

    let notes = localStorage.getItem("notes");
    let parent = document.getElementById(idindex).parentElement.parentElement;
    console.log(parent)
    // parent.style.backgroundColor="red"
    parent.classList.add("pink");
    parent.classList.remove("normal");

    let i = +idindex.slice(3);
    console.log(i);
    notesObj = JSON.parse(notes);
    notesObj[i].highlight = 1;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    
 
    showNotes();
}

search = document.getElementById(`searchTxt`);

search.addEventListener("input", function () {
    // name1='ankit';
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    // console.log("fired!!");
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


