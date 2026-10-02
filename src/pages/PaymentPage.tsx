import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';

interface PaymentPageProps {
  onNavigate: (route: PageRoute) => void;
  onPaymentComplete: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  onNavigate,
  onPaymentComplete
}) => {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 58);
  const [deductPoints, setDeductPoints] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'vietqr' | 'ewallet' | 'card' | 'cod'>('vietqr');
  const [selectedWallet, setSelectedWallet] = useState<'momo' | 'zalopay' | 'shopeepay'>('momo');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const baseTotal = 219000;
  const finalAmount = deductPoints ? baseTotal - 45000 : baseTotal;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + ' đ';
  };

  const handleConfirmPaid = () => {
    setToastMsg('Thanh toán thành công! Đơn hàng đã chuyển trực tiếp tới Barista KDS.');
    setTimeout(() => {
      onPaymentComplete();
      onNavigate('orders');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-margin md:px-margin-lg py-space-lg max-w-7xl mx-auto">
        {/* Toast */}
        {toastMsg && (
          <div className="fixed top-24 right-6 z-50 bg-primary text-white px-space-lg py-space-md rounded-xl shadow-2xl flex items-center gap-space-sm animate-bounce">
            <span className="material-symbols-outlined text-[24px]">task_alt</span>
            <span className="font-label-lg">{toastMsg}</span>
          </div>
        )}

        {/* Top Progress & Meta Bar */}
        <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm mb-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-surface-container-high">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px]">
                receipt_long
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-sm flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                  Thanh toán đơn hàng #AUR-89241
                </h1>
                <span className="px-space-sm py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
                  Chờ thanh toán
                </span>
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Vui lòng hoàn tất thanh toán để bar bắt đầu chuẩn bị món ngon của bạn
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md w-full md:w-auto justify-between md:justify-end bg-surface-container-low px-space-md py-space-sm rounded-lg border border-surface-container-high">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[20px] animate-spin" style={{ animationDuration: '4s' }}>
                timelapse
              </span>
              <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                Thời gian giữ đơn:
              </span>
            </div>
            <div className="font-headline-sm text-headline-sm font-tabular-data text-primary font-bold tracking-tight">
              {formatTimer(timeLeft)}
            </div>
          </div>
        </div>

        {/* Main Payment & Bill Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* LEFT COLUMN: Payment Methods (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Loyalty Points Deduct Card */}
            <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm border border-surface-container-high">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">stars</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Aura Points Reward Club
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Số dư ví: <strong className="font-tabular-data text-on-surface font-semibold">450 điểm</strong> (~45.000đ)
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deductPoints}
                    onChange={(e) => setDeductPoints(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" />
                </label>
              </div>

              {deductPoints && (
                <div className="mt-space-sm pt-space-xs text-primary font-label-sm text-label-sm flex items-center gap-1 animate-fadeIn">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Đã kích hoạt cấn trừ 45.000đ từ điểm thưởng Aura vào hóa đơn</span>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Phương thức thanh toán
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Mã hoá PCI-DSS Level 1
                </span>
              </div>

              {/* Method 1: VietQR */}
              <div
                className={`rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                  selectedMethod === 'vietqr'
                    ? 'border-primary/40 bg-surface-container-low shadow-sm'
                    : 'border-transparent bg-surface-bright'
                }`}
              >
                <label
                  onClick={() => setSelectedMethod('vietqr')}
                  className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-space-md">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'vietqr'}
                      readOnly
                      className="w-4 h-4 text-primary accent-primary cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                          Quét mã VietQR / Chuyển khoản Ngân hàng
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                          Khuyên dùng
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Tự động khớp lệnh và xác nhận đơn chỉ trong 3 giây
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-surface-container-lowest rounded font-tabular-data text-label-sm font-semibold text-secondary">
                    Vietcombank
                  </span>
                </label>

                {selectedMethod === 'vietqr' && (
                  <div className="p-space-md md:p-space-lg bg-surface-container-lowest border-t border-surface-container-high animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-lg items-center">
                      {/* Visual Dynamic QR */}
                      <div className="sm:col-span-5 flex flex-col items-center justify-center p-space-md bg-surface-bright rounded-lg border border-surface-container-high">
                        <div className="relative w-44 h-44 bg-surface-container-lowest p-2 rounded shadow-sm flex items-center justify-center border border-surface-container-high">
                          <svg className="w-full h-full text-on-surface" viewBox="0 0 100 100" fill="currentColor">
                            <rect x="5" y="5" width="28" height="28" rx="2" fill="#121C2A" />
                            <rect x="10" y="10" width="18" height="18" fill="#FFFFFF" />
                            <rect x="14" y="14" width="10" height="10" fill="#B2292E" />

                            <rect x="67" y="5" width="28" height="28" rx="2" fill="#121C2A" />
                            <rect x="72" y="10" width="18" height="18" fill="#FFFFFF" />
                            <rect x="76" y="14" width="10" height="10" fill="#B2292E" />

                            <rect x="5" y="67" width="28" height="28" rx="2" fill="#121C2A" />
                            <rect x="10" y="72" width="18" height="18" fill="#FFFFFF" />
                            <rect x="14" y="76" width="10" height="10" fill="#B2292E" />

                            <rect x="38" y="8" width="5" height="5" />
                            <rect x="48" y="14" width="6" height="6" />
                            <rect x="58" y="8" width="5" height="5" />
                            <rect x="38" y="24" width="7" height="4" />
                            <rect x="48" y="28" width="4" height="6" />
                            <rect x="12" y="38" width="6" height="5" />
                            <rect x="22" y="44" width="5" height="6" />
                            <rect x="32" y="38" width="8" height="8" />
                            <rect x="45" y="40" width="10" height="10" fill="#B2292E" />
                            <rect x="60" y="38" width="7" height="6" />
                            <rect x="72" y="44" width="6" height="8" />
                            <rect x="84" y="38" width="5" height="5" />
                            <rect x="38" y="56" width="6" height="8" />
                            <rect x="50" y="54" width="7" height="6" />
                            <rect x="62" y="60" width="8" height="6" />
                            <rect x="76" y="58" width="5" height="5" />
                            <rect x="85" y="68" width="6" height="6" />
                            <rect x="38" y="72" width="5" height="5" />
                            <rect x="48" y="70" width="8" height="6" />
                            <rect x="60" y="74" width="5" height="7" />
                            <rect x="70" y="80" width="6" height="6" />
                            <rect x="82" y="82" width="8" height="8" />
                            <rect x="42" y="86" width="10" height="4" />
                            <rect x="56" y="88" width="7" height="5" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md">
                              <span className="material-symbols-outlined text-[16px]">local_cafe</span>
                            </span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-space-sm flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[14px] text-primary">sensors</span>{' '}
                          Mở app ngân hàng để quét
                        </span>
                      </div>

                      {/* Transfer Details */}
                      <div className="sm:col-span-7 flex flex-col gap-space-sm">
                        <div className="bg-surface-bright p-space-sm rounded-lg flex items-center justify-between border border-surface-container-high">
                          <div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant">
                              Ngân hàng thụ hưởng
                            </div>
                            <div className="font-label-lg text-label-lg font-semibold text-on-surface">
                              Vietcombank (CN Hà Nội)
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm font-medium text-secondary">
                            VCB
                          </span>
                        </div>

                        <div className="bg-surface-bright p-space-sm rounded-lg flex items-center justify-between border border-surface-container-high">
                          <div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant">
                              Số tài khoản
                            </div>
                            <div className="font-tabular-data text-tabular-data text-headline-sm font-bold text-on-surface tracking-wider">
                              9888 823 456
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('9888823456', 'account')}
                            className="px-space-sm py-1 rounded bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                          >
                            {copiedField === 'account' ? 'Đã sao chép' : 'Sao chép'}
                          </button>
                        </div>

                        <div className="bg-surface-bright p-space-sm rounded-lg flex items-center justify-between border border-surface-container-high">
                          <div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant">
                              Số tiền chính xác
                            </div>
                            <div className="font-tabular-data text-tabular-data text-headline-sm font-bold text-primary">
                              {formatPrice(finalAmount)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(finalAmount.toString(), 'amount')}
                            className="px-space-sm py-1 rounded bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                          >
                            {copiedField === 'amount' ? 'Đã sao chép' : 'Sao chép'}
                          </button>
                        </div>

                        <div className="bg-primary/5 p-space-sm rounded-lg flex items-center justify-between border border-primary/20">
                          <div>
                            <div className="font-label-sm text-label-sm text-primary font-medium">
                              Nội dung chuyển khoản (Bắt buộc)
                            </div>
                            <div className="font-tabular-data text-tabular-data text-headline-sm font-bold text-primary tracking-widest">
                              AUR89241
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('AUR89241', 'memo')}
                            className="px-space-sm py-1 rounded bg-primary text-white font-label-sm text-label-sm transition-colors cursor-pointer font-semibold shadow-sm"
                          >
                            {copiedField === 'memo' ? 'Đã sao chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Method 2: E-Wallets */}
              <div
                className={`rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                  selectedMethod === 'ewallet'
                    ? 'border-primary/40 bg-surface-container-low shadow-sm'
                    : 'border-transparent bg-surface-bright'
                }`}
              >
                <label
                  onClick={() => setSelectedMethod('ewallet')}
                  className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-space-md">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'ewallet'}
                      readOnly
                      className="w-4 h-4 text-primary accent-primary cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Ví điện tử liên kết
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        MoMo, ZaloPay, ShopeePay (Hoàn tiền Aura 2%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="px-2 py-0.5 rounded bg-[#A50064] text-white font-label-sm text-label-sm font-bold">
                      MoMo
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#0068FF] text-white font-label-sm text-label-sm font-bold">
                      ZaloPay
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EE4D2D] text-white font-label-sm text-label-sm font-bold hidden sm:inline">
                      ShopeePay
                    </span>
                  </div>
                </label>

                {selectedMethod === 'ewallet' && (
                  <div className="p-space-md bg-surface-container-lowest border-t border-surface-container-high animate-fadeIn">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-space-sm font-semibold">
                      Chọn ứng dụng ví để tiếp tục:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                      <button
                        type="button"
                        onClick={() => setSelectedWallet('momo')}
                        className={`p-space-md rounded-lg text-left flex items-center gap-space-sm transition-all cursor-pointer border ${
                          selectedWallet === 'momo'
                            ? 'bg-surface-container border-primary shadow-sm'
                            : 'bg-surface hover:bg-surface-container-low border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#A50064] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          M
                        </div>
                        <div>
                          <div className="font-label-md text-label-md font-bold text-on-surface">
                            Ví MoMo
                          </div>
                          <div className="font-label-sm text-label-sm text-secondary">
                            Tự động chuyển tiếp
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedWallet('zalopay')}
                        className={`p-space-md rounded-lg text-left flex items-center gap-space-sm transition-all cursor-pointer border ${
                          selectedWallet === 'zalopay'
                            ? 'bg-surface-container border-primary shadow-sm'
                            : 'bg-surface hover:bg-surface-container-low border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          Z
                        </div>
                        <div>
                          <div className="font-label-md text-label-md font-bold text-on-surface">
                            ZaloPay
                          </div>
                          <div className="font-label-sm text-label-sm text-secondary">
                            Giảm thêm 10k
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedWallet('shopeepay')}
                        className={`p-space-md rounded-lg text-left flex items-center gap-space-sm transition-all cursor-pointer border ${
                          selectedWallet === 'shopeepay'
                            ? 'bg-surface-container border-primary shadow-sm'
                            : 'bg-surface hover:bg-surface-container-low border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#EE4D2D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          S
                        </div>
                        <div>
                          <div className="font-label-md text-label-md font-bold text-on-surface">
                            ShopeePay
                          </div>
                          <div className="font-label-sm text-label-sm text-secondary">
                            Voucher tích lũy
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Method 3: Card */}
              <div
                className={`rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                  selectedMethod === 'card'
                    ? 'border-primary/40 bg-surface-container-low shadow-sm'
                    : 'border-transparent bg-surface-bright'
                }`}
              >
                <label
                  onClick={() => setSelectedMethod('card')}
                  className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-space-md">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'card'}
                      readOnly
                      className="w-4 h-4 text-primary accent-primary cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Thẻ quốc tế Visa / MasterCard / JCB
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Bảo vệ qua cổng 3D Secure OTP ngân hàng
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-on-surface-variant">
                    credit_card
                  </span>
                </label>

                {selectedMethod === 'card' && (
                  <div className="p-space-md md:p-space-lg bg-surface-container-lowest border-t border-surface-container-high flex flex-col gap-space-md animate-fadeIn">
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-md text-label-md text-on-surface font-semibold">
                        Số thẻ
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="4123 4567 8901 2345"
                          className="w-full h-10 px-space-md rounded-lg bg-surface font-tabular-data text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:bg-surface-container-low transition-all border border-surface-container-highest"
                        />
                        <div className="absolute right-space-md top-1/2 -translate-y-1/2 flex items-center gap-1 text-secondary">
                          <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-md text-label-md text-on-surface font-semibold">
                          Hạn thẻ (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          className="w-full h-10 px-space-md rounded-lg bg-surface font-tabular-data text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:bg-surface-container-low transition-all border border-surface-container-highest"
                        />
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                          <span>Mã bảo mật CVV</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                            3 chữ số sau thẻ
                          </span>
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          className="w-full h-10 px-space-md rounded-lg bg-surface font-tabular-data text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:bg-surface-container-low transition-all border border-surface-container-highest"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Method 4: COD */}
              <div
                className={`rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                  selectedMethod === 'cod'
                    ? 'border-primary/40 bg-surface-container-low shadow-sm'
                    : 'border-transparent bg-surface-bright'
                }`}
              >
                <label
                  onClick={() => setSelectedMethod('cod')}
                  className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-space-md">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'cod'}
                      readOnly
                      className="w-4 h-4 text-primary accent-primary cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Trả tiền mặt trực tiếp cho đối tác giao nhận khi kiểm tra đồ uống
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[24px]">
                    payments
                  </span>
                </label>

                {selectedMethod === 'cod' && (
                  <div className="p-space-md bg-surface-container-lowest border-t border-surface-container-high animate-fadeIn">
                    <div className="p-space-sm bg-surface rounded-lg text-on-surface-variant font-body-sm text-body-sm flex items-start gap-space-sm border border-surface-container-high">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                        info
                      </span>
                      <span>
                        Tài xế Aura Express sẽ mang theo tiền lẻ trả lại. Vui lòng giữ liên lạc điện thoại khi đơn hàng được giao.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-around py-space-sm text-on-surface-variant text-label-sm font-label-sm border-t border-surface-container-high">
              <div className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                <span>Thanh toán an toàn 100%</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">history</span>
                <span>Hoàn tiền tự động nếu hủy đơn</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">support_agent</span>
                <span>Hotline: 1900 6868</span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Official Electronic Bill Preview (5 cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md md:p-space-lg relative overflow-hidden flex flex-col border border-surface-container-high">
              {/* Decorative Top Header */}
              <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[22px]">local_cafe</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                      Aura Café
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                      Hóa đơn điện tử e-Bill
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Mã đơn đặt hàng
                  </span>
                  <span className="font-tabular-data text-tabular-data text-headline-sm text-primary font-bold">
                    #AUR-89241
                  </span>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-space-xs py-space-sm bg-surface-bright px-space-md rounded-lg my-space-sm font-body-sm text-body-sm border border-surface-container-high">
                <div className="flex flex-col">
                  <span className="text-on-surface-variant">Thời gian xuất:</span>
                  <span className="font-tabular-data font-medium text-on-surface">
                    24/10/2024 09:45
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-on-surface-variant">Chi nhánh pha chế:</span>
                  <span className="font-medium text-on-surface">28 Phố Tràng Tiền</span>
                </div>
                <div className="flex flex-col mt-space-xs">
                  <span className="text-on-surface-variant">Khách hàng:</span>
                  <span className="font-medium text-on-surface">Nguyễn Văn An</span>
                </div>
                <div className="flex flex-col mt-space-xs">
                  <span className="text-on-surface-variant">Số điện thoại:</span>
                  <span className="font-tabular-data font-medium text-on-surface">
                    0908 123 456
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="flex flex-col my-space-xs divide-y divide-surface-container">
                <div className="flex justify-between py-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  <span>Món / Dịch vụ</span>
                  <span className="text-right">Thành tiền</span>
                </div>

                <div className="flex items-start justify-between py-space-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface">
                        01
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Cà phê Muối Aura
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant ml-7">
                      Size M • Ít ngọt (50%) • Kem béo đặc biệt
                    </span>
                  </div>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                    55.000 đ
                  </span>
                </div>

                <div className="flex items-start justify-between py-space-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface">
                        02
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Trà Sen Vàng
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant ml-7">
                      Size L • Đá riêng • Hạt sen ninh mềm
                    </span>
                  </div>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                    144.000 đ
                  </span>
                </div>

                <div className="flex items-start justify-between py-space-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface">
                        01
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Bánh Basque nướng
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant ml-7">
                      Phô mai cháy chuẩn vị Tây Ban Nha
                    </span>
                  </div>
                  <span className="font-tabular-data text-tabular-data font-medium text-on-surface">
                    52.000 đ
                  </span>
                </div>
              </div>

              {/* Calculations */}
              <div className="flex flex-col gap-space-xs py-space-sm my-space-xs bg-surface-container-low px-space-md rounded-lg border border-surface-container-high">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Tạm tính đồ uống & bánh:</span>
                  <span className="font-tabular-data text-on-surface">251.000 đ</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Phí vận chuyển nội thành:</span>
                  <span className="font-tabular-data text-on-surface">18.000 đ</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-primary font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">sell</span>
                    Mã giảm WELCOME50K:
                  </span>
                  <span className="font-tabular-data">-50.000 đ</span>
                </div>

                {deductPoints && (
                  <div className="flex justify-between font-body-sm text-body-sm text-tertiary font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      Đổi 450 điểm Aura:
                    </span>
                    <span className="font-tabular-data">-45.000 đ</span>
                  </div>
                )}

                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant pt-space-xs">
                  <span className="text-xs">VAT đã tính (8%):</span>
                  <span className="font-tabular-data text-xs text-secondary">16.222 đ</span>
                </div>
              </div>

              {/* Total Due */}
              <div className="flex items-baseline justify-between pt-space-md mb-space-md">
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface block font-bold">
                    Tổng thanh toán
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Đã bao gồm thuế và phí dịch vụ
                  </span>
                </div>
                <div className="font-display-lg text-display-lg text-primary font-bold font-tabular-data tracking-tight">
                  {formatPrice(finalAmount)}
                </div>
              </div>

              {/* Actions & CTA Buttons */}
              <div className="flex flex-col gap-space-sm mt-auto">
                <button
                  type="button"
                  onClick={handleConfirmPaid}
                  className="w-full h-12 bg-primary hover:bg-[#982126] text-white rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md transition-all cursor-pointer font-semibold"
                >
                  <span>Xác nhận đã thanh toán</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                <div className="grid grid-cols-2 gap-space-sm">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="h-10 rounded-lg bg-surface hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors cursor-pointer border border-surface-container-highest"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    <span>In hóa đơn PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      alert('Đã tải hóa đơn điện tử e-Bill #AUR-89241 về máy của bạn!')
                    }
                    className="h-10 rounded-lg bg-surface hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors cursor-pointer border border-surface-container-highest"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Tải e-Bill</span>
                  </button>
                </div>
              </div>

              {/* Footnote */}
              <div className="mt-space-md pt-space-sm text-center border-t border-surface-container">
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                  Aura Specialty Coffee JSC • Tra cứu tại invoice.auracafe.vn
                </span>
              </div>
            </div>

            {/* Note prompt */}
            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container-high">
              <span className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">coffee_maker</span>
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Cần ghi chú pha chế thêm?
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Bạn có thể nhắn trực tiếp với Barista sau khi thanh toán thành công.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
