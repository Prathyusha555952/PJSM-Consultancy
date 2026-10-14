package com.pjsm.pjsmbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "destination_bookings")
public class DestinationBooking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String course;
    private String intake;
    private String country;
    private String university;

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String v) { this.name = v; }
    public String getEmail() { return email; }
    public void setEmail(String v) { this.email = v; }
    public String getPhone() { return phone; }
    public void setPhone(String v) { this.phone = v; }
    public String getCourse() { return course; }
    public void setCourse(String v) { this.course = v; }
    public String getIntake() { return intake; }
    public void setIntake(String v) { this.intake = v; }
    public String getCountry() { return country; }
    public void setCountry(String v) { this.country = v; }
    public String getUniversity() { return university; }
    public void setUniversity(String v) { this.university = v; }
}