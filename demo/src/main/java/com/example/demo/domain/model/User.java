package com.example.demo.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collections;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

/**
 * Domain Entity thuần Java - tối ưu với Lombok.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Role role;

    @Builder.Default
    private Set<Permission> directPermissions = new HashSet<>();

    public User(Long id, String username, String password, String email, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.directPermissions = new HashSet<>();
    }

    public void setDirectPermissions(Set<Permission> directPermissions) {
        this.directPermissions = directPermissions != null ? directPermissions : new HashSet<>();
    }

    // Gán thêm quyền riêng cho người này
    public void grantPermission(Permission permission) {
        this.directPermissions.add(permission);
    }

    // Thu hồi quyền riêng của người này
    public void revokePermission(Permission permission) {
        this.directPermissions.remove(permission);
    }

    /**
     * Tổng hợp toàn bộ quyền: Quyền từ Role + Quyền riêng được gán thêm
     */
    public Set<Permission> getAllPermissions() {
        Set<Permission> all = EnumSet.noneOf(Permission.class);
        if (this.role != null && this.role.getDefaultPermissions() != null) {
            all.addAll(this.role.getDefaultPermissions());
        }
        if (this.directPermissions != null) {
            all.addAll(this.directPermissions);
        }
        return Collections.unmodifiableSet(all);
    }
}
