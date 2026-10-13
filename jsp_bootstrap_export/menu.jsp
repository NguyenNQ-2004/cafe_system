<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5">
    <!-- Header Banner -->
    <div class="row align-items-center mb-5">
        <div class="col-lg-8">
            <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">Thực Đơn Aura 2026</span>
            <h1 class="display-6 fw-bold text-stone-900">Khám Phá Hương Vị Cà Phê Đặc Sản</h1>
            <p class="text-muted">Từ hạt Arabica Cầu Đất nguyên bản đến công thức Cà phê Muối trứ danh của các Barista tài hoa.</p>
        </div>
        <div class="col-lg-4 text-lg-end">
            <!-- Search Form -->
            <form action="${pageContext.request.contextPath}/menu" method="GET" class="d-flex">
                <input class="form-control rounded-start-pill ps-3" type="search" name="keyword" value="${param.keyword}" placeholder="Tìm tên món uống...">
                <button class="btn btn-coffee rounded-end-pill px-4" type="submit"><i class="bi bi-search"></i></button>
            </form>
        </div>
    </div>

    <!-- Category Filter Pills -->
    <div class="d-flex gap-2 overflow-auto pb-3 mb-4">
        <a href="${pageContext.request.contextPath}/menu" class="btn ${empty param.categoryId ? 'btn-coffee' : 'btn-outline-secondary'} rounded-pill px-3">Tất cả</a>
        <c:forEach items="${categories}" var="cat">
            <a href="${pageContext.request.contextPath}/menu?categoryId=${cat.categoryId}" 
               class="btn ${param.categoryId == cat.categoryId ? 'btn-coffee' : 'btn-outline-secondary'} rounded-pill px-3">
                ${cat.categoryName}
            </a>
        </c:forEach>
    </div>

    <!-- Products Grid -->
    <div class="row g-4">
        <c:forEach items="${products}" var="p">
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card card-custom h-100 overflow-hidden bg-white shadow-sm">
                    <div class="position-relative" style="height: 200px;">
                        <img src="${p.imageUrl}" class="w-100 h-100 object-fit-cover" alt="${p.productName}">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75 rounded-pill px-2.5 py-1.5 font-monospace">
                            <fmt:formatNumber value="${p.basePrice}" pattern="#,###"/>₫
                        </span>
                    </div>
                    <div class="card-body d-flex flex-col justify-content-between p-3">
                        <div>
                            <h5 class="card-title fw-bold fs-6 text-truncate mb-1" title="${p.productName}">${p.productName}</h5>
                            <p class="card-text text-muted small text-truncate-2" style="font-size: 0.8rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                ${p.description}
                            </p>
                        </div>
                        <div class="pt-2 mt-auto d-flex justify-content-between align-items-center">
                            <span class="text-coffee fw-bolder fs-6">
                                <fmt:formatNumber value="${p.basePrice}" pattern="#,###"/>₫
                            </span>
                            <form action="${pageContext.request.contextPath}/cart" method="POST">
                                <input type="hidden" name="action" value="add">
                                <input type="hidden" name="productId" value="${p.productId}">
                                <input type="hidden" name="quantity" value="1">
                                <button type="submit" class="btn btn-sm btn-outline-coffee rounded-circle p-2" title="Thêm vào giỏ">
                                    <i class="bi bi-plus-lg fs-6"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </c:forEach>
    </div>
</div>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
