package com.example.ktmodule4.controller;

import com.example.ktmodule4.module.Department;
import com.example.ktmodule4.module.Employee;
import com.example.ktmodule4.service.my_interface.IDepartmentService;
import com.example.ktmodule4.service.my_interface.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/employees")
@PropertySource("classpath:application.properties")
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IDepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<Employee>> findAllEmployee(){
        List<Employee> employees = employeeService.listAll();
        if (employees.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }

    @GetMapping ("/departments")
    public ResponseEntity<List<Department>> findAllDepartment(){
        List<Department> departments = departmentService.listAll();
        if (departments.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(departments,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findById(@PathVariable("id")Long id){
        Employee employee = employeeService.findById(id);
        if (employee!=null){
            return new ResponseEntity<>(employee,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/save")
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.save(employee),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable("id")Long id){
        Employee employee = employeeService.findById(id);
        if (employee!=null){
            employeeService.delete(id);
            return new ResponseEntity<>(employee,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
}
