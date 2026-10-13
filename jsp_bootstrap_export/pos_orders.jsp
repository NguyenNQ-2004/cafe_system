<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 12 • Quản Lý Đơn Tại Quầy - Aura POS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background: #f5f5f4; font-family: system-ui, sans-serif; }
    </style>
</head>
<body class="py-4">

<div class="container-fluid px-4">
    <!-- Header -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
                <span class="badge bg-warning text-dark fw-bold mb-1">Screen 12 • UC19, UC20, UC21, UC59 (Counter Order List)</span>
                <h3 class="fw-bold mb-0">Quản Lý Đơn Hàng Tại Quầy POS</h3>
                <small class="text-muted">Phiên làm việc POS 02 • Ca Sáng (Thu ngân Trần Mai Ly)</small>
            </div>
            <div class="d-flex gap-2">
                <a href="${pageContext.request.contextPath}/pos/order" class="btn btn-warning fw-bold"><i class="bi bi-plus-lg"></i> Tạo Đơn Mới (Screen 8)</a>
                <a href="${pageContext.request.contextPath}/pos/handover" class="btn btn-outline-dark">Bàn Giao Ca (Screen 27)</a>
            </div>
        </div>
    </div>

    <!-- Orders Table -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">Mã đơn</th>
                        <th>Thời gian</th>
                        <th>Loại đơn</th>
                        <th>Món uống & Định lượng</th>
                        <th class="text-end">Tổng tiền</th>
                        <th class="text-center">Trạng thái</th>
                        <th class="text-end pe-4">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="ps-4 font-monospace fw-bold text-dark">#ORD-0089</td>
                        <td class="small text-muted font-monospace">10:42:15</td>
                        <td><span class="badge bg-dark">Tại quán</span> Bàn 04</td>
                        <td class="small">2x Cà phê Muối Aura (Size M)</td>
                        <td class="text-end fw-bold font-monospace">100.000₫</td>
                        <td class="text-center"><span class="badge bg-success">ĐÃ XONG / TRẢ MÓN</span></td>
                        <td class="text-end pe-4">
                            <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-printer"></i> In Lại</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4 font-monospace fw-bold text-dark">#ORD-0088</td>
                        <td class="small text-muted font-monospace">10:35:10</td>
                        <td><span class="badge bg-secondary">Mang đi</span> Thẻ rung #12</td>
                        <td class="small">1x Trà Sen Vàng, 1x Bánh Croissant</td>
                        <td class="text-end fw-bold font-monospace">84.000₫</td>
                        <td class="text-center"><span class="badge bg-warning text-dark">KDS ĐANG PHA</span></td>
                        <td class="text-end pe-4">
                            <button class="btn btn-sm btn-outline-danger">Hủy Đơn</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
