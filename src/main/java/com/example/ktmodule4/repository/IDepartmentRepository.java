package com.example.ktmodule4.repository;

import com.example.ktmodule4.module.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface IDepartmentRepository extends JpaRepository<Department,Long> {
}
