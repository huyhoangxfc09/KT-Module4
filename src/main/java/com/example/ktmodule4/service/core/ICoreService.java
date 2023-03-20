package com.example.ktmodule4.service.core;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICoreService <E>{
    List<E> listAll();
    E save(E e);
    void delete(Long id);
    E findById(Long id);

}
