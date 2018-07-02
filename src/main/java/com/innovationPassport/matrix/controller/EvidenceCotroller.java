package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
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

}
