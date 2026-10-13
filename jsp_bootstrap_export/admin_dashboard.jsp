<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 31 • Báo Cáo Kinh Doanh BI - Aura Admin ERP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background: #fafaf9; font-family: system-ui, sans-serif; }
        .sidebar { background: white; min-height: 100vh; border-right: 1px solid #e7e5e4; }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <!-- Sidebar Navigation (Admin) -->
        <div class="col-md-3 col-lg-2 sidebar p-3 d-flex flex-column justify-content-between">
            <div>
                <div class="d-flex align-items-center gap-2 mb-4 px-2">
                    <i class="bi bi-cup-hot-fill text-warning fs-3"></i>
                    <div>
                        <h6 class="fw-bold mb-0">AURA CAFÉ</h6>
                        <small class="text-muted" style="font-size: 10px;">ERP PORTAL</small>
                    </div>
                </div>

                <div class="list-group list-group-flush small">
                    <a href="${pageContext.request.contextPath}/admin/dashboard" class="list-group-item list-group-item-action active rounded-3 mb-1"><i class="bi bi-graph-up-arrow me-2"></i> Screen 31: Báo Cáo BI</a>
                    <a href="${pageContext.request.contextPath}/admin/products" class="list-group-item list-group-item-action rounded-3 mb-1"><i class="bi bi-cup me-2"></i> Screen 16: Món Uống</a>
                    <a href="${pageContext.request.contextPath}/admin/loyalty" class="list-group-item list-group-item-action rounded-3 mb-1"><i class="bi bi-phone me-2"></i> Screen 29: Tích Điểm SĐT</a>
                    <a href="${pageContext.request.contextPath}/home" class="list-group-item list-group-item-action rounded-3"><i class="bi bi-box-arrow-left me-2"></i> Về Trang Khách</a>
                </div>
            </div>

            <div class="p-2 bg-light rounded-3 small text-muted">
                <small>Aura ERP Enterprise v3.4</small>
            </div>
        </div>

        <!-- Main Dashboard View -->
        <div class="col-md-9 col-lg-10 p-4">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <span class="badge bg-warning text-dark fw-bold mb-1">Screen 31 • Reports Dashboard</span>
                    <h3 class="fw-bold mb-0">Báo Cáo Tổng Quan Doanh Số & Hiệu Quả Kinh Doanh</h3>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-dark btn-sm rounded-pill"><i class="bi bi-calendar3"></i> Hôm nay: 24/10/2026</button>
                    <button class="btn btn-success btn-sm rounded-pill"><i class="bi bi-file-earmark-excel"></i> Xuất Excel</button>
                </div>
            </div>

            <!-- KPI Cards -->
            <div class="row g-3 mb-4">
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                        <small class="text-muted fw-bold">Tổng doanh thu ngày</small>
                        <h3 class="fw-bold text-dark font-monospace mt-1 mb-0">14.850.000₫</h3>
                        <small class="text-success"><i class="bi bi-arrow-up-right"></i> +12.5% so với hôm qua</small>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                        <small class="text-muted fw-bold">Tổng số ly phục vụ</small>
                        <h3 class="fw-bold text-primary font-monospace mt-1 mb-0">284 ly</h3>
                        <small class="text-muted">Tại quầy: 195 • Online: 89</small>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                        <small class="text-muted fw-bold">Giá trị trung bình / đơn</small>
                        <h3 class="fw-bold text-dark font-monospace mt-1 mb-0">52.300₫</h3>
                        <small class="text-success"><i class="bi bi-arrow-up-right"></i> +4.2% AOV</small>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
                        <small class="text-muted fw-bold">Điểm SĐT đã tiêu</small>
                        <h3 class="fw-bold text-warning font-monospace mt-1 mb-0">1.450 pts</h3>
                        <small class="text-muted">= 145.000₫ chiết khấu</small>
                    </div>
                </div>
            </div>

            <!-- Top Selling Table -->
            <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 class="fw-bold mb-3">Top 5 Đồ Uống Bán Chạy Nhất Trong Ngày</h5>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Tên món</th>
                                <th class="text-center">Số lượng bán</th>
                                <th class="text-end">Doanh số</th>
                                <th class="text-end">Tỷ trọng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="fw-bold">1. Cà phê Muối Aura Đặc Biệt</td>
                                <td class="text-center fw-bold">92 ly</td>
                                <td class="text-end font-monospace">5.060.000₫</td>
                                <td class="text-end text-success fw-bold">34.1%</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">2. Trà Sen Vàng Hạt Sen</td>
                                <td class="text-center fw-bold">65 ly</td>
                                <td class="text-end font-monospace">3.185.000₫</td>
                                <td class="text-end text-success fw-bold">21.4%</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">3. Bạc Xỉu Sữa Tươi Cốt Dừa</td>
                                <td class="text-center fw-bold">48 ly</td>
                                <td class="text-end font-monospace">2.160.000₫</td>
                                <td class="text-end text-success fw-bold">14.5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
