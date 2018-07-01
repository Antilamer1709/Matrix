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

            if (filter.getTopicId() != null)
                params.put("topicId", filter.getTopicId());

            if (filter.getId() != null)
                params.put("id", filter.getId());

            if (!StringUtils.isEmpty(filter.getEvidence()))
                params.put("evidence", filter.getEvidence().trim());

            if (!StringUtils.isEmpty(filter.getSource()))
                params.put("source", filter.getSource().trim());

            if (!StringUtils.isEmpty(filter.getCredibility()))
                params.put("credibility", filter.getCredibility().trim());


            if (filter.getHypotheses() != null && filter.getHypotheses().size() > 0) {
                filter.getHypotheses().forEach((index, value) -> {
                    params.put("position" + index, index);
                    params.put("value" + index, value);
                });
            }

        }
    }

    @Override
    protected String getSearchWhereStatement(EvidenceDTO filter) {
        StringBuilder whereStatementBuilder = new StringBuilder();

        whereStatementBuilder.append(" AND topic.id = :topicId ");

        if (filter.getId() != null)
            whereStatementBuilder.append(" AND  U.id = :id ");


        if (!StringUtils.isEmpty(filter.getEvidence())) {
            whereStatementBuilder.append(" AND LOWER(LTRIM(U.evidence)) LIKE LOWER(CONCAT(:evidence, '%')) ");
        }

        if (!StringUtils.isEmpty(filter.getSource())) {
            whereStatementBuilder.append(" AND LOWER(LTRIM(U.source)) LIKE LOWER(CONCAT(:source, '%')) ");
        }

        if (!StringUtils.isEmpty(filter.getCredibility())) {
            whereStatementBuilder.append(" AND  U.credibility = :credibility ");
        }

        if (filter.getHypotheses() != null && filter.getHypotheses().size() > 0) {
            filter.getHypotheses().forEach((index, value) -> {
                whereStatementBuilder.append(" AND  evidenceHypotheses.position = :position" + index + " ");
                whereStatementBuilder.append(" AND  evidenceHypotheses.value = :value" + index + " ");
            });
        }

        return whereStatementBuilder.toString();
    }


    @Override
    protected String getJoinForFetchStatement(EvidenceDTO filter) {
        StringBuilder join = new StringBuilder();
        join.append(" LEFT JOIN U.topic topic");

        if(filter.getHypotheses() != null && filter.getHypotheses().size() > 0) {
            join.append(" LEFT JOIN U.evidenceHypotheses evidenceHypotheses");
        }

        return join.toString();
    }

    @Override
    protected String getJoinForCountStatement(EvidenceDTO filter) {
        StringBuilder join = new StringBuilder();
        join.append(" LEFT JOIN U.topic topic");

        if(filter.getHypotheses() != null && filter.getHypotheses().size() > 0) {
            join.append(" LEFT JOIN U.evidenceHypotheses evidenceHypotheses");
        }

        return join.toString();
    }


    @Override
    protected String makeOrderByProperty(Sort.Order order, EvidenceDTO filter) {
        return "U." + order.getProperty() + " " + order.getDirection().name();
    }

}
