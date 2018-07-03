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

            if (filter.getEvidenceId() != null)
                params.put("evidenceId", filter.getEvidenceId());

        }
    }

    @Override
    protected String getSearchWhereStatement(EvidenceCommentDTO filter) {
        StringBuilder whereStatementBuilder = new StringBuilder();
        if (filter.getId() != null)
            whereStatementBuilder.append(" AND  U.id = :id ");

        if (filter.getEvidenceId() != null)
            whereStatementBuilder.append(" AND  evidence.id = :evidenceId ");

        return whereStatementBuilder.toString();
    }


    @Override
    protected String getJoinForFetchStatement(EvidenceCommentDTO filter) {
        return " LEFT JOIN U.evidence evidence ";
    }

    @Override
    protected String getJoinForCountStatement(EvidenceCommentDTO filter) {
        return " LEFT JOIN U.evidence evidence ";
    }


    @Override
    protected String makeOrderByProperty(Sort.Order order, EvidenceCommentDTO filter) {
        return "U." + order.getProperty() + " " + order.getDirection().name();
    }

}
