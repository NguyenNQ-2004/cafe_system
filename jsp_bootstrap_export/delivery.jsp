<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 14 • Quản Lý Giao Vận - Aura Delivery</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background: #f5f5f4; font-family: system-ui, sans-serif; }
    </style>
</head>
<body class="py-4">

<div class="container" style="max-width: 900px;">
    <!-- Shipper Profile Header -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div class="d-flex align-items-center gap-3">
                <div class="p-3 rounded-circle bg-warning bg-opacity-10 text-warning fs-3">
                    <i class="bi bi-bicycle"></i>
                </div>
                <div>
                    <span class="badge bg-warning text-dark fw-bold mb-1">Screen 14 • UC24 - UC28 (Delivery Management)</span>
                    <h4 class="fw-bold mb-0">Tài Xế: Đỗ Văn Hùng</h4>
                    <small class="text-muted">Mã DX-902 • Biển số: 29E1-882.91 • <span class="text-success fw-bold"><i class="bi bi-circle-fill" style="font-size: 8px;"></i> Đang trực tuyến</span></small>
                </div>
            </div>
            <a href="${pageContext.request.contextPath}/home" class="btn btn-outline-secondary btn-sm">Thoát</a>
        </div>
    </div>

    <!-- 3 Delivery Management Modules Tabs (UC24 - UC28) -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <ul class="nav nav-pills mb-4 nav-fill bg-light p-1 rounded-pill small">
            <li class="nav-item">
                <button class="nav-link active rounded-pill fw-bold" data-bs-toggle="pill" data-bs-target="#tab-orders">
                    <i class="bi bi-box-seam"></i> 1. Đơn Giao (UC24, 25, 26)
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link rounded-pill fw-bold" data-bs-toggle="pill" data-bs-target="#tab-incident">
                    <i class="bi bi-exclamation-triangle"></i> 2. Báo Cáo Sự Cố (UC27)
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link rounded-pill fw-bold" data-bs-toggle="pill" data-bs-target="#tab-cod">
                    <i class="bi bi-cash-stack"></i> 3. Đối Soát COD (UC28)
                </button>
            </li>
        </ul>

        <div class="tab-content">
            <!-- Tab 1: Assigned Orders (UC24, UC25, UC26) -->
            <div class="tab-pane fade show active" id="tab-orders">
                <div class="card p-3 border rounded-3 mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold font-monospace text-dark">#AUR-89241</span>
                        <span class="badge bg-primary">Đã nhận hàng • Đang giao</span>
                    </div>
                    <p class="mb-1 fw-bold">Khách: Nguyễn Văn An - 0908 123 456</p>
                    <p class="text-muted small mb-2"><i class="bi bi-geo-alt-fill text-danger"></i> 28 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</p>
                    <p class="small mb-3">Thu hộ (COD): <strong class="text-danger">0₫ (Đã thanh toán VietQR)</strong></p>

                    <div class="d-flex gap-2">
                        <a href="tel:0908123456" class="btn btn-outline-success btn-sm rounded-pill"><i class="bi bi-telephone"></i> Gọi Khách</a>
                        <form action="${pageContext.request.contextPath}/delivery" method="POST" class="flex-grow-1">
                            <input type="hidden" name="action" value="completeDelivery">
                            <input type="hidden" name="orderId" value="AUR-89241">
                            <button type="submit" class="btn btn-success btn-sm w-100 rounded-pill fw-bold">
                                <i class="bi bi-check2"></i> Xác Nhận Đã Giao Thành Công
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Tab 2: Incident Reporting (UC27) -->
            <div class="tab-pane fade" id="tab-incident">
                <form action="${pageContext.request.contextPath}/delivery" method="POST">
                    <input type="hidden" name="action" value="reportIncident">
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Mã đơn hàng gặp sự cố</label>
                        <input type="text" name="orderCode" class="form-control" value="#AUR-89241" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Loại sự cố</label>
                        <select name="incidentType" class="form-select">
                            <option value="Khách không nghe máy (Gọi quá 3 lần)">Khách không nghe máy (Gọi quá 3 lần)</option>
                            <option value="Khách từ chối nhận hàng">Khách từ chối nhận hàng</option>
                            <option value="Đổ vỡ đồ uống trong quá trình di chuyển">Đổ vỡ đồ uống trong quá trình di chuyển</option>
                            <option value="Thời tiết mưa bão / ngập lụt trễ giờ">Thời tiết mưa bão / ngập lụt trễ giờ</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Mô tả chi tiết</label>
                        <textarea name="description" rows="3" class="form-control" placeholder="Ghi chú chi tiết cho cửa hàng..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-danger rounded-pill fw-bold px-4">Gửi Báo Cáo Về Quán</button>
                </form>
            </div>

            <!-- Tab 3: COD Cash Reconciliation (UC28) -->
            <div class="tab-pane fade" id="tab-cod">
                <div class="p-3 bg-light rounded-3 border mb-3">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Tổng tiền mặt COD đã thu trong ngày:</span>
                        <span class="fw-bold font-monospace">450.000₫</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Đã nộp về thu ngân quầy:</span>
                        <span class="fw-bold font-monospace text-success">450.000₫</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between fs-6 fw-bold">
                        <span>Còn nợ quỹ:</span>
                        <span class="text-success font-monospace">0₫ (Đã đối soát khớp 100%)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
