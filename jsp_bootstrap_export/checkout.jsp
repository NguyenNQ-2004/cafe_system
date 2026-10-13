<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5" style="max-width: 900px;">
    <!-- Title Ribbon -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <span class="badge bg-warning text-dark mb-1">Screen 7 • UC11, UC12 (Online Ordering Screen)</span>
            <h3 class="fw-bold mb-0">Đặt Hàng Giao Tận Nơi</h3>
        </div>
        <a href="${pageContext.request.contextPath}/cart" class="btn btn-outline-secondary btn-sm">← Quay lại giỏ hàng</a>
    </div>

    <form action="${pageContext.request.contextPath}/payment" method="POST">
        <div class="row g-4">
            <!-- Left: Delivery Information Form -->
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <h5 class="fw-bold mb-3"><i class="bi bi-geo-alt text-danger"></i> Thông Tin Giao Hàng</h5>
                    
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Người nhận hàng</label>
                        <input type="text" name="recipientName" class="form-control" value="${sessionScope.user.fullName}" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold">Số điện thoại nhận hàng</label>
                        <input type="tel" name="recipientPhone" class="form-control font-monospace" value="${sessionScope.user.phone}" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold">Địa chỉ nhận hàng chi tiết</label>
                        <textarea name="deliveryAddress" rows="2" class="form-control" required placeholder="Số nhà, tên đường, phường/xã, quận/huyện...">Phòng 402, Tòa nhà Techcombank, 28 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold">Ghi chú cho tài xế Aura</label>
                        <input type="text" name="deliveryNote" class="form-control" placeholder="Gửi bảo vệ sảnh hoặc gọi trước khi đến...">
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="vat" name="requestVat">
                        <label class="form-check-label small" for="vat">Yêu cầu xuất hóa đơn điện tử VAT doanh nghiệp (8%)</label>
                    </div>
                </div>
            </div>

            <!-- Right: Order Summary & Confirm -->
            <div class="col-lg-5">
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style="top: 90px;">
                    <h5 class="fw-bold mb-3">Tóm Tắt Đơn Hàng</h5>
                    
                    <div class="d-flex justify-content-between small mb-2">
                        <span class="text-muted">Tiền món:</span>
                        <span class="fw-semibold"><fmt:formatNumber value="${cartSubtotal != null ? cartSubtotal : 194000}" pattern="#,###"/>₫</span>
                    </div>

                    <div class="d-flex justify-content-between small mb-2">
                        <span class="text-muted">Phí giao hàng (3km):</span>
                        <span class="fw-semibold">15,000₫</span>
                    </div>

                    <div class="d-flex justify-content-between small mb-2 text-success">
                        <span>Khấu trừ điểm SĐT:</span>
                        <span class="fw-semibold">-20,000₫</span>
                    </div>

                    <hr>

                    <div class="d-flex justify-content-between mb-4">
                        <span class="fw-bold fs-5">Tổng thanh toán:</span>
                        <span class="fw-bolder fs-5 text-danger font-monospace">
                            <fmt:formatNumber value="${finalTotal != null ? finalTotal : 189000}" pattern="#,###"/>₫
                        </span>
                    </div>

                    <button type="submit" class="btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm">
                        Chuyển Đến Thanh Toán (Screen 9) <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
