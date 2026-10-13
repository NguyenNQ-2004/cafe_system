<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 27 • Bàn Giao Ca Thu Ngân</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background-color: #fafaf9; font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body class="py-4">

<div class="container" style="max-width: 900px;">
    <!-- Header -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
                <span class="badge bg-warning text-dark fw-bold mb-1">Screen 27 • UC62</span>
                <h3 class="fw-bold text-dark mb-0">Biên Bản Bàn Giao Ca Làm Việc Thu Ngân</h3>
                <small class="text-muted">Ca Sáng (06:30 - 14:30) • Trạm POS 02 Tràng Tiền</small>
            </div>
            <div class="d-flex gap-2">
                <button onclick="window.print()" class="btn btn-outline-secondary btn-sm"><i class="bi bi-printer"></i> In K80</button>
                <a href="${pageContext.request.contextPath}/pos/order" class="btn btn-dark btn-sm"><i class="bi bi-arrow-left"></i> Quay lại POS</a>
            </div>
        </div>
    </div>

    <!-- Handover Parties Cards -->
    <div class="row g-3 mb-4">
        <div class="col-md-6">
            <div class="card border-0 shadow-sm rounded-4 p-3 border-start border-4 border-warning bg-white">
                <small class="text-muted text-uppercase fw-bold">Người bàn giao (Ca Sáng)</small>
                <h5 class="fw-bold mt-1 mb-0">Trần Mai Ly</h5>
                <small class="text-muted">Mã NV: NV-8821 • Thu ngân chính</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card border-0 shadow-sm rounded-4 p-3 border-start border-4 border-primary bg-white">
                <small class="text-muted text-uppercase fw-bold">Người tiếp nhận (Ca Chiều)</small>
                <h5 class="fw-bold mt-1 mb-0">Lê Hoàng Nam</h5>
                <small class="text-muted">Mã NV: NV-7603 • Đã có mặt đối chiếu</small>
            </div>
        </div>
    </div>

    <!-- Cash Count & Reconciliation -->
    <form action="${pageContext.request.contextPath}/pos/handover" method="POST">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h5 class="fw-bold mb-3"><i class="bi bi-cash-stack text-success"></i> 1. Kiểm Đếm Tiền Mặt Thực Tế Trong Két</h5>
            
            <div class="row g-3 mb-3">
                <div class="col-md-6">
                    <label class="form-label small fw-bold">Tiền mặt thực tế đếm được (VNĐ):</label>
                    <input type="number" name="actualCash" class="form-control form-control-lg fw-bold font-monospace text-success" value="4920000" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label small fw-bold">Tiền mặt trên hệ thống (Lý thuyết):</label>
                    <input type="text" class="form-control form-control-lg fw-bold font-monospace bg-light" value="4,920,000₫" readonly>
                </div>
            </div>

            <div class="alert alert-success d-flex align-items-center gap-2 mb-0 py-2">
                <i class="bi bi-check-circle-fill fs-5"></i>
                <span class="small">Khớp 100% doanh thu tiền mặt trong ca. Không có chênh lệch thừa/thiếu!</span>
            </div>
        </div>

        <!-- Hardware Checklist -->
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h5 class="fw-bold mb-3"><i class="bi bi-hdd-network text-primary"></i> 2. Kiểm Tra Tình Trạng Thiết Bị Quầy</h5>
            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" checked id="c1">
                <label class="form-check-label small" for="c1">Máy in hóa đơn nhiệt K80 hoạt động tốt, còn đủ giấy in.</label>
            </div>
            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" checked id="c2">
                <label class="form-check-label small" for="c2">Máy POS cảm ứng và máy quét mã QR / Barcode phản hồi nhạy.</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked id="c3">
                <label class="form-check-label small" for="c3">Két đựng tiền tự động đóng/bật tốt, đã khóa chốt cẩn thận.</label>
            </div>
        </div>

        <!-- Confirmation Button -->
        <div class="text-end">
            <button type="submit" class="btn btn-warning btn-lg rounded-pill px-5 fw-bold shadow-sm">
                Xác Nhận & Ký Bàn Giao Ca <i class="bi bi-check2-circle"></i>
            </button>
        </div>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
