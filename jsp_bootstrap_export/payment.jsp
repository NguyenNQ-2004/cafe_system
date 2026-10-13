<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5" style="max-width: 760px;">
    <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white text-center">
        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-2 align-self-center">
            Screen 9 • UC15, UC57 (Payment Screen)
        </span>
        <h3 class="fw-bold mb-1">Cổng Thanh Toán Đơn Hàng</h3>
        <p class="text-muted small mb-4">Đơn hàng #AUR-89241 • Vui lòng hoàn tất thanh toán để Barista tiến hành pha chế</p>

        <!-- QR Code Canvas -->
        <div class="bg-light p-4 rounded-4 border d-inline-block mx-auto mb-4" style="max-width: 320px;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=AURA_CAFE_PAYMENT_189000_AUR89241" 
                 class="img-fluid rounded-3 shadow-sm mb-3" alt="VietQR Payment">
            <h5 class="fw-bold text-danger font-monospace mb-1">189.000₫</h5>
            <small class="text-muted d-block font-monospace">Nội dung: AUR89241</small>
            <span class="badge bg-success bg-opacity-10 text-success border border-success mt-2">
                <i class="bi bi-shield-check"></i> VietQR Tự Động Khớp Lệnh
            </span>
        </div>

        <!-- Payment Method Selection -->
        <div class="row g-2 mb-4 text-start">
            <div class="col-md-4">
                <div class="p-3 border rounded-3 bg-light border-warning text-center">
                    <i class="bi bi-qr-code-scan fs-3 text-warning"></i>
                    <h6 class="fw-bold mb-0 mt-1 small">VietQR / MoMo</h6>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3 border rounded-3 text-center">
                    <i class="bi bi-credit-card fs-3 text-muted"></i>
                    <h6 class="fw-bold mb-0 mt-1 small">Thẻ Visa/Mastercard</h6>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3 border rounded-3 text-center">
                    <i class="bi bi-cash-stack fs-3 text-muted"></i>
                    <h6 class="fw-bold mb-0 mt-1 small">Tiền Mặt Khi Nhận</h6>
                </div>
            </div>
        </div>

        <!-- Action Confirmation -->
        <form action="${pageContext.request.contextPath}/bill" method="GET">
            <input type="hidden" name="orderId" value="AUR-89241">
            <button type="submit" class="btn btn-coffee btn-lg w-100 rounded-pill fw-bold shadow-sm py-3">
                <i class="bi bi-check2-circle"></i> Tôi Đã Thanh Toán Thành Công (Xem Hóa Đơn Screen 10)
            </button>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
