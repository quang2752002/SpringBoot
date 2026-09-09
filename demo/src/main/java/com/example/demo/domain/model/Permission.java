package com.example.demo.domain.model;

public enum Permission {
    // USER
    USER_READ(Resource.USER, Action.READ),
    USER_CREATE(Resource.USER, Action.CREATE),
    USER_UPDATE(Resource.USER, Action.UPDATE),
    USER_DELETE(Resource.USER, Action.DELETE),

    // PRODUCT (mở rộng cho các model khác)
    PRODUCT_READ(Resource.PRODUCT, Action.READ),
    PRODUCT_CREATE(Resource.PRODUCT, Action.CREATE),
    PRODUCT_UPDATE(Resource.PRODUCT, Action.UPDATE),
    PRODUCT_DELETE(Resource.PRODUCT, Action.DELETE),

    // ORDER
    ORDER_READ(Resource.ORDER, Action.READ),
    ORDER_CREATE(Resource.ORDER, Action.CREATE),
    ORDER_UPDATE(Resource.ORDER, Action.UPDATE),
    ORDER_DELETE(Resource.ORDER, Action.DELETE);

    public enum Resource {
        USER, PRODUCT, ORDER
    }

    public enum Action {
        READ, CREATE, UPDATE, DELETE
    }

    private final Resource resource;
    private final Action action;
    private final String value;

    Permission(Resource resource, Action action) {
        this.resource = resource;
        this.action = action;
        this.value = resource.name().toLowerCase() + ":" + action.name().toLowerCase();
    }

    public String getValue() {
        return value;
    }

    public Resource getResource() {
        return resource;
    }

    public Action getAction() {
        return action;
    }
}
