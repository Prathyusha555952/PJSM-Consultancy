package com.pjsm.pjsmbackend.controller;

import com.pjsm.pjsmbackend.dto.CounsellingRequest;
import com.pjsm.pjsmbackend.entity.CounsellingLead;
import com.pjsm.pjsmbackend.repository.CounsellingLeadRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/counselling")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class CounsellingController {

    private final CounsellingLeadRepository repository;

    public CounsellingController(CounsellingLeadRepository repository) {
        this.repository = repository;
    }

    // Save a counselling request from the contact form
    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody CounsellingRequest request) {

        CounsellingLead lead = new CounsellingLead();
        lead.setName(request.name().trim());
        lead.setPhone(request.phone().trim());
        lead.setEmail(request.email().trim());
        lead.setQualification(request.qualification().trim());
        lead.setEnquiryType(request.enquiryType());
        lead.setServiceId(request.serviceId());
        lead.setServiceTitle(request.serviceTitle());

        CounsellingLead saved = repository.save(lead);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Request submitted successfully");
        response.put("id", saved.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // View all requests, newest first
    @GetMapping
    public List<CounsellingLead> getAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // Readable validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}

