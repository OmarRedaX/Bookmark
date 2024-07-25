var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkUrl");

var bookmarklist;

if(localStorage.getItem("bookMarks") == null){
    bookmarklist = [];
}

else{
    bookmarklist = JSON.parse( localStorage.getItem("bookMarks"));
    display();
}


function add(){
    var bookmark = {
        code: siteName.value,
        url: siteUrl.value,
    };

    if (validateInput(siteName) == true && validateInput(siteUrl) == true ){
        bookmarklist.push(bookmark);
        localStorage.setItem("bookMarks",JSON.stringify(bookmarklist))

        display()
        clear();
    }

    else{
        alert(`Site name must contain at least 3 characters
Site URL must be a valid one`)
    }

    

}

function display(){
    var box = "";

    for (var i =0 ; i < bookmarklist.length; i++) {
        box +=`<tr>
                    <td class="text-capitalize">${i+1}</td>
                    <td class="text-capitalize">${bookmarklist[i].code}</td>
                    <td><a href="https://www.${bookmarklist[i].url}" target="_blank"><button type="button" class="btn btn-success text-white"><i class="fa-solid fa-eye"></i>  Visit</button></a></td>
                    <td class="text-capitalize"><button onclick="deleteItem(${i})" type="button" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
                </tr>`
    }

    document.getElementById("tableContent").innerHTML = box;

}

function deleteItem(index){
    bookmarklist.splice(index,1);
    localStorage.setItem("bookMarks",JSON.stringify(bookmarklist))
    display();
}


function clear(){
    siteName.value = null;
    siteUrl.value = null;
}

function validateInput(element){
    var regex = {
        bookmarkName:/^[a-zA-Z0-9-]{3,}$/,
        bookmarkUrl: /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/
    }

    if(regex[element.id].test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid")
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid")
        return false;
    }


}



