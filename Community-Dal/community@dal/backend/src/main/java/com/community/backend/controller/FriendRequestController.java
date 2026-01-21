package com.community.backend.controller;
import com.community.backend.model.AddFriendRequestBody;
import com.community.backend.model.FriendRequest;
import com.community.backend.model.User;
import com.community.backend.service.FriendRequestService;
import com.community.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/friend-requests")
public class FriendRequestController {

    @Autowired
    private FriendRequestService friendRequestService;
    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public ResponseEntity<FriendRequest> sendFriendRequest(@RequestBody AddFriendRequestBody request) {
        Optional<User> sender = userService.findById(request.getSenderId());
        Optional<User> receiver = userService.findById(request.getReceiverId());

        if (sender.isPresent() && receiver.isPresent()) {
            FriendRequest friendRequest = friendRequestService.sendFriendRequest(sender.get(), receiver.get());
            return ResponseEntity.ok(friendRequest);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/pending/{userId}")
    public ResponseEntity<List<FriendRequest>> getPendingFriendRequests(@PathVariable Long userId) {
        Optional<User> receiver = userService.findById(userId);

        if (receiver.isPresent()) {
            List<FriendRequest> friendRequests = friendRequestService.getFriendRequests(receiver.get());
            return ResponseEntity.ok(friendRequests);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/accept/{requestId}")
    public ResponseEntity<FriendRequest> acceptFriendRequest(@PathVariable Long requestId) {
        Optional<FriendRequest> friendRequest = friendRequestService.findById(requestId);

        if (friendRequest.isPresent()) {
            FriendRequest acceptedRequest = friendRequestService.acceptFriendRequest(friendRequest.get());
            return ResponseEntity.ok(acceptedRequest);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/reject/{requestId}")
    public ResponseEntity<FriendRequest> rejectFriendRequest(@PathVariable Long requestId) {
        Optional<FriendRequest> friendRequest = friendRequestService.findById(requestId);

        if (friendRequest.isPresent()) {
            friendRequestService.rejectFriendRequest(friendRequest.get());
            return ResponseEntity.ok(friendRequest.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/friends/{userId}")
    public ResponseEntity<List<User>> getFriends(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);
        if (user.isPresent()) {
            List<User> friends = friendRequestService.getFriends(user.get());
            return ResponseEntity.ok(friends);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/unfriend/{userId}/{friendId}")
    public ResponseEntity<Void> unfriend(@PathVariable Long userId, @PathVariable Long friendId) {
        Optional<User> user = userService.findById(userId);
        Optional<User> friend = userService.findById(friendId);

        if (user.isPresent() && friend.isPresent()) {
            friendRequestService.unfriend(user.get(), friend.get());
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }


}
