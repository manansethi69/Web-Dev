package com.community.backend.controller;

import com.community.backend.model.Post;
import com.community.backend.model.PostRequest;
import com.community.backend.model.User;
import com.community.backend.service.FriendRequestService;
import com.community.backend.service.PostService;
import com.community.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) {
        Optional<User> user = userService.findById(postRequest.getUserId());

        if (user.isPresent()) {

            Post post = postService.createPost(postRequest.getUserId(), postRequest.getContent(), postRequest.getTitle(), postRequest.getMediaUrl());
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.badRequest().build();

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPosts(@PathVariable Long userId) {
        List<Post> posts = postService.getUserPosts(userId);
        return ResponseEntity.ok(posts);
    }

    @Autowired
    private UserService userService;

    @Autowired
    private FriendRequestService friendRequestService;


    @GetMapping("/feed/{userId}")
    public ResponseEntity<List<Post>> getFeed(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);

        if (user.isPresent()) {
            List<Post> feed = new ArrayList<>();

            List<User> friends = friendRequestService.getAcceptedFriendRequests(user.get()).stream()
                    .map(friendRequest -> {
                        if (friendRequest.getSender().getId().equals(userId)) {
                            return friendRequest.getReceiver();
                        } else {
                            return friendRequest.getSender();
                        }
                    })
                    .collect(Collectors.toList());

            for (User friend : friends) {
                feed.addAll(postService.getUserPosts(friend.getId()));
            }

            return ResponseEntity.ok(feed);
        }

        return ResponseEntity.notFound().build();
    }

}

