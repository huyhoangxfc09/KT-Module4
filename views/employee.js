    function home() {
      displayEmployee()
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
    function detailEmployee(id){
        $.ajax({
            url: `http://localhost:8080/employees/${id}`,
            type: "GET",
            success(data){

            }
        })
    }


