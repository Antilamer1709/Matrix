package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.dto.EvidenceCommentDTO;
import com.innovationPassport.matrix.model.EvidenceCommentEntity;
import org.springframework.data.domain.Sort;

import java.util.Map;

public class EvidenceCommentRepoImpl extends AbstractPagedRepoImpl<EvidenceCommentEntity, EvidenceCommentDTO> implements AbstractPagedRepo<EvidenceCommentEntity, EvidenceCommentDTO> {

    @Override
    protected void initSearchWhereParameters(EvidenceCommentDTO filter, Map<String, Object> params) {
        if (filter != null) {
            if (filter.getId() != null)
                params.put("id", filter.getId());

        }
    }

    @Override
    protected String getSearchWhereStatement(EvidenceCommentDTO filter) {
        StringBuilder whereStatementBuilder = new StringBuilder();
        if (filter.getId() != null)
            whereStatementBuilder.append(" AND  U.id = :id ");

        return whereStatementBuilder.toString();
    }


    @Override
    protected String getJoinForFetchStatement(EvidenceCommentDTO filter) {
        return " ";
    }

    @Override
    protected String getJoinForCountStatement(EvidenceCommentDTO filter) {
        return " ";
    }


    @Override
    protected String makeOrderByProperty(Sort.Order order, EvidenceCommentDTO filter) {
        return "U." + order.getProperty() + " " + order.getDirection().name();
    }

}
