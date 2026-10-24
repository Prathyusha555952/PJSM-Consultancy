package com.pjsm.pjsmbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SiteVisit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64)
    private String visitorId;

    @Column(length = 120)
    private String page;

    @Column(nullable = false)
    private LocalDateTime visitedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public String getVisitorId() { return visitorId; }
    public void setVisitorId(String visitorId) { this.visitorId = visitorId; }
    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }
    public LocalDateTime getVisitedAt() { return visitedAt; }
    public void setVisitedAt(LocalDateTime visitedAt) { this.visitedAt = visitedAt; }
}
