<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="header.jsp" />

<div class="container py-5" style="max-width: 960px;">
    <!-- Profile Hero -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
            <div class="d-flex align-items-center gap-3">
                <div class="position-relative">
                    <img src="${sessionScope.user.avatarUrl != null ? sessionScope.user.avatarUrl : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}" 
                         class="rounded-circle border border-3 border-warning" width="80" height="80" alt="">
                    <span class="position-absolute bottom-0 end-0 badge bg-success rounded-pill" title="Đã liên kết SĐT">
                        <i class="bi bi-phone"></i> SĐT
                    </span>
                </div>
                <div>
                    <span class="badge bg-warning text-dark mb-1">Screen 2 • UC05 (Customer Profile)</span>
                    <h3 class="fw-bold mb-0">${sessionScope.user.fullName}</h3>
                    <p class="text-muted small mb-1"><i class="bi bi-telephone"></i> ${sessionScope.user.phone} • <i class="bi bi-envelope"></i> ${sessionScope.user.email}</p>
                    <span class="badge bg-light text-dark border">Thành viên tích điểm theo SĐT</span>
                </div>
            </div>

            <div class="bg-light p-3 rounded-4 border text-md-end">
                <small class="text-muted text-uppercase fw-bold d-block">Điểm tích lũy theo SĐT</small>
                <h2 class="text-success fw-bolder font-monospace mb-0">${loyaltyPoints != null ? loyaltyPoints : 450} <small class="fs-6 text-muted">pts</small></h2>
                <small class="text-muted">= <fmt:formatNumber value="${(loyaltyPoints != null ? loyaltyPoints : 450) * 100}" pattern="#,###"/>₫ giảm trừ khi mua hàng</small>
            </div>
        </div>
    </div>

    <!-- 2 Tabs: Info & Loyalty Logs -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
                <button class="nav-link active fw-bold" data-bs-toggle="tab" data-bs-target="#tab-info">Thông Tin Cá Nhân</button>
            </li>
            <li class="nav-item">
                <button class="nav-link fw-bold" data-bs-toggle="tab" data-bs-target="#tab-points">Lịch Sử Tích & Tiêu Điểm</button>
            </li>
        </ul>

        <div class="tab-content">
            <!-- Form Update Info -->
            <div class="tab-pane fade show active" id="tab-info">
                <form action="${pageContext.request.contextPath}/profile" method="POST">
                    <input type="hidden" name="action" value="updateProfile">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Họ và tên</label>
                            <input type="text" name="fullName" class="form-control" value="${sessionScope.user.fullName}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Số điện thoại tích điểm</label>
                            <input type="text" name="phone" class="form-control font-monospace" value="${sessionScope.user.phone}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Email</label>
                            <input type="email" name="email" class="form-control" value="${sessionScope.user.email}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Địa chỉ giao hàng mặc định</label>
                            <input type="text" name="address" class="form-control" value="28 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội">
                        </div>
                    </div>
                    <div class="text-end mt-4">
                        <button type="submit" class="btn btn-coffee rounded-pill px-4 fw-bold">Lưu Thay Đổi</button>
                    </div>
                </form>
            </div>

            <!-- Points History Table -->
            <div class="tab-pane fade" id="tab-points">
                <div class="table-responsive">
                    <table class="table table-hover align-middle small">
                        <thead class="table-light">
                            <tr>
                                <th>Thời gian</th>
                                <th>Loại giao dịch</th>
                                <th class="text-end">Biến động</th>
                                <th class="text-end">Số dư</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-mono text-muted">14/10/2026 10:24</td>
                                <td><span class="badge bg-success">Tích điểm</span></td>
                                <td class="text-end fw-bold text-success">+18 pts</td>
                                <td class="text-end font-monospace">450 pts</td>
                                <td>Đơn hàng #AUR-89241</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-muted">12/10/2026 16:10</td>
                                <td><span class="badge bg-warning text-dark">Tiêu điểm</span></td>
                                <td class="text-end fw-bold text-danger">-200 pts</td>
                                <td class="text-end font-monospace">432 pts</td>
                                <td>Giảm 20.000₫ thanh toán tại quầy</td>
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
