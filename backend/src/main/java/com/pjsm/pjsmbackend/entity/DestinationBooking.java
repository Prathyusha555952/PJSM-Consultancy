package com.pjsm.pjsmbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "destination_bookings")
public class DestinationBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String course;
    private String intake;
    private String country;
    private String university;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    private void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String value) { name = value; }

    public String getEmail() { return email; }
    public void setEmail(String value) { email = value; }

    public String getPhone() { return phone; }
    public void setPhone(String value) { phone = value; }

    public String getCourse() { return course; }
    public void setCourse(String value) { course = value; }

    public String getIntake() { return intake; }
    public void setIntake(String value) { intake = value; }

    public String getCountry() { return country; }
    public void setCountry(String value) { country = value; }

    public String getUniversity() { return university; }
    public void setUniversity(String value) { university = value; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime value) { createdAt = value; }
}