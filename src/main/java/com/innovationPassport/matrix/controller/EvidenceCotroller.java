package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.EvidenceCommentDTO;
import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.TopicDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
import com.innovationPassport.matrix.exception.UnauthorizedException;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.service.EvidenceBO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/evidence")
public class EvidenceCotroller {

    @Autowired
    private EvidenceBO evidenceBO;


    @PostMapping(value = "/search")
    public ResponseDTO<List<EvidenceDTO>> search(@RequestBody SearchDTO<EvidenceDTO> searchDTO) {
        log.debug("*** search() SearchDTO: " + searchDTO);
        return evidenceBO.search(searchDTO);
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PostMapping(value = "/create")
    @ResponseStatus(value = HttpStatus.OK)
    public void create(@RequestBody EvidenceDTO evidenceDTO) {
        log.debug("*** create() evidenceDTO: " + evidenceDTO);
        evidenceBO.create(evidenceDTO);
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PostMapping(value = "/edit")
    @ResponseStatus(value = HttpStatus.OK)
    public void edit(@RequestBody EvidenceDTO evidenceDTO) throws UnauthorizedException {
        log.debug("*** edit() evidenceDTO: " + evidenceDTO);
        evidenceBO.edit(evidenceDTO);
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PostMapping(value = "/delete")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteEvidence(@RequestBody EvidenceDTO evidenceDTO) throws UnauthorizedException {
        log.debug("*** deleteEvidence() evidenceDTO: " + evidenceDTO);
        evidenceBO.deleteEvidence(evidenceDTO);
    }

    @GetMapping(value = "/getEvidence/{id}")
    public EvidenceDTO getEvidence(@PathVariable Integer id) throws ValidationException {
        log.debug("*** getEvidence() id: " + id);
        return evidenceBO.getEvidence(id);
    }

    @PostMapping(value = "/searchComments")
    public ResponseDTO<List<EvidenceCommentDTO>> searchComments(@RequestBody SearchDTO<EvidenceCommentDTO> searchDTO) {
        log.debug("*** searchComments() SearchDTO: " + searchDTO);
        return evidenceBO.searchComments(searchDTO);
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PostMapping(value = "/addComment")
    @ResponseStatus(value = HttpStatus.OK)
    public void addComment(@RequestBody EvidenceCommentDTO commentDTO) {
        log.debug("*** addComment() commentDTO: " + commentDTO);
        evidenceBO.addComment(commentDTO);
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PostMapping(value = "/deleteComment")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteComment(@RequestBody EvidenceCommentDTO commentDTO) throws ValidationException, UnauthorizedException {
        log.debug("*** deleteComment() commentDTO: " + commentDTO);
        evidenceBO.deleteComment(commentDTO);
    }

}
