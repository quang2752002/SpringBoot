package com.example.demo.service;

import com.example.demo.dto.request.PermissionRequest;
import com.example.demo.dto.response.PermissionResponse;
import com.example.demo.entity.Permission;
import com.example.demo.mapper.PermissionMapper;
import com.example.demo.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor// thay auto Autowired
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    PermissionResponse create(PermissionRequest request){
        Permission permission=permissionMapper.toPermission(request);
        permission=permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }
    List<PermissionResponse> getAll(){
        var permissions =permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).collect(Collectors.toList());
    }
    void delete(String  permission){
        permissionRepository.deleteById(permission);
    }
}
