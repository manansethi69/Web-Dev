package com.community.backend;

import com.community.backend.model.PostRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PostRequestTest {

    @Test
    public void testGettersAndSetters() {
        PostRequest postRequest = new PostRequest();
        postRequest.setUserId(1L);
        postRequest.setContent("This is a post");
        postRequest.setTitle("Post Title");
        postRequest.setMediaUrl("http://example.com/media");

        assertEquals(1L, postRequest.getUserId());
        assertEquals("This is a post", postRequest.getContent());
        assertEquals("Post Title", postRequest.getTitle());
        assertEquals("http://example.com/media", postRequest.getMediaUrl());
    }
}
