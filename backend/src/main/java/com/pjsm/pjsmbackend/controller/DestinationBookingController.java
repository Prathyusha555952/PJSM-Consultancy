package com.pjsm.pjsmbackend.controller;

import com.pjsm.pjsmbackend.entity.DestinationBooking;
import com.pjsm.pjsmbackend.repository.DestinationBookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/destination-bookings")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class DestinationBookingController {

    private final DestinationBookingRepository repository;

    public DestinationBookingController(DestinationBookingRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody DestinationBooking b) {
        if (isBlank(b.getName()) || isBlank(b.getEmail()) || isBlank(b.getPhone())
                || isBlank(b.getCourse()) || isBlank(b.getIntake())
                || isBlank(b.getCountry()) || isBlank(b.getUniversity())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please fill in all fields."));
        }
        repository.save(b);
        return ResponseEntity.ok(Map.of("success", true));
    }

    private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
}
