    function home() {
      displayEmployee()
    }

    window.onload = home

    function displayEmployee(){

    }

    function tableEmployee(){
        let context = `<div class="container">
                            <h2 style="text-align: center">List Employee</h2>
                            <table class="table table-striped">
                            <thead>
                                <tr>
                                  <th colspan="2" style="text-align: center" >Action</th>     
                                  <th>EmployeeCode</th>                                                      
                                  <th>Name</th>                                                      
                                  <th>Age</th>                                                    
                                  <th>Salary</th>                                                    
                                  <th>Department</th>                                                    
                                  <th>Action</th>                                                                                     
                                </tr>
                            </thead>
                           <tbody>`
        for (let i = 0; i < data.length; i++){
            context+= `<tr>
                           <td>${data[i].codeEmployee}</td>
                           <td>${data[i].name}</td>
                           <td>${data[i].age}</td>
                           <td>${data[i].salary}</td>
                           <td>${data[i].department.name}</td
                           <td><button class="btn btn-warning" onclick="updateFormProduct(${data[i].id})">Update</button></td>
                           <td><button class="btn btn-danger" onclick="deleteProduct(${data[i].id})">Delete</button></td>
                       </tr>`
        }
        context+= `</tbody> </table> </div>`
        document.getElementById("showProduct").innerHTML = context
    }