package com.pjsm.pjsmbackend.repository;

import com.pjsm.pjsmbackend.entity.DestinationSelection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface DestinationSelectionRepository extends JpaRepository<DestinationSelection, Long> {

    @Query("select d.country, count(d) from DestinationSelection d group by d.country order by count(d) desc")
    List<Object[]> countByCountry();
}