package com.example.ktmodule4.service.impl;

import com.example.ktmodule4.module.Department;
import com.example.ktmodule4.repository.IDepartmentRepository;
import com.example.ktmodule4.service.my_interface.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService implements IDepartmentService {
    @Autowired
    private IDepartmentRepository departmentRepository;
    @Override
    public List<Department> listAll() {
        return departmentRepository.findAll();
    }

    @Override
    public Department save(Department department) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Department findById(Long id) {
        return null;
    }
}
