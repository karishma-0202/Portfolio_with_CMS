package com.lmx.portfolio_backend.dto;

public class PublicFeedbackResponse {

    private Long id;
    private String name;
    private String message;
    private Integer rating;

    public PublicFeedbackResponse() {}

    public PublicFeedbackResponse(
            Long id,
            String name,
            String message,
            Integer rating) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }

    public Integer getRating() {
        return rating;
    }
}