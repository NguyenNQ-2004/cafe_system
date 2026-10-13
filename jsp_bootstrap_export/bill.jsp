<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5" style="max-width: 650px;">
    <!-- Top Action Bar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="badge bg-warning text-dark fw-bold">Screen 10 • UC14 (Bill Screen)</span>
        <div class="d-flex gap-2">
            <button onclick="window.print()" class="btn btn-outline-dark btn-sm"><i class="bi bi-printer"></i> In Hóa Đơn K80</button>
            <a href="${pageContext.request.contextPath}/orders" class="btn btn-coffee btn-sm">Theo dõi đơn (Screen 11)</a>
        </div>
    </div>

    <!-- Printable Electronic Receipt Card -->
    <div class="card border border-2 shadow-sm rounded-4 p-4 p-md-5 bg-white font-monospace">
        <!-- Cafe Brand Header -->
        <div class="text-center pb-3 border-bottom border-dashed">
            <h4 class="fw-bold mb-0">AURA CAFÉ ROASTERY</h4>
            <p class="small text-muted mb-0">28 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</p>
            <small class="text-muted">Hotline: 1900 8821 • Wi-Fi: AuraCafe2026</small>
            <h5 class="fw-bold mt-3 mb-0 text-uppercase">HÓA ĐƠN ĐIỆN TỬ</h5>
            <small class="text-muted">Số HĐ: #AUR-89241 • 24/10/2026 09:45:10</small>
        </div>

        <!-- Customer & Order Meta -->
        <div class="py-3 border-bottom border-dashed small">
            <div class="d-flex justify-content-between">
                <span>Khách hàng:</span>
                <span class="fw-bold">Nguyễn Văn An</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Số điện thoại:</span>
                <span>0908 123 456</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Hình thức:</span>
                <span class="badge bg-primary">Giao hàng tận nơi</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Thanh toán:</span>
                <span class="text-success fw-bold">VietQR (Đã thanh toán)</span>
            </div>
        </div>

        <!-- Items Table -->
        <div class="py-3 border-bottom border-dashed">
            <table class="w-100 small">
                <thead>
                    <tr class="text-muted">
                        <th>Món</th>
                        <th class="text-center">SL</th>
                        <th class="text-end">Đ.Giá</th>
                        <th class="text-end">T.Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="pt-2">Cà phê Muối Aura<br><small class="text-muted">Size L • +Kem béo</small></td>
                        <td class="text-center pt-2">2</td>
                        <td class="text-end pt-2">55.000</td>
                        <td class="text-end pt-2 fw-bold">110.000</td>
                    </tr>
                    <tr>
                        <td class="pt-2">Trà Sen Vàng Hạt Sen<br><small class="text-muted">Size M • Ít đá</small></td>
                        <td class="text-center pt-2">1</td>
                        <td class="text-end pt-2">49.000</td>
                        <td class="text-end pt-2 fw-bold">49.000</td>
                    </tr>
                    <tr>
                        <td class="pt-2">Bánh Croissant Bơ Tỏi</td>
                        <td class="text-center pt-2">1</td>
                        <td class="text-end pt-2">35.000</td>
                        <td class="text-end pt-2 fw-bold">35.000</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Totals Calculation -->
        <div class="py-3 border-bottom border-dashed small">
            <div class="d-flex justify-content-between mb-1">
                <span>Tiền món:</span>
                <span>194.000₫</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>Phí giao hàng:</span>
                <span>15.000₫</span>
            </div>
            <div class="d-flex justify-content-between mb-1 text-success">
                <span>Khấu trừ điểm SĐT:</span>
                <span>-20.000₫</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>Thuế GTGT (VAT 8%):</span>
                <span>Đã bao gồm</span>
            </div>
            <div class="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
                <span>TỔNG CỘNG:</span>
                <span class="text-danger">189.000₫</span>
            </div>
        </div>

        <!-- Footer Barcode & QR Verification -->
        <div class="text-center pt-3 small text-muted">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=VERIFY_BILL_AUR_89241" width="90" height="90" class="mb-2" alt="Verify QR">
            <p class="mb-1">Quét mã QR để tra cứu hóa đơn điện tử gốc</p>
            <p class="fw-bold mb-0">CẢM ƠN QUÝ KHÁCH & HẸN GẶP LẠI!</p>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
