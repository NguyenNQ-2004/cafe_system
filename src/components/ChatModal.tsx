import React, { useState } from 'react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName?: string;
  orderId?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  driverName = 'Lê Minh Trí',
  orderId = '#AUR-89241'
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    {
      sender: 'driver',
      text: 'Chào anh An! Em nhận đơn #AUR-89241 từ Tràng Tiền rồi ạ. Em đang đợi bar đóng nắp chống tràn rồi sẽ chạy ngay!',
      time: '09:49'
    },
    {
      sender: 'user',
      text: 'Chào bạn, nhớ lấy giúp mình ống hút cỏ và túi giữ nhiệt nhé!',
      time: '09:51'
    },
    {
      sender: 'driver',
      text: 'Dạ vâng anh yên tâm, cửa hàng đã cho vào túi zip nhôm giữ nhiệt và kèm đủ ống hút ạ.',
      time: '09:52'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    // Mock driver reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'driver',
          text: 'Dạ em ghi nhận rồi ạ! Em đang trên đường qua 14 Ngô Quyền, khoảng 10 phút nữa em tới chân toà nhà.',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="bg-primary p-space-md text-white flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmUgmUv3j4KSwytL_Lh9lNeLZ6X0m2N3-uGGf15qjde5_iiKOFeSIa2A_h5n_alyVG4A1Wd_ZRN0K47v9dclayuQgHM_HKwULEY_X20kr5Or7LRnDlmpf66-eHNNY6KmFoXb8Um32Umv4871RA3-xqloFW40BpPlc9uW6dIyP_XSCyX0tXbnvmqzIXnsSA1dWJk6hGn_DWH8VgexjnDLvrvNVwQx90uVfbchFn308pMR22dA45T0e2"
                alt="Driver"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-semibold">{driverName}</span>
              <span className="font-label-sm text-label-sm text-on-primary-container">
                Tài xế Aura Express • Đơn {orderId}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-space-md overflow-y-auto space-y-space-sm bg-surface">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-space-sm px-space-md rounded-2xl text-body-md ${
                  m.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-surface-container-lowest text-on-surface shadow-sm rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-secondary mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="px-space-md py-2 bg-surface-container-low flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setInputVal('Bạn tới nơi vui lòng gọi mình nhé')}
            className="px-2.5 py-1 bg-surface-container-lowest rounded-full text-xs text-on-surface hover:text-primary whitespace-nowrap shadow-sm"
          >
            + Gọi khi đến
          </button>
          <button
            onClick={() => setInputVal('Gửi bảo vệ tầng hầm giúp mình')}
            className="px-2.5 py-1 bg-surface-container-lowest rounded-full text-xs text-on-surface hover:text-primary whitespace-nowrap shadow-sm"
          >
            + Gửi bảo vệ B1
          </button>
          <button
            onClick={() => setInputVal('Cho mình xin thêm ống hút nhé')}
            className="px-2.5 py-1 bg-surface-container-lowest rounded-full text-xs text-on-surface hover:text-primary whitespace-nowrap shadow-sm"
          >
            + Thêm ống hút
          </button>
        </div>

        {/* Input bar */}
        <form onSubmit={handleSend} className="p-space-sm bg-surface-container-lowest border-t border-surface-container-high flex gap-space-sm">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Nhập tin nhắn gửi tài xế..."
            className="flex-1 h-10 px-space-md rounded-lg bg-surface border border-surface-container-highest text-on-surface text-body-md focus:outline-none focus:border-primary-container"
          />
          <button
            type="submit"
            className="h-10 px-space-md bg-primary-container hover:bg-primary text-white rounded-lg flex items-center justify-center gap-1 font-label-md cursor-pointer transition-colors"
          >
            <span>Gửi</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
