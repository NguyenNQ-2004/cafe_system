<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5">
    <h2 class="fw-bold mb-4">Giỏ Hàng Của Bạn</h2>

    <c:choose>
        <c:when test="${empty cartItems}">
            <div class="card p-5 text-center border-0 shadow-sm rounded-4">
                <i class="bi bi-bag-x text-muted display-1"></i>
                <h4 class="mt-3">Giỏ hàng đang trống</h4>
                <p class="text-muted">Hãy chọn những món cà phê thơm ngon vào giỏ hàng nhé!</p>
                <a href="${pageContext.request.contextPath}/menu" class="btn btn-coffee rounded-pill px-4 mx-auto">Xem Thực Đơn</a>
            </div>
        </c:when>
        <c:otherwise>
            <div class="row g-4">
                <!-- Cart Items Table -->
                <div class="col-lg-8">
                    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-4">Món uống</th>
                                        <th class="text-center">Đơn giá</th>
                                        <th class="text-center">Số lượng</th>
                                        <th class="text-end pe-4">Thành tiền</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach items="${cartItems}" var="item">
                                        <tr>
                                            <td class="ps-4">
                                                <div class="d-flex align-items-center gap-3">
                                                    <img src="${item.product.imageUrl}" class="rounded-3 object-fit-cover" width="60" height="60" alt="">
                                                    <div>
                                                        <h6 class="mb-0 fw-bold">${item.product.productName}</h6>
                                                        <small class="text-muted">${item.sizeName} • ${item.sugarLevel} • ${item.iceLevel}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center fw-semibold">
                                                <fmt:formatNumber value="${item.unitPrice}" pattern="#,###"/>₫
                                            </td>
                                            <td class="text-center">
                                                <div class="input-group input-group-sm w-auto justify-content-center">
                                                    <a href="${pageContext.request.contextPath}/cart?action=decrease&id=${item.itemId}" class="btn btn-outline-secondary">-</a>
                                                    <span class="input-group-text bg-white px-3 fw-bold">${item.quantity}</span>
                                                    <a href="${pageContext.request.contextPath}/cart?action=increase&id=${item.itemId}" class="btn btn-outline-secondary">+</a>
                                                </div>
                                            </td>
                                            <td class="text-end pe-4 fw-bold text-coffee">
                                                <fmt:formatNumber value="${item.lineTotal}" pattern="#,###"/>₫
                                            </td>
                                            <td>
                                                <a href="${pageContext.request.contextPath}/cart?action=remove&id=${item.itemId}" class="btn btn-link text-danger p-0" title="Xóa">
                                                    <i class="bi bi-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Order Summary & Phone Loyalty Box -->
                <div class="col-lg-4">
                    <!-- Phone Loyalty Card -->
                    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-light">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="bi bi-phone text-success fs-5"></i>
                            <h6 class="fw-bold mb-0">Tích Điểm Theo Số Điện Thoại</h6>
                        </div>
                        <p class="small text-muted mb-3">Nhập số điện thoại để tích điểm hoặc dùng điểm giảm giá trực tiếp.</p>
                        
                        <form action="${pageContext.request.contextPath}/cart" method="POST" class="input-group mb-2">
                            <input type="hidden" name="action" value="applyPhoneLoyalty">
                            <input type="text" name="customerPhone" value="${sessionScope.loyaltyPhone}" class="form-control" placeholder="Nhập SĐT khách hàng...">
                            <button class="btn btn-dark" type="submit">Kiểm tra</button>
                        </form>

                        <c:if test="${not empty sessionScope.loyaltyPoints}">
                            <div class="alert alert-success py-2 px-3 small mt-2 mb-0 d-flex justify-content-between align-items-center">
                                <span>Khách: <strong>${sessionScope.loyaltyCustomerName}</strong></span>
                                <span class="badge bg-success">${sessionScope.loyaltyPoints} điểm</span>
                            </div>
                        </c:if>
                    </div>

                    <!-- Payment Summary Card -->
                    <div class="card border-0 shadow-sm rounded-4 p-4">
                        <h5 class="fw-bold mb-3">Chi Tiết Đơn Hàng</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Tạm tính:</span>
                            <span class="fw-semibold"><fmt:formatNumber value="${cartSubtotal}" pattern="#,###"/>₫</span>
                        </div>
                        <c:if test="${discountAmount > 0}">
                            <div class="d-flex justify-content-between mb-2 text-success">
                                <span>Giảm trừ điểm SĐT:</span>
                                <span>-<fmt:formatNumber value="${discountAmount}" pattern="#,###"/>₫</span>
                            </div>
                        </c:if>
                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="fw-bold fs-5">Tổng thanh toán:</span>
                            <span class="fw-bolder fs-5 text-coffee"><fmt:formatNumber value="${finalTotal}" pattern="#,###"/>₫</span>
                        </div>
                        <a href="${pageContext.request.contextPath}/checkout" class="btn btn-coffee w-100 py-3 rounded-pill fw-bold fs-6 shadow-sm">
                            Tiến Hành Đặt Hàng <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </c:otherwise>
    </c:choose>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
