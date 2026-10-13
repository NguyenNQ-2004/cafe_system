<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 29 • Quản Lý Tích Điểm SĐT - Aura Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background: #fafaf9; font-family: system-ui, sans-serif; }
    </style>
</head>
<body class="py-4">

<div class="container" style="max-width: 960px;">
    <!-- Header -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
                <span class="badge bg-success mb-1">Screen 29 • UC64 (Phone Loyalty Rules)</span>
                <span class="badge bg-light text-dark border">Không phân hạng thẻ</span>
                <h3 class="fw-bold mb-0 mt-1">Cấu Hình Chính Sách Tích Điểm Theo Số Điện Thoại</h3>
                <small class="text-muted">Khách hàng tích và tiêu điểm trực tiếp qua Số Điện Thoại tại quầy POS và Web</small>
            </div>
            <a href="${pageContext.request.contextPath}/admin/dashboard" class="btn btn-outline-dark btn-sm rounded-pill">Quay lại Dashboard</a>
        </div>
    </div>

    <!-- Quick Metrics -->
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                <small class="text-muted fw-bold">Tổng khách hàng tích điểm</small>
                <h4 class="fw-bold text-dark font-monospace mt-1 mb-0">1,428 SĐT</h4>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                <small class="text-muted fw-bold">Tổng điểm đang lưu hành</small>
                <h4 class="fw-bold text-success font-monospace mt-1 mb-0">184,520 pts</h4>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                <small class="text-muted fw-bold">Tỷ lệ quy đổi điểm</small>
                <h4 class="fw-bold text-primary font-monospace mt-1 mb-0">1 điểm = 100₫</h4>
            </div>
        </div>
    </div>

    <!-- 2 Columns: Rule Form & Phone Lookup -->
    <div class="row g-4 mb-4">
        <!-- Rule Form -->
        <div class="col-lg-7">
            <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 class="fw-bold mb-3"><i class="bi bi-sliders text-warning"></i> Quy Tắc Tích & Đổi Điểm SĐT</h5>
                <form action="${pageContext.request.contextPath}/admin/loyalty" method="POST">
                    <input type="hidden" name="action" value="updateRules">
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Mức chi tiêu để tích 1 điểm (VNĐ)</label>
                        <input type="number" class="form-control" name="spendPerPoint" value="10000" step="1000">
                        <small class="text-muted">Ví dụ: 10.000₫ = 1 điểm (hoàn tiền 1%)</small>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Giá trị quy đổi khi dùng điểm (VNĐ)</label>
                        <input type="number" class="form-control" name="pointValue" value="100" step="10">
                        <small class="text-muted">Ví dụ: 100 điểm = giảm 10.000₫ trên hóa đơn</small>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Điểm tối thiểu để được tiêu</label>
                        <input type="number" class="form-control" name="minPoints" value="50">
                    </div>
                    <button type="submit" class="btn btn-warning rounded-pill px-4 fw-bold">Lưu Cấu Hình</button>
                </form>
            </div>
        </div>

        <!-- Phone Lookup -->
        <div class="col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 class="fw-bold mb-3"><i class="bi bi-search text-success"></i> Tra Cứu Điểm Theo SĐT</h5>
                <form action="${pageContext.request.contextPath}/admin/loyalty" method="GET" class="input-group mb-3">
                    <input type="text" name="phone" class="form-control" placeholder="Nhập SĐT (0908 123 456)..." value="0908123456">
                    <button class="btn btn-dark" type="submit">Tìm</button>
                </form>

                <div class="p-3 bg-light rounded-3 border">
                    <h6 class="fw-bold mb-1">Nguyễn Văn An</h6>
                    <small class="text-muted d-block font-monospace mb-2">0908 123 456</small>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>Điểm khả dụng:</span>
                        <span class="badge bg-success fs-6 font-monospace">450 pts</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center small text-muted">
                        <span>Tổng chi tiêu:</span>
                        <span class="font-monospace">4.250.000₫</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
