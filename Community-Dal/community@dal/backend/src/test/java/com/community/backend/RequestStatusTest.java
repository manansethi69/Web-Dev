package com.community.backend;

import com.community.backend.model.RequestStatus;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class RequestStatusTest {

    @Test
    public void testEnumValues() {
        assertEquals(3, RequestStatus.values().length);
        assertEquals(RequestStatus.PENDING, RequestStatus.valueOf("PENDING"));
        assertEquals(RequestStatus.ACCEPTED, RequestStatus.valueOf("ACCEPTED"));
        assertEquals(RequestStatus.REJECTED, RequestStatus.valueOf("REJECTED"));
    }
}
