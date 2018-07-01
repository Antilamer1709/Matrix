package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.dto.SearchDTO;
import org.springframework.data.domain.PageImpl;

public interface AbstractPagedRepo<T, F> {

    PageImpl<T> getPagedData(SearchDTO<F> filter);

}
