package com.innovationPassport.matrix.dto;

import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Data
public class SearchDTO<T> {

    private Integer id;

    private Integer first;

    private Integer rows;

    private Integer sortOrder;

    private String sortField;

    private T filter;


    public Pageable toPageable() {
        if (sortField != null) {
            return new PageRequest(toPageIndex(), rows, toSortDirection(), sortField);
        } else {
            return new PageRequest(toPageIndex(), rows);
        }
    }

    public int toPageIndex() {
        return (first + rows) / rows - 1;
    }

    public Sort.Direction toSortDirection() {
        return sortOrder == 1 ? Sort.Direction.ASC : Sort.Direction.DESC;
    }

}
