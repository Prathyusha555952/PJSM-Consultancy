package com.pjsm.pjsmbackend.repository;

import com.pjsm.pjsmbackend.entity.CounsellingLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounsellingLeadRepository extends JpaRepository<CounsellingLead, Long> {
}
