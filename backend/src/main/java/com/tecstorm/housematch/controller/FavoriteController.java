package com.tecstorm.housematch.controller;

import com.tecstorm.housematch.dto.BedroomDetailResponse;
import com.tecstorm.housematch.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
