<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen 1 • Đăng Nhập & Xác Thực - Aura Café</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background: #fdfbf7; font-family: system-ui, sans-serif; }
        .auth-card { max-width: 450px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.06); }
        .btn-coffee { background: #78350f; color: white; }
        .btn-coffee:hover { background: #5a270b; color: white; }
    </style>
</head>
<body class="d-flex align-items-center min-vh-100 py-5">

<div class="container d-flex justify-content-center">
    <div class="card auth-card w-100 p-4 border-0 bg-white">
        <!-- Logo & Header -->
        <div class="text-center mb-4">
            <div class="d-inline-flex p-3 rounded-circle bg-warning bg-opacity-10 text-warning mb-2">
                <i class="bi bi-cup-hot-fill fs-2"></i>
            </div>
            <h4 class="fw-bold mb-1">AURA CAFÉ</h4>
            <span class="badge bg-warning text-dark mb-2">Screen 1 • Authentication (UC01 - UC04)</span>
            <p class="text-muted small">Hệ thống Đăng nhập / Đăng ký / Đổi mật khẩu</p>
        </div>

        <!-- Alert messages -->
        <c:if test="${not empty errorMessage}">
            <div class="alert alert-danger py-2 small mb-3">${errorMessage}</div>
        </c:if>
        <c:if test="${not empty successMessage}">
            <div class="alert alert-success py-2 small mb-3">${successMessage}</div>
        </c:if>

        <!-- Tabs -->
        <ul class="nav nav-pills nav-fill mb-3 bg-light p-1 rounded-pill small">
            <li class="nav-item">
                <button class="nav-link active rounded-pill fw-bold" data-bs-toggle="pill" data-bs-target="#tab-login">Đăng Nhập</button>
            </li>
            <li class="nav-item">
                <button class="nav-link rounded-pill fw-bold" data-bs-toggle="pill" data-bs-target="#tab-register">Đăng Ký</button>
            </li>
            <li class="nav-item">
                <button class="nav-link rounded-pill fw-bold" data-bs-toggle="pill" data-bs-target="#tab-pwd">Đổi Mật Khẩu</button>
            </li>
        </ul>

        <div class="tab-content">
            <!-- 1. LOGIN (UC02) -->
            <div class="tab-pane fade show active" id="tab-login">
                <form action="${pageContext.request.contextPath}/login" method="POST">
                    <input type="hidden" name="action" value="login">
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Email hoặc Số điện thoại</label>
                        <input type="text" name="username" class="form-control" placeholder="admin@auracafe.com hoặc 0908123456" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Mật khẩu</label>
                        <input type="password" name="password" class="form-control" placeholder="Mặc định: 123456" required>
                    </div>
                    <div class="d-flex justify-content-between small mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember">
                            <label class="form-check-label" for="remember">Ghi nhớ</label>
                        </div>
                        <a href="#" class="text-decoration-none text-muted">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" class="btn btn-coffee w-100 py-2 rounded-pill fw-bold">Đăng Nhập</button>
                </form>

                <div class="text-center mt-3 pt-3 border-top small text-muted">
                    <p class="mb-1"><strong>Tài khoản demo:</strong></p>
                    <p class="mb-0">Admin: <code>admin@auracafe.com</code> / <code>123456</code><br>Thu ngân: <code>ly.tran@auracafe.com</code> / <code>123456</code></p>
                </div>
            </div>

            <!-- 2. REGISTER (UC01) -->
            <div class="tab-pane fade" id="tab-register">
                <form action="${pageContext.request.contextPath}/login" method="POST">
                    <input type="hidden" name="action" value="register">
                    <div class="mb-2">
                        <label class="form-label small fw-bold">Họ và tên</label>
                        <input type="text" name="fullName" class="form-control form-control-sm" required>
                    </div>
                    <div class="mb-2">
                        <label class="form-label small fw-bold">Số điện thoại (dùng để tích điểm)</label>
                        <input type="tel" name="phone" class="form-control form-control-sm" required>
                    </div>
                    <div class="mb-2">
                        <label class="form-label small fw-bold">Email</label>
                        <input type="email" name="email" class="form-control form-control-sm" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Mật khẩu</label>
                        <input type="password" name="password" class="form-control form-control-sm" required>
                    </div>
                    <button type="submit" class="btn btn-coffee w-100 py-2 rounded-pill fw-bold">Tạo Tài Khoản</button>
                </form>
            </div>

            <!-- 3. CHANGE PASSWORD (UC04) -->
            <div class="tab-pane fade" id="tab-pwd">
                <form action="${pageContext.request.contextPath}/login" method="POST">
                    <input type="hidden" name="action" value="changePassword">
                    <div class="mb-2">
                        <label class="form-label small fw-bold">Email / SĐT tài khoản</label>
                        <input type="text" name="username" class="form-control form-control-sm" required>
                    </div>
                    <div class="mb-2">
                        <label class="form-label small fw-bold">Mật khẩu hiện tại</label>
                        <input type="password" name="oldPassword" class="form-control form-control-sm" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Mật khẩu mới</label>
                        <input type="password" name="newPassword" class="form-control form-control-sm" required>
                    </div>
                    <button type="submit" class="btn btn-warning w-100 py-2 rounded-pill fw-bold">Xác Nhận Đổi Mật Khẩu</button>
                </form>
            </div>
        </div>

        <div class="text-center mt-3">
            <a href="${pageContext.request.contextPath}/home" class="small text-muted text-decoration-none">← Quay về Trang chủ</a>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
