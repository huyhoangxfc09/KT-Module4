package com.example.ktmodule4.repository;

import com.example.ktmodule4.module.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value = "select e from Employee as e order by e.age asc ")
    List<Employee> sortByAge();

    @Query(value = "select e from Employee as e where e.department.id = :id")
    List<Employee> searchByDepartment(@Param("id")Long id);
}
