    function home() {
      displayEmployee()
        getDepartment1()
        $("#detailEmployee").hide()
    }

    window.onload = home

    function displayEmployee(){
        $.ajax({
            url : "http://localhost:8080/employees",
            type : "GET",
            success(data){
                tableEmployee(data)
                $("#saveForm").hide()
                $("#showEmployee").show()
            }
        })
    }

    function tableEmployee(data){
        let context = `<div class="container">
                            <h2 style="text-align: center">List Employee</h2>
                            <table class="table table-striped">
                            <thead>
                                <tr>  
                                                                    
                                  <th>EmployeeCode</th>                                                      
                                  <th>Name</th>                                                      
                                  <th>Age</th>                                                    
                                  <th>Salary</th>                                                    
                                  <th>Department</th>  
                                  <th colspan="2" style="text-align: center">Action</th>                                                                                                                                                                       
                                </tr>
                            </thead>
                           <tbody>`
        for (let i = 0; i < data.length; i++){
            context+= `<tr>
                           <td>${data[i].codeEmployee}</td>
<!--                           <td><button onclick="detailEmployee(${data[i].id})">${data[i].name}</button></td>-->
                           <td><a class="button" onclick="detailEmployee(${data[i].id})">${data[i].name}</a></td>                       
                           <td>${data[i].age}</td>
                           <td>${data[i].salary}</td>
                           <td>${data[i].department.name}</td>
                           <td><button class="btn btn-warning" onclick="updateFormEmployee(${data[i].id})">Update</button></td>
                           <td><button class="btn btn-danger" onclick="deleteEmployee(${data[i].id})">Delete</button></td>                     
                       </tr>`
        }
        context+= `</tbody> </table> </div>`
        document.getElementById("showEmployee").innerHTML = context
    }

    function createFormEmployee(){
        document.getElementById("saveForm").reset()
        $("#employee").hide()
        getDepartment();
        document.getElementById("title").innerHTML = "CREATE"
        document.getElementById("action").setAttribute("onclick", "createEmployee()")
        document.getElementById("action").innerHTML = "Create"
        $("#saveForm").show()

    }

    function getDepartment(){
            $.ajax({

                url : "http://localhost:8080/employees/departments",
                type: "GET",
                success(data){
                    console.log(data)
                    let context = `<label for="departments" class="form-label">Department</label><br>
                                        <select id="departments" class="form-control"  style="width: 25%">`
                    for (let i =0; i <data.length; i++){
                        context+=`<option value="${data[i].id}">${data[i].name}</option>`
                    }
                    context += `</select>`
                    document.getElementById("departmentOption").innerHTML = context
                },
            })
    }
    function getDepartment1(){
        $.ajax({

            url : "http://localhost:8080/employees/departments",
            type: "GET",
            success(data){
                console.log(data)
                let context = `
                                        <select id="departments" class="form-control" >`
                for (let i =0; i <data.length; i++){
                    context+=`<option value="${data[i].id}">${data[i].name}</option>`
                }
                context += `</select>`
                document.getElementById("departmentOption1").innerHTML = context
            },
        })
    }
    function createEmployee(){
        let employee = {
            name : $("#name").val(),
            age : $("#age").val(),
            salary : $("#salary").val(),
            codeEmployee : $("#code").val(),
            department : {
                id : $("#departments").val(),
            }
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/employees/save",
            type: "POST",
            data: JSON.stringify(employee),
            success() {
                alert("Successful!")
                displayEmployee()
                $("#showEmployee").show()
            }
        })
        event.preventDefault()
    }
    function backToHome(){
        displayEmployee()
        $("#showEmployee").show()
        $("#detailEmployee").hide()
    }

    function updateFormEmployee(id){
        $.ajax({
            url : `http://localhost:8080/employees/${id}`,
            type: "GET",
            success(data) {
                $("#name").val(data.name)
                $("#age").val(data.age)
                $("#salary").val(data.salary)
                $("#code").val(data.codeEmployee)
                getDepartment()
                document.getElementById("title").innerHTML = "UPDATE"
                document.getElementById("action").setAttribute("onclick", `updateEmployee(${id})`)
                document.getElementById("action").innerHTML = "Update"
                $("#showEmployee").hide()
                $("#saveForm").show()
            }
        })
    }

    function updateEmployee(id){
        let employee = {
            id : id,
            name : $("#name").val(),
            age : $("#age").val(),
            salary : $("#salary").val(),
            codeEmployee : $("#code").val(),
            department : {
                id : $("#departments").val(),
            }
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/employees/save",
            type: "POST",
            data: JSON.stringify(employee),
            success() {
                alert("Successful!")
                displayEmployee()
                $("#showEmployee").show()
            }
        })
        event.preventDefault()
    }
    function deleteEmployee(id) {
        if (confirm("Do you want to delete ?")) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                url: `http://localhost:8080/employees/delete/${id}`,
                type: "DELETE",

                success() {
                    alert("Delete successfully!")
                    displayEmployee()
                    $("#showEmployee").show()
                }
            })
        }
    }
    // function detailEmployee(id){
    //     $.ajax({
    //         url: `http://localhost:8080/employees/${id}`,
    //         type: "GET",
    //         success(data){
    //             console.log(data)
    //             let context = `<form>
    //                             <table>
    //                             <tr>
    //                             <th>Detail Employee</th>
    //                             </tr>
    //                             <tr>
    //                             <td>Employee Code</td>
    //                             <td>${data.codeEmployee}</td>
    //                             </tr>
    //                             <tr>
    //                             <td>Name</td>
    //                             <td>${data.name}</td>
    //                             </tr>
    //                             <tr>
    //                             <td>Age</td>
    //                             <td>${data.age}</td>
    //                             </tr>
    //                             <tr>
    //                             <td>Salary</td>
    //                             <td>${data.salary}</td>
    //                             </tr>
    //                             <td>Salary</td>
    //                             <td>${data.department.name}</td>
    //                             </tr>
    //                             </table>
    //                             </form>`
    //             document.getElementById("detailEmployee").innerHTML = context
    //             console.log(context)
    //             $("#detailEmployee").show()
    //         }
    //     })
    // }
    function detailEmployee(id){
        $.ajax({
            url: "http://localhost:8080/employees/" + id,
            type: "GET",
            success(data) {
                showDetail(data)
                $("#showEmployee").hide()
                $("#detailEmployee").show()

            }
        })
    }
    function showDetail(data){
        let context = `
                    <h1>Employee Detail</h1> 
                  <p>EmployeeCode: ${data.codeEmployee} </p><br>
                  <p>Name: ${data.name} </p><br>
                  <p>Salary: ${data.salary} </p><br>
                  <p>Age: ${data.age} </p><br>
                  <p>Department:${data.department.name} </p><br>
                  <button class="btn btn-secondary" onclick="backToHome()">Back</button>
                 
                 `
        document.getElementById("detailEmployee").innerHTML = context
    }
    function sortEmployee(){
        $.ajax({
            url : "http://localhost:8080/employees/sort",
            type : "GET",
            success(data){
                tableEmployee(data)
                $("#saveForm").hide()
                $("#showEmployee").show()
            }
        })
    }
    function searchDepartment(){
        let id =  $("#departments").val()
        $.ajax({
            url : `http://localhost:8080/employees/search/${id}`,
            type : "GET",
            success(data){
                tableEmployee(data)
                $("#saveForm").hide()
                $("#showEmployee").show()
            }
        })
    }


