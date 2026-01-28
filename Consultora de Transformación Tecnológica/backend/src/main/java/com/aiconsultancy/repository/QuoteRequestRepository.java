package com.aiconsultancy.repository;

import com.aiconsultancy.model.QuoteRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteRequestRepository extends JpaRepository<QuoteRequest, Long> {
    List<QuoteRequest> findByProcessedFalseOrderByCreatedAtDesc();
}
