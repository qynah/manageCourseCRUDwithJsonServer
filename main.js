// import handleCreateForm from './create.js';

// createCourse(msg, function() {
//     getCourse(renderCourses);
// })
// handleCreateForm();

// import data from './create.js';

// document.getElementById("demo").innerHTML = data();


// const data = (newName, newDesc) => {
//     const name = newName;
    
//     const description = newDesc;
//     return {
//         name: newName,
//         description: newDesc
//     }
// }
// export default data;



// import C from './create.js';
// const course = new C('hello', 'asgdajshd')
// console.log(course);


export default class Course {
    constructor(name, description) {
        this.name = name,
        this.description = description
    }
}

export class getCourseItem {
    constructor(id, name, description) {
        this.id = id,
        this.name = name,
        this.description = description
    }
}
// import {getCourseItemFromMain} from './update.js';
// console.log(new getCourseItemFromMain(2, 'dasdasd', 'dasdaddddd'));

export function printString(course)  {
    return (course);
}
// printString("jdashdk")
// var idItem;
// printString(idItem);



export function printId(course)  {
    console.log(`id: ${course.id}`)
}
export function getId(course)  {
    return course.id;
}

// import {printId} from "./update.js";    
// console.log(printId(10));


export function printName(course)  {
    console.log(`name: ${course.name}`)
}
export function printDesc(course)  {
    console.log(`desc: ${course.description}`)
}
/**  redirect to create page */
var createBtn = document.querySelector('#btn_create');

if(createBtn) {
    createBtn.onclick = function () {
        window.location.href = "http://127.0.0.1:5500/createCourse/create.html";
        // window.location.href = "createCourse\create.html";
    }
}

var courseApi = 'http://localhost:3000/course';

function start() {
    getCourses(renderCourses);
};
start();

function getCourses(callback) {
    fetch(courseApi)
        .then (response => response.json())
        .then (callback);
}
function getCourse(id, callback) {
    var options = {
        method: 'DELETE',
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
        console.log(`Course id ${id} can't be deleted!`);
    }
}
function renderCourses(courses) {
    var listCourseBlock = document.getElementById('list_courses');
    var htmls = courses.map(function(course) {
        return `
            <tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td>
                    <div>
                        <i class="icon_update fa-solid fa-pen"></i>
                        <button data-id="${course.id}" class="update">Update</button>
                    </div>
                    <div>
                        <i class="icon_delete fa-solid fa-trash"></i>
                        <button data-id="${course.id}" class="delete">Delete</button>
                    </div>
                </td>
            </tr>   
        `;
    });
    listCourseBlock.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Course name</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
    ` +  htmls.join('');

    /** UPDATE FUNCTION */
    var updateBtn = document.querySelectorAll('.update');

    for (var i=0; i< updateBtn.length; i++) {
        updateBtn[i].addEventListener('click', function() {
            let idItem = this.getAttribute("data-id");
            console.log(printString(idItem));
            const urlUpdate = 'http://127.0.0.1:5500/updateCourse/update.html';
            window.location.href = `${urlUpdate}?id=${idItem}`;
        })
    }

    /** DELETE FUNCTION */
    var deleteBtn = document.querySelectorAll('.delete');

    for (var i=0; i< deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', function() {
            let idItem = this.getAttribute("data-id");
            getCourse(idItem, function() {
                console.log(`Delete success course id ${idItem}!`);
                getCourses(renderCourses);
            })
        })
    }
}
