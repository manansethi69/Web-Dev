package com.community.backend;

import com.community.backend.model.Post;
import com.community.backend.model.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDateTime;

public class PostTest {

    @Test
    public void testGettersAndSetters() {
        Post post = new Post();
        User user = new User();

        post.setId(1L);
        post.setTitle("Post Title");
        post.setMediaUrl("http://example.com/media");
        post.setContent("This is a post");
        post.setUser(user);
        LocalDateTime now = LocalDateTime.now();
        post.setCreatedDate(now);

        assertEquals(1L, post.getId());
        assertEquals("Post Title", post.getTitle());
        assertEquals("http://example.com/media", post.getMediaUrl());
        assertEquals("This is a post", post.getContent());
        assertEquals(user, post.getUser());
        assertEquals(now, post.getCreatedDate());
    }
}
