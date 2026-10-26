package com.pjsm.pjsmbackend.repository;

import com.pjsm.pjsmbackend.entity.SiteVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;

public interface SiteVisitRepository extends JpaRepository<SiteVisit, Long> {

    long countByVisitedAtGreaterThanEqualAndVisitedAtLessThan(LocalDateTime start, LocalDateTime end);

    @Query("select count(distinct v.visitorId) from SiteVisit v")
    long countUniqueVisitors();
}