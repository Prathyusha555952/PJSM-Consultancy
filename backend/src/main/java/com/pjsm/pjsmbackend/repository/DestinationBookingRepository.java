package com.pjsm.pjsmbackend.repository;

import com.pjsm.pjsmbackend.entity.DestinationBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DestinationBookingRepository
        extends JpaRepository<DestinationBooking, Long> {

    List<DestinationBooking> findTop20ByOrderByCreatedAtDesc();

    @Query("""
        select b.country, count(b)
        from DestinationBooking b
        group by b.country
        order by count(b) desc
    """)
    List<Object[]> countByCountry();
}