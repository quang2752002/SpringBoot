package com.example.demo.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import java.util.Collections;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

/**
 * JPA Entity mapping bảng users
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(length = 150)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Role role;

    @ElementCollection(targetClass = Permission.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_direct_permissions", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "permission", length = 50)
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
        if (this.directPermissions == null) {
            this.directPermissions = new HashSet<>();
        }
        this.directPermissions.add(permission);
    }

    // Thu hồi quyền riêng của người này
    public void revokePermission(Permission permission) {
        if (this.directPermissions != null) {
            this.directPermissions.remove(permission);
        }
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
