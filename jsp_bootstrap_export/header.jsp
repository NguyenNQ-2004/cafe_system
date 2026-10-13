<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aura Café - Specialty Coffee & Roastery</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts & Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #fbfbf9; color: #292524; }
        .bg-coffee { background-color: #78350f !important; }
        .text-coffee { color: #78350f !important; }
        .btn-coffee { background-color: #92400e; color: #ffffff; border: none; }
        .btn-coffee:hover { background-color: #78350f; color: #ffffff; }
        .card-custom { border-radius: 16px; border: 1px solid #e7e5e4; transition: all 0.2s ease-in-out; }
        .card-custom:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); }
    </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3">
    <div class="container">
        <a class="navbar-brand d-flex items-center gap-2 font-monospace fw-bold text-coffee" href="${pageContext.request.contextPath}/home">
            <i class="bi bi-cup-hot-fill fs-4 text-warning"></i>
            <span class="fw-bolder tracking-tight">AURA CAFÉ</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 fw-semibold fs-6">
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/home">Trang chủ</a></li>
                <li class="nav-item"><a class="nav-link active text-coffee" href="${pageContext.request.contextPath}/menu">Thực đơn</a></li>
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/orders">Đơn mua</a></li>
                <c:if test="${sessionScope.user.role == 'CASHIER' || sessionScope.user.role == 'ADMIN'}">
                    <li class="nav-item"><a class="nav-link text-danger fw-bold" href="${pageContext.request.contextPath}/pos/order"><i class="bi bi-display"></i> POS Thu Ngân</a></li>
                </c:if>
                <c:if test="${sessionScope.user.role == 'ADMIN'}">
                    <li class="nav-item"><a class="nav-link text-primary fw-bold" href="${pageContext.request.contextPath}/admin/dashboard"><i class="bi bi-gear-wide-connected"></i> Quản trị ERP</a></li>
                </c:if>
            </ul>
            <div class="d-flex align-items-center gap-3">
                <a href="${pageContext.request.contextPath}/cart" class="btn btn-outline-dark position-relative rounded-pill px-3">
                    <i class="bi bi-bag"></i> Giỏ hàng
                    <c:if test="${not empty sessionScope.cartCount && sessionScope.cartCount > 0}">
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            ${sessionScope.cartCount}
                        </span>
                    </c:if>
                </a>
                <c:choose>
                    <c:when test="${not empty sessionScope.user}">
                        <div class="dropdown">
                            <button class="btn btn-light rounded-pill dropdown-toggle fw-semibold border" type="button" data-bs-toggle="dropdown">
                                <i class="bi bi-person-circle"></i> ${sessionScope.user.fullName}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                                <li><a class="dropdown-item" href="${pageContext.request.contextPath}/profile">Hồ sơ cá nhân</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="${pageContext.request.contextPath}/logout">Đăng xuất</a></li>
                            </ul>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <a href="${pageContext.request.contextPath}/login" class="btn btn-coffee rounded-pill px-4">Đăng nhập</a>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>
</nav>
