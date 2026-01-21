package com.community.backend;

import com.community.backend.model.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testGettersAndSetters() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setSecurityQuestion("question");
        user.setSecurityAnswer("answer");
        user.setUsername("username");
        user.setBio("bio");
        user.setStatus("status");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setRole("admin");
        user.setActivated(true);

        assertEquals(1L, user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("question", user.getSecurityQuestion());
        assertEquals("answer", user.getSecurityAnswer());
        assertEquals("username", user.getUsername());
        assertEquals("bio", user.getBio());
        assertEquals("status", user.getStatus());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("admin", user.getRole());
        assertTrue(user.isActivated());
    }
}
