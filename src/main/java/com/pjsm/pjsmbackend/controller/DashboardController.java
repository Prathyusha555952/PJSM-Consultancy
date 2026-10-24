package com.pjsm.pjsmbackend.controller;

import com.pjsm.pjsmbackend.dto.DashboardResponse;
import com.pjsm.pjsmbackend.dto.DashboardResponse.CountryCount;
import com.pjsm.pjsmbackend.dto.DashboardResponse.DayCount;
import com.pjsm.pjsmbackend.dto.DashboardResponse.RecentSelection;
import com.pjsm.pjsmbackend.entity.DestinationBooking;
import com.pjsm.pjsmbackend.repository.CounsellingLeadRepository;
import com.pjsm.pjsmbackend.repository.DestinationBookingRepository;
import com.pjsm.pjsmbackend.repository.SiteVisitRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final SiteVisitRepository visits;
    private final CounsellingLeadRepository leads;
    private final DestinationBookingRepository bookings;

    public DashboardController(
            SiteVisitRepository visits,
            CounsellingLeadRepository leads,
            DestinationBookingRepository bookings) {
        this.visits = visits;
        this.leads = leads;
        this.bookings = bookings;
    }

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        LocalDate today = LocalDate.now();

        long visitsToday = visits.countByVisitedAtGreaterThanEqualAndVisitedAtLessThan(
                today.atStartOfDay(),
                today.plusDays(1).atStartOfDay()
        );

        List<DayCount> last7Days = new ArrayList<>();

        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);

            long count = visits.countByVisitedAtGreaterThanEqualAndVisitedAtLessThan(
                    day.atStartOfDay(),
                    day.plusDays(1).atStartOfDay()
            );

            last7Days.add(new DayCount(day.toString(), count));
        }

        List<CountryCount> destinations = new ArrayList<>();

        for (Object[] row : bookings.countByCountry()) {
            destinations.add(
                    new CountryCount(
                            String.valueOf(row[0]),
                            ((Number) row[1]).longValue()
                    )
            );
        }

        DateTimeFormatter dateFormat =
                DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

        List<RecentSelection> recent = bookings
                .findTop20ByOrderByCreatedAtDesc()
                .stream()
                .map(booking -> new RecentSelection(
                        booking.getName(),
                        booking.getPhone(),
                        booking.getCountry(),
                        booking.getCreatedAt() == null
                                ? "—"
                                : booking.getCreatedAt().format(dateFormat)
                ))
                .toList();

        return new DashboardResponse(
                visits.count(),
                visits.countUniqueVisitors(),
                visitsToday,
                leads.count(),
                last7Days,
                destinations,
                recent
        );
    }
}