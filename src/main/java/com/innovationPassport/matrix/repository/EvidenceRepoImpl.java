package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.model.EvidenceEntity;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.util.Map;

public class EvidenceRepoImpl extends AbstractPagedRepoImpl<EvidenceEntity, EvidenceDTO> implements AbstractPagedRepo<EvidenceEntity, EvidenceDTO> {

    @Override
    protected void initSearchWhereParameters(EvidenceDTO filter, Map<String, Object> params) {
        if (filter != null) {
            if (filter.getId() != null)
                params.put("id", filter.getId());

            if (!StringUtils.isEmpty(filter.getEvidence()))
                params.put("evidence", filter.getEvidence().trim());

        }
    }

    @Override
    protected String getSearchWhereStatement(EvidenceDTO filter) {
        StringBuilder whereStatementBuilder = new StringBuilder();
        if (filter.getId() != null)
            whereStatementBuilder.append(" AND  U.id = :id ");


        if (!StringUtils.isEmpty(filter.getEvidence())) {
            whereStatementBuilder.append(" AND LOWER(LTRIM(U.evidence)) LIKE LOWER(CONCAT(:evidence, '%')) ");
        }

        return whereStatementBuilder.toString();
    }


    @Override
    protected String getJoinForFetchStatement(EvidenceDTO filter) {
        return " ";
    }

    @Override
    protected String getJoinForCountStatement(EvidenceDTO filter) {
        return " ";
    }


    @Override
    protected String makeOrderByProperty(Sort.Order order, EvidenceDTO filter) {
        return "U." + order.getProperty() + " " + order.getDirection().name();
    }

}
