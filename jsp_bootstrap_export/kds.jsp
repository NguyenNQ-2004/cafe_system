<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 13 • Màn Hình Pha Chế KDS - Barista Terminal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background: #1c1917; color: white; font-family: system-ui, sans-serif; }
        .kds-card { background: #292524; border: 1px solid #44403c; border-radius: 16px; }
        .kds-header { background: #0c0a09; }
    </style>
</head>
<body class="py-3">

<div class="container-fluid px-4">
    <!-- KDS Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 kds-header border border-secondary">
        <div class="d-flex align-items-center gap-3">
            <span class="fs-4 fw-bold text-warning"><i class="bi bi-cup-hot-fill"></i> BARISTA KDS</span>
            <span class="badge bg-warning text-dark fw-bold">Screen 13 • UC22, UC23</span>
            <span class="badge bg-success"><i class="bi bi-broadcast"></i> KDS Trực Tuyến</span>
        </div>
        <div class="d-flex align-items-center gap-3">
            <span class="text-white-50 small">Trạm 01 • Barista: <strong>Nguyễn Tuấn Anh</strong></span>
            <a href="${pageContext.request.contextPath}/home" class="btn btn-outline-light btn-sm rounded-pill">Thoát KDS</a>
        </div>
    </div>

    <!-- FIFO Drink Preparation Tickets Grid -->
    <div class="row g-3">
        <!-- Ticket 1 -->
        <div class="col-md-4 col-lg-3">
            <div class="kds-card p-3 h-100 d-flex flex-column justify-content-between border-start border-4 border-danger">
                <div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold font-monospace fs-5 text-warning">#ORD-0089</span>
                        <span class="badge bg-danger">Chờ 02:45</span>
                    </div>
                    <small class="text-white-50 d-block mb-2">Tại quán • Bàn 04</small>

                    <ul class="list-unstyled mb-0">
                        <li class="py-2 border-bottom border-secondary d-flex justify-content-between align-items-start">
                            <div>
                                <strong class="fs-6">2x Cà Phê Muối Aura</strong><br>
                                <small class="text-warning">Size M • Đá chuẩn • 100% Đường</small>
                            </div>
                            <input class="form-check-input mt-1" type="checkbox">
                        </li>
                    </ul>
                </div>

                <div class="pt-3 mt-3 border-top border-secondary">
                    <form action="${pageContext.request.contextPath}/kds" method="POST">
                        <input type="hidden" name="orderId" value="ORD-0089">
                        <button type="submit" class="btn btn-success w-100 fw-bold py-2 rounded-pill">
                            <i class="bi bi-check2-circle"></i> Hoàn Tất Pha Chế
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Ticket 2 -->
        <div class="col-md-4 col-lg-3">
            <div class="kds-card p-3 h-100 d-flex flex-column justify-content-between border-start border-4 border-warning">
                <div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold font-monospace fs-5 text-warning">#AUR-89241</span>
                        <span class="badge bg-warning text-dark">Chờ 01:10</span>
                    </div>
                    <small class="text-white-50 d-block mb-2">Đơn Giao Đi • Shipper Hùng</small>

                    <ul class="list-unstyled mb-0">
                        <li class="py-2 border-bottom border-secondary d-flex justify-content-between align-items-start">
                            <div>
                                <strong class="fs-6">1x Trà Sen Vàng Hạt Sen</strong><br>
                                <small class="text-warning">Size M • Ít đá • 50% Đường</small>
                            </div>
                            <input class="form-check-input mt-1" type="checkbox">
                        </li>
                        <li class="py-2 border-bottom border-secondary d-flex justify-content-between align-items-start">
                            <div>
                                <strong class="fs-6">1x Bánh Croissant Bơ Tỏi</strong><br>
                                <small class="text-info">Nướng nóng lò 2 phút</small>
                            </div>
                            <input class="form-check-input mt-1" type="checkbox">
                        </li>
                    </ul>
                </div>

                <div class="pt-3 mt-3 border-top border-secondary">
                    <form action="${pageContext.request.contextPath}/kds" method="POST">
                        <input type="hidden" name="orderId" value="AUR-89241">
                        <button type="submit" class="btn btn-success w-100 fw-bold py-2 rounded-pill">
                            <i class="bi bi-check2-circle"></i> Hoàn Tất Pha Chế
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
