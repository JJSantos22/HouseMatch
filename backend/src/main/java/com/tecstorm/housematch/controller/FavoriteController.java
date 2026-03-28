package com.tecstorm.housematch.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecstorm.housematch.dto.Bedroom.BedroomDetailResponse;
import com.tecstorm.housematch.service.FavoriteService;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<List<BedroomDetailResponse>> getFavorites(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(favoriteService.getFavorites(userId));
    }

    @PostMapping("/{bedroomId}")
    public ResponseEntity<Void> addFavorite(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID bedroomId) {
        favoriteService.addFavorite(userId, bedroomId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{bedroomId}")
    public ResponseEntity<Void> removeFavorite(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID bedroomId) {
        favoriteService.removeFavorite(userId, bedroomId);
        return ResponseEntity.noContent().build();
    }
}
