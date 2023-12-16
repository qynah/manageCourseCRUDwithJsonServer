var courseApi = 'http://localhost:3000/course';
var btnBack = document.querySelector("#btn_back");

btnBack.onclick = function backHome() {
    location.assign("http://127.0.0.1:5500/index.html");
};

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    getSingleCourse(id, function(course) {
        document.getElementById("inputName").value = course.name;
        document.getElementById("inputDescription").value = course.description;
        
    })

}

var updateBtn = document.querySelector('#btn_update');
updateBtn.onclick = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let name = document.getElementById("inputName").value;
    
    let desc = document.getElementById("inputDescription").value;
    let updatedCourse = {
        id: id,
        name: name,
        description: desc
    }
    console.log(updatedCourse);
    updateCourse(updatedCourse, function(course) {
        location.reload();
    })

}
function getSingleCourse(id, callback) {
    var options = {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    };
    if (id && /\D/.test()) {
        fetch(`${courseApi}/${id}`, options)
            .then(function (response) {
                return response.json();
            })
            .then(callback);
    }
    else {
        console.log(`Course id ${id} is not founded!`);
    }
}


function updateCourse(data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi + '/' + data.id, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}





