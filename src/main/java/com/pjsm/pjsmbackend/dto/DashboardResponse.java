package com.pjsm.pjsmbackend.dto;

import java.util.List;

public record DashboardResponse(
        long totalVisits,
        long uniqueVisitors,
        long visitsToday,
        long registrations,
        List<DayCount> visitsLast7Days,
        List<CountryCount> destinations,
        List<RecentSelection> recent) {

    public record DayCount(String date, long count) {}

    public record CountryCount(String country, long count) {}

    public record RecentSelection(
            String name,
            String phone,
            String destination,
            String date) {}
}