<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aura POS - Thu Ngân Tại Quầy</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background-color: #f5f5f4; font-family: system-ui, -apple-system, sans-serif; }
        .pos-header { background: #1c1917; color: white; }
        .product-card { cursor: pointer; transition: 0.15s; border-radius: 12px; }
        .product-card:hover { transform: scale(1.02); border-color: #78350f !important; }
        .pos-cart { height: calc(100vh - 75px); overflow-y: auto; background: white; }
    </style>
</head>
<body>

<!-- Header POS -->
<nav class="navbar navbar-dark pos-header px-4 py-2">
    <div class="d-flex align-items-center gap-3">
        <span class="navbar-brand fw-bold text-warning mb-0 fs-5"><i class="bi bi-cup-hot-fill"></i> AURA POS</span>
        <span class="badge bg-secondary">Trạm POS 02</span>
        <span class="text-white-50 small">Thu ngân: <strong>${sessionScope.user.fullName}</strong></span>
    </div>
    <div class="d-flex align-items-center gap-2">
        <a href="${pageContext.request.contextPath}/pos/orders" class="btn btn-sm btn-outline-light">Đơn Tại Quầy</a>
        <a href="${pageContext.request.contextPath}/pos/handover" class="btn btn-sm btn-warning fw-bold">Bàn Giao Ca (Screen 27)</a>
        <a href="${pageContext.request.contextPath}/home" class="btn btn-sm btn-outline-secondary">Thoát</a>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <!-- CỘT TRÁI: DANH MỤC & SẢN PHẨM (8 cols) -->
        <div class="col-lg-8 p-3" style="height: calc(100vh - 75px); overflow-y: auto;">
            <!-- Category Tabs -->
            <div class="d-flex gap-2 overflow-auto pb-2 mb-3">
                <button class="btn btn-dark btn-sm rounded-pill px-3">Tất cả</button>
                <c:forEach items="${categories}" var="c">
                    <button class="btn btn-outline-dark btn-sm rounded-pill px-3">${c.categoryName}</button>
                </c:forEach>
            </div>

            <!-- Product Grid -->
            <div class="row g-3">
                <c:forEach items="${products}" var="p">
                    <div class="col-4 col-md-3">
                        <form action="${pageContext.request.contextPath}/pos/order" method="POST">
                            <input type="hidden" name="action" value="addItem">
                            <input type="hidden" name="productId" value="${p.productId}">
                            <div class="card h-100 product-card border shadow-sm p-2 text-center" onclick="this.closest('form').submit()">
                                <img src="${p.imageUrl}" class="w-100 rounded-3 mb-2 object-fit-cover" style="height: 100px;" alt="">
                                <h6 class="fw-bold mb-1 text-truncate" style="font-size: 0.85rem;">${p.productName}</h6>
                                <span class="fw-bold text-success font-monospace" style="font-size: 0.85rem;">
                                    <fmt:formatNumber value="${p.basePrice}" pattern="#,###"/>₫
                                </span>
                            </div>
                        </form>
                    </div>
                </c:forEach>
            </div>
        </div>

        <!-- CỘT PHẢI: GIỎ HÀNG THU NGÂN & THANH TOÁN (4 cols) -->
        <div class="col-lg-4 pos-cart p-3 border-start shadow-sm d-flex flex-column justify-content-between">
            <div>
                <!-- Phone Loyalty Bar -->
                <div class="bg-light p-2 rounded-3 border mb-3">
                    <small class="fw-bold text-muted d-block mb-1">Khách hàng (Tích điểm qua SĐT):</small>
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control font-monospace" placeholder="Nhập SĐT khách (09xxx)..." value="${posPhone}">
                        <button class="btn btn-secondary" type="button">Tìm</button>
                    </div>
                </div>

                <!-- Order Items -->
                <h6 class="fw-bold mb-2">Hóa đơn hiện tại (#ORD-NEW)</h6>
                <div class="list-group list-group-flush mb-3">
                    <c:forEach items="${posCartItems}" var="item">
                        <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                            <div>
                                <h6 class="mb-0 fw-bold fs-6">${item.productName}</h6>
                                <small class="text-muted">${item.quantity} x <fmt:formatNumber value="${item.unitPrice}" pattern="#,###"/>₫</small>
                            </div>
                            <span class="fw-bold font-monospace"><fmt:formatNumber value="${item.lineTotal}" pattern="#,###"/>₫</span>
                        </div>
                    </c:forEach>
                </div>
            </div>

            <!-- Total & Checkout Buttons -->
            <div class="pt-3 border-top">
                <div class="d-flex justify-content-between fs-5 fw-bold mb-3">
                    <span>Tổng tiền:</span>
                    <span class="text-danger font-monospace"><fmt:formatNumber value="${posTotal}" pattern="#,###"/>₫</span>
                </div>
                <div class="row g-2">
                    <div class="col-6">
                        <button class="btn btn-outline-danger w-100 py-2 fw-bold">Hủy Hóa Đơn</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-success w-100 py-2 fw-bold"><i class="bi bi-printer"></i> Thanh Toán (F9)</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
