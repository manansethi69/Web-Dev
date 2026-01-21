package com.community.backend;

import com.community.backend.model.AddFriendRequestBody;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AddFriendRequestBodyTest {

    @Test
    public void testGettersAndSetters() {
        AddFriendRequestBody requestBody = new AddFriendRequestBody();
        requestBody.setSenderId(1L);
        requestBody.setReceiverId(2L);

        assertEquals(1L, requestBody.getSenderId());
        assertEquals(2L, requestBody.getReceiverId());
    }
}

