package com.pjsm.pjsmbackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CounsellingRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name is too long")
        String name,

        @NotBlank(message = "Phone is required")
        @Size(min = 8, max = 20, message = "Enter a valid phone number")
        String phone,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        @Size(max = 150, message = "Email is too long")
        String email,

        @NotBlank(message = "Qualification is required")
        @Size(max = 100)
        String qualification,

        @NotBlank(message = "Enquiry type is required")
        @Pattern(regexp = "career|visa", message = "Enquiry type must be career or visa")
        String enquiryType,

        @NotBlank(message = "Service is required")
        @Size(max = 50)
        String serviceId,

        @NotBlank(message = "Service title is required")
        @Size(max = 150)
        String serviceTitle
) {
}
