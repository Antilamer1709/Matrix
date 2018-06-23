package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
import com.innovationPassport.matrix.service.EvidenceBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/evidence")
public class EvidenceCotroller {

    @Autowired
    private EvidenceBO evidenceBO;


    @PostMapping(value = "/search")
    public ResponseDTO<List<EvidenceDTO>> registration(@RequestBody SearchDTO<EvidenceDTO> searchDTO) {
        return evidenceBO.search(searchDTO);
    }
}
