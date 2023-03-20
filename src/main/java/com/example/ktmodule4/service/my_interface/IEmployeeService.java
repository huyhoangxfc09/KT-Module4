package com.example.ktmodule4.service.my_interface;

import com.example.ktmodule4.module.Employee;
import com.example.ktmodule4.service.core.ICoreService;

import java.util.List;

public interface IEmployeeService extends ICoreService<Employee> {
    List<Employee> sortByAge();
}
