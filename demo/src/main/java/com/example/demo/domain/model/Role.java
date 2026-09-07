package com.example.demo.domain.model;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Set;

import static com.example.demo.domain.model.Permission.*;

public enum Role {
    ROLE_ADMIN(EnumSet.allOf(Permission.class)),
    ROLE_MANAGER(EnumSet.of(USER_READ, USER_CREATE, USER_UPDATE, PRODUCT_READ, PRODUCT_CREATE, PRODUCT_UPDATE)),
    ROLE_USER(EnumSet.of(USER_READ, PRODUCT_READ));

    private final Set<Permission> defaultPermissions;

    Role(Set<Permission> defaultPermissions) {
        this.defaultPermissions = Collections.unmodifiableSet(defaultPermissions);
    }

    public Set<Permission> getDefaultPermissions() {
        return defaultPermissions;
    }
}
