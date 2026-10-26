package com.pjsm.pjsmbackend.controller;

import com.pjsm.pjsmbackend.dto.DestinationRequest;
import com.pjsm.pjsmbackend.dto.VisitRequest;
import com.pjsm.pjsmbackend.entity.DestinationSelection;
import com.pjsm.pjsmbackend.entity.SiteVisit;
import com.pjsm.pjsmbackend.repository.DestinationSelectionRepository;
import com.pjsm.pjsmbackend.repository.SiteVisitRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/track")
public class TrackingController {

    private final SiteVisitRepository visits;
    private final DestinationSelectionRepository selections;

    public TrackingController(SiteVisitRepository visits, DestinationSelectionRepository selections) {
        this.visits = visits;
        this.selections = selections;
    }

    @PostMapping("/visit")
    public Map<String, Boolean> visit(@RequestBody VisitRequest req) {
        if (req.visitorId() == null || req.visitorId().isBlank()) {
            return Map.of("ok", false);
        }
        SiteVisit v = new SiteVisit();
        v.setVisitorId(cut(req.visitorId().trim(), 64));
        v.setPage(req.page() == null ? "" : cut(req.page().trim(), 120));
        visits.save(v);
        return Map.of("ok", true);
    }

    @PostMapping("/destination")
    public Map<String, Boolean> destination(@RequestBody DestinationRequest req) {
        if (req.country() == null || req.country().isBlank()) {
            return Map.of("ok", false);
        }
        DestinationSelection d = new DestinationSelection();
        d.setCountry(cut(req.country().trim(), 80));
        selections.save(d);
        return Map.of("ok", true);
    }

    private static String cut(String s, int max) {
        return s.length() > max ? s.substring(0, max) : s;
    }
}