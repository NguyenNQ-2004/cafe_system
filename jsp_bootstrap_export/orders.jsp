<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5" style="max-width: 900px;">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <span class="badge bg-warning text-dark mb-1">Screen 11 • UC16, UC17, UC18, UC58 (Order Management Screen)</span>
            <h3 class="fw-bold mb-0">Đơn Hàng Của Tôi</h3>
        </div>
        <a href="${pageContext.request.contextPath}/menu" class="btn btn-coffee btn-sm rounded-pill px-3">+ Đặt thêm món</a>
    </div>

    <!-- Active Order Card -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border-start border-4 border-warning">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <span class="badge bg-warning text-dark font-monospace">#AUR-89241</span>
                <span class="text-muted small ms-2">Hôm nay, 09:45</span>
            </div>
            <span class="badge bg-primary px-3 py-2 rounded-pill">
                <i class="bi bi-clock-history"></i> Barista đang pha chế
            </span>
        </div>

        <p class="mb-2 fw-semibold">2x Cà phê Muối Aura, 1x Trà Sen Vàng Hạt Sen, 1x Croissant Bơ Tỏi</p>
        <p class="text-muted small mb-3"><i class="bi bi-geo-alt"></i> Giao đến: 28 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</p>

        <div class="d-flex justify-content-between align-items-center pt-3 border-top">
            <span class="fw-bold fs-5 text-coffee">189.000₫</span>
            <div class="d-flex gap-2">
                <a href="${pageContext.request.contextPath}/bill?orderId=AUR-89241" class="btn btn-outline-dark btn-sm rounded-pill">
                    <i class="bi bi-receipt"></i> Xem Hóa Đơn (Screen 10)
                </a>
                <button type="button" class="btn btn-outline-danger btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#cancelModal">
                    Hủy Đơn Hàng (UC16)
                </button>
            </div>
        </div>
    </div>

    <!-- Past Orders List -->
    <h5 class="fw-bold mt-5 mb-3 text-muted">Lịch Sử Đơn Hoàn Tất</h5>
    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <span class="badge bg-light text-dark font-monospace border">#AUR-88210</span>
                <span class="text-muted small ms-2">12/10/2026 14:15</span>
                <p class="mb-0 fw-semibold mt-1">1x Bạc Xỉu Cốt Dừa, 1x Matcha Đá Xay</p>
            </div>
            <div class="text-end">
                <span class="badge bg-success mb-1">Đã giao thành công</span>
                <p class="mb-0 fw-bold font-monospace">104.000₫</p>
            </div>
        </div>
    </div>
</div>

<!-- Modal Hủy đơn hàng (UC16) -->
<div class="modal fade" id="cancelModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow">
            <div class="modal-header">
                <h5 class="modal-title fw-bold">Xác Nhận Hủy Đơn Hàng</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form action="${pageContext.request.contextPath}/orders" method="POST">
                <input type="hidden" name="action" value="cancelOrder">
                <input type="hidden" name="orderId" value="AUR-89241">
                <div class="modal-body">
                    <p class="small text-muted mb-2">Vui lòng chọn lý do bạn muốn hủy đơn hàng này:</p>
                    <select name="reason" class="form-select mb-3">
                        <option value="Đặt nhầm món / nhầm địa chỉ">Đặt nhầm món / nhầm địa chỉ</option>
                        <option value="Thời gian giao quá lâu">Thời gian giao quá lâu</option>
                        <option value="Muốn đổi sang phương thức thanh toán khác">Muốn đổi sang phương thức thanh toán khác</option>
                        <option value="Thay đổi kế hoạch cá nhân">Thay đổi kế hoạch cá nhân</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-danger rounded-pill fw-bold">Đồng Ý Hủy Đơn</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
