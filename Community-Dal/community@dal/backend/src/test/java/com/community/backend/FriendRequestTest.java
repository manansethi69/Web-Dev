package com.community.backend;

import com.community.backend.model.FriendRequest;
import com.community.backend.model.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class FriendRequestTest {

    @Test
    public void testGettersAndSetters() {
        FriendRequest friendRequest = new FriendRequest();
        User sender = new User();
        User receiver = new User();

        friendRequest.setId(1L);
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus(true);

        assertEquals(1L, friendRequest.getId());
        assertEquals(sender, friendRequest.getSender());
        assertEquals(receiver, friendRequest.getReceiver());
        assertTrue(friendRequest.isStatus());
    }
}
