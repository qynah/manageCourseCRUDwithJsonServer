import Course from '../main.js';

var btnCreate = document.querySelector('#btn_create');
btnCreate.onclick = function handleCreateForm() {
    var name = document.querySelector('input[name="name"]').value;
    //console.log('name: ' + name);

    var description = document.querySelector('input[name="description"]').value;
    console.log('desc: ' + description);
    const course = new Course(name, description);
    createCourse(course, function () {
        console.log('success!');
    })

}
var courseApi = 'http://localhost:3000/course';

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}




/**  redirect to create page */
var backBtn = document.querySelector('#btn_back');

if (backBtn) {
    backBtn.onclick = function () {
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
}

