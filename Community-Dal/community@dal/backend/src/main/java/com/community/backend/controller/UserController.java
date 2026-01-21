package com.community.backend.controller;

import com.community.backend.model.ForgotPassword;
import com.community.backend.model.User;
import com.community.backend.service.FriendRequestService;
import com.community.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FriendRequestService friendRequestService;
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (!user.getEmail().endsWith("@dal.ca")) {
            return ResponseEntity.badRequest().body("Email must end with @dal.ca");
        }

        if (!isValidPassword(user.getPassword())) {
            return ResponseEntity.badRequest().body(
                    "Password must be at least 8 characters, with at least 1 uppercase letter, " +
                            "1 lowercase letter, 1 number, and 1 special character."
            );
        }

        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if(!existingUser.get().isActivated()){
            return ResponseEntity.badRequest().body("User not activated yet!");
        }
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPassword user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());

        if (existingUser.isPresent() && existingUser.get().getSecurityAnswer().equals(user.getSecurityAnswer())) {
            existingUser.get().setPassword(user.getNewPassword());
            userService.registerUser(existingUser.get());
            return ResponseEntity.ok("Password reset successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid security answer");
        }
    }

    private static final int MIN_PASSWORD_LENGTH = 8;

    private boolean isValidPassword(String password) {
        return password.length() >= MIN_PASSWORD_LENGTH &&
                password.chars().anyMatch(Character::isUpperCase) &&
                password.chars().anyMatch(Character::isLowerCase) &&
                password.chars().anyMatch(Character::isDigit) &&
                password.chars().anyMatch(ch -> !Character.isLetterOrDigit(ch));
    }

    @GetMapping("/{id}")
    public Optional<User> findByID(@PathVariable Long id){
        return userService.findById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails){
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/not-activated")
    public ResponseEntity<List<User>> getNotActivatedUsers() {
        List<User> users = userService.findNotActivatedUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get-recommendations/{userId}")
    public ResponseEntity<?> getRecommendations(@PathVariable Long userId) {
        // Fetch current user
        Optional<User> currentUserOptional = userService.findById(userId);

        if (currentUserOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User currentUser = currentUserOptional.get();

        // Fetch all users
        List<User> allUsers = userService.findAll();

        // Fetch current user's friends
        List<User> friends = friendRequestService.getAcceptedFriendRequests(currentUser).stream()
                .map(friendRequest -> {
                    if (friendRequest.getSender().getId().equals(userId)) {
                        return friendRequest.getReceiver();
                    } else {
                        return friendRequest.getSender();
                    }
                })
                .collect(Collectors.toList());

        // Filter out current user and their friends
        List<User> usersNotFriends = allUsers.stream()
                .filter(user -> !friends.contains(user) && !user.equals(currentUser))
                .collect(Collectors.toList());

        return ResponseEntity.ok(usersNotFriends);
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> roleMap) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(roleMap.get("role"));
            userService.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/isAdmin/{id}")
    public ResponseEntity<?> isAdmin(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent() && "admin".equals(userOptional.get().getRole())) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @PutMapping("/activateUser/{id}")
    public ResponseEntity<?> activateUser(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setActivated(true);
            userService.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
