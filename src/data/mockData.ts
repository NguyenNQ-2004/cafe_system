import { Product, CartItem, PastOrder, FeedbackTicket, UserProfile } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato Đặc Sản',
    category: 'espresso',
    categoryLabel: 'Cà phê máy',
    price: 55000,
    originalPrice: 65000,
    description: 'Lớp sữa tươi nóng thanh dịu, quyện cùng espresso kép Arabica Cầu Đất đậm đà và sốt caramel béo ngậy.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh1blp0OJtTBg6t2YOb85pGuV06Ha2Dx1McCmRpWz8p60D0XXL0ZyEnyn6iL54Y-M26gqRB65M3QxMHCfLJUu8BjEkouJfCPMU3EkrwBXRGFTn6MgjkHs7xf0wWmuS5BVLVXxCg8898XU1IgOhgJNhGoh9M0GPVoXlNtNKK8DbNLje4OUGeWxc6pbte11ePDnFvhU-vA3rAKuiy0qHJjeJVc-vW9Z16XESFvV4wn9SpRAe66DpKhEe',
    tag: 'Bán chạy',
    tagType: 'bestseller',
    badge: 'Espresso Base',
    popularity: 98,
    sensoryProfile: { body: 85, creaminess: 90, sweetness: 75 },
    details: {
      beans: 'Arabica Cầu Đất & Bourbon',
      cream: 'Sốt Caramel mặn nấu thủ công',
      extraction: 'Double Espresso Máy Ý',
      temperature: 'Uống nóng hoặc đá'
    }
  },
  {
    id: 'ca-phe-muoi',
    name: 'Cà Phê Muối Aura Đặc Biệt',
    category: 'traditional',
    categoryLabel: 'Cà phê truyền thống',
    price: 45000,
    originalPrice: 55000,
    description: 'Fine Robusta ủ phin truyền thống phối kem sữa mặn bồng bềnh ngậy béo, cân bằng hậu vị đậm sâu.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwDSsJzj_FX1DItKp-OAol0pPF3KrOEV2MfVs9eC5xVHNiUTcmhbV-CvDgV61XWXanuS92KIH2fpcGa-ohQ1WPmZdVSYpDbo3KTRhSoHO9qSBRPOSn-0tGvWIhwj7grAwmdUkMJwYxsp1srYvILqhTZmdMMkh-6R4f5ZsSLHjhZLegkjey9LrfD0TKRugRdgyCtlT1qdTgNArWOfVbH88PlHV4Syp2qosPRKwAJpSPaINOgoTN9pcP',
    tag: 'Bán chạy',
    tagType: 'bestseller',
    badge: 'Phin Cổ Điển',
    popularity: 99,
    sensoryProfile: { body: 90, creaminess: 85, sweetness: 70 },
    details: {
      beans: 'Cầu Đất & Buôn Ma Thuột',
      cream: 'Muối Hồng Himalaya',
      extraction: 'Phin Kép Áp Lực',
      temperature: 'Uống lạnh chuẩn vị'
    }
  },
  {
    id: 'oatmilk-flat-white',
    name: 'Oatmilk Flat White Úc',
    category: 'espresso',
    categoryLabel: 'Cà phê máy',
    price: 60000,
    originalPrice: 70000,
    description: 'Nhân đôi Ristretto Cầu Đất hòa quyện cùng sữa yến mạch cao cấp nhập khẩu, lớp micro-foam siêu mượt.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMNfmtF8tpLxry3W6O1K22sX9wWuEWnRNpUcWWaHtyNt6xRsELSijWn3sSTJLmDAyl6m13KIHFFCYlKuvMbwmmnbEefj7V-rzCzVh_y6jc52Yken26pd8sm7CpYY3q4cvtro5E7yoPJ4SK1FoRxyj1QHf-a--qQW8lviEEAwqA7-YPMl5kRt--IhTUHQ6KLPa_DghIR0R4MvxEw3ZG71WL4tOVcKx9R5XTg5-djPsVkSn9Us6quCwF',
    tag: 'Món mới',
    tagType: 'new',
    badge: 'Plant-Based',
    popularity: 88,
    sensoryProfile: { body: 80, creaminess: 85, sweetness: 60 }
  },
  {
    id: 'tra-olong-mang-cau',
    name: 'Trà Ô Long Mãng Cầu Nhiệt Đới',
    category: 'tea',
    categoryLabel: 'Trà trái cây',
    price: 50000,
    originalPrice: 58000,
    description: 'Trà Ô long rang mộc Bảo Lộc kết hợp tép mãng cầu tươi chua thanh mát, giải nhiệt tức thì.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhW7J5miBjDcAT4wkDtnrGLtoU_SAR_X6PIpoo8XAEDOaqUvtzropg1WnFxsooDCpyYytpjbz492AKePPGB4pd2JVKHaZd-l9vukDjsQBvqd66_Gv6kDaHJs7XgJxWNb5p-f4-k2Z8RoBmL2xRGzmKRnSo61Ws2dY30vfrDBAWhqGxTyVGSzw_u3u8tKm2EGohFlfIAQGi2dgiuDOsuHBWhI6KRJSMqFxqcuO_2k2Ru5z0CwwkaRNj',
    tag: 'Món mới',
    tagType: 'new',
    badge: 'Fresh Brew',
    popularity: 95,
    sensoryProfile: { body: 65, creaminess: 30, sweetness: 85 }
  },
  {
    id: 'matcha-uji-frappe',
    name: 'Matcha Uji Đá Xay Kem Tươi',
    category: 'iceblended',
    categoryLabel: 'Đá xay & Matcha',
    price: 65000,
    originalPrice: 75000,
    description: 'Bột trà xanh Uji Kyoto hạng tuyển chọn xay nhuyễn cùng sữa Hokkaido béo mát và bông kem tươi vani.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGsRQQUV-Ptb_TBZ22LCtcLGoSBghqdkXZR7S0W0kSBE-6OakAI6BLPTv987j1Sb4u9ttKn2IXb-RI2MtVAa0YQKC2PZhTzphi6_6NAP-adRISUkc-tSNjP1khORkw6_OIxPU53LiYWG2VS3a7IQdRutkb73Sl4op021TEG4g00FL9xXoXUSexR9ALpN-LineLlUB3BI4EwywYdBlhRzTyfpCDFU5eMP4PUId2Woj8cjxdsXRwAM0d',
    tag: 'Bán chạy',
    tagType: 'bestseller',
    badge: 'Uji Kyoto Grade',
    popularity: 93,
    sensoryProfile: { body: 75, creaminess: 95, sweetness: 70 }
  },
  {
    id: 'nau-sai-gon',
    name: 'Cà Phê Sữa Đá Sài Gòn Nâu',
    category: 'traditional',
    categoryLabel: 'Cà phê truyền thống',
    price: 39000,
    originalPrice: 45000,
    description: 'Hạt Fine Robusta rang nâu bóng mượt, chiết xuất phin chậm kết hợp sữa đặc ngọt êm truyền thống.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNA923hW4ZdTqHQM67jbgP-u6wR1l5OfY2DU7ujlzJm-XJJQV5J4dPi86mCwfPTNd8i2z5w97R8Y1Q3_qQmdfTfiVioYq-srbUSbWg2ckP3dnP3dsv22esZSbP4H2CEFh8xTihp7M2Sj8Ax7lACuchd25irhxnYOYceNj54s1HeycVLXXJt93sgGoXuJ7N1pAMY7gcr4XrXuJ62OaBvJrSU7XFSL_4hPQPcYUktok0qCWk7z7Bh8MM',
    badge: 'Đậm Vị Phin',
    popularity: 96,
    sensoryProfile: { body: 95, creaminess: 80, sweetness: 80 }
  },
  {
    id: 'tra-dao-cam-sa',
    name: 'Trà Đào Cam Sả Hoàng Gia',
    category: 'tea',
    categoryLabel: 'Trà trái cây',
    price: 48000,
    originalPrice: 55000,
    description: 'Nước cốt cam vàng tươi ép tay, đào giòn Hy Lạp thơm mọng và tinh dầu sả đun chậm truyền thống.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkcwREN5SbQssWtQaH0Ji5mf3YCbUwW0zITnBgIkrty3ImUAzZCVGa4IC3AUbwmsVE4HsbxsTcL9lhKNX-sxxn_RD56ofchtY3qnpyyjO3uUNnK0IZImsB1o9o2b33vayPKCc-ny--ffqtWSARNjO_LA-DpnqzB_ZDGfviTfRmSIAdxFW6tW705OFGPldSHA6A2LGThjln2KC9QGRGAzgxYjtO1UN-nYX7Kzwv9Cr6rgZJ5gST_D0f',
    badge: 'Trà Đen Ceylon',
    popularity: 91,
    sensoryProfile: { body: 60, creaminess: 20, sweetness: 80 }
  },
  {
    id: 'croissant-bo-phap',
    name: 'Croissant Bơ Pháp Nướng Nóng',
    category: 'bakery',
    categoryLabel: 'Bánh ngọt',
    price: 42000,
    originalPrice: 48000,
    description: 'Bánh sừng bò nướng giòn từng lớp vỏ xốp tơi với 100% bơ lạt nguyên chất nhập khẩu từ vùng Normandie.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN-9e1smxkOR8vzSNNVC92vD4scL_B2aUSgXYVZhHwrtSR27TC14wTk4negvCmHGM50RSqy5FOm2yMX_4Ub6t8EWznfPhtepDGMRmqbuX-rhY-DNwWOzckIR8zDXv7v2CR8_XaRAo1pYGa53HEVseVDvDDEgQH7h20PSvCwT3DtzYbNv4gBtyCCMTIr1vemaLiYK5xnlTAIzv6Eg6XrSajOqsBNw1UbSvVfU32pkTFRithSrYPkEj-',
    tag: 'Bán chạy',
    tagType: 'bestseller',
    badge: 'Bơ Elle & Vire',
    popularity: 94
  },
  {
    id: 'tiramisu-rum',
    name: 'Bánh Tiramisu Mascarpone Rượu Rum',
    category: 'bakery',
    categoryLabel: 'Bánh ngọt',
    price: 58000,
    originalPrice: 68000,
    description: 'Bánh Savoiardi thấm đẫm espresso Aura và rượu rum thơm lừng, xen kẽ kem phô mai Ý mềm tan.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADenqib10vT33TyAhpIdLOESuJrHstSsEv_N1PJoMI9WwuqosaRdVPuXxrwdU-hoZh3VkmjeVlbVE6EDhWxKlUfyJSoDhMrmd6_ZyGpix_umXV5iEuTS1gQ09ZH6kh352W_cY81GsE1XY151sY2eSoMB40oyMBleC-wyLybfk6-sXA-byx98dX3w3Ac3FWVGvrHkmBJPed-KCGAqBLu4Gm3kV62N7B3x0FhbKswrAM33TMm3YdO0Uh',
    tag: 'Món mới',
    tagType: 'new',
    badge: 'Bếp Bánh Mỗi Ngày',
    popularity: 89
  },
  {
    id: 'coldbrew-300ml',
    name: 'Cold Brew Đóng Chai Aura 300ml',
    category: 'bottled',
    categoryLabel: 'Đóng chai',
    price: 68000,
    originalPrice: 78000,
    description: 'Chiết xuất lạnh 100% Arabica Bourbon, hương hoa quả nhiệt đới tươi mát, giữ trọn hương vị đến 7 ngày.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV75TUA1sIf-alLA5iDOoB7_Xn-TDSc_rt0cu4wCUdRw-hcNxN4lGIOkXpHBZyWuob7tbul4zfVsbwH6UY_4PvkUVluwWlhq0a6ANEAi2oXaRavA7lhyDnVgU31kBqznW8bdrVI7u9nfF2maWn0B8a9XJW4vroJQv1LmRW57D9SDH6o2_M3x29iE-R0pZyrVyjNWSok2_7JnpHNwQl0kPYM6xlL67kGwA99e7BdIdUXbVacibTWx1f',
    tag: 'Bán chạy',
    tagType: 'bestseller',
    badge: 'Ủ Lạnh 16 Tiếng',
    popularity: 97,
    sensoryProfile: { body: 80, creaminess: 20, sweetness: 65 }
  },
  {
    id: 'olong-nuong-bottled',
    name: 'Trà Sữa Ô Long Nướng Chai 330ml',
    category: 'bottled',
    categoryLabel: 'Đóng chai',
    price: 55000,
    originalPrice: 62000,
    description: 'Ủ từ lá trà Thiết Quan Âm nướng than hồng thơm khói, hòa quyện sữa tươi New Zealand thanh dịu.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnzACNgJ2dByfkrjCNA8amjcCWJtlCGutKAwGxcKzU47uDPZGPxy8ELiBna4aPuiuyqOEofTU7U_nzcCeuWGnr3GeXSxAP6zdlx0IGCewJ034VE6wK3O_ZskaF2sEZQzKfYwLtmeHm3W3E9Gb_HqocQnuD9BHp_EHlD6_z1xrLglrSinyUjNUqXGenrsr4UmsPKarzKimJgzKlvod3d6zF9wlwa1bfdOf2E57ic0J5fSwOquJPBfjC',
    tag: 'Món mới',
    tagType: 'new',
    badge: 'Lon Tiện Lợi',
    popularity: 87,
    sensoryProfile: { body: 75, creaminess: 85, sweetness: 75 }
  },
  {
    id: 'mocha-cacao-dua',
    name: 'Mocha Cacao Dừa Đá Xay',
    category: 'iceblended',
    categoryLabel: 'Đá xay & Matcha',
    price: 62000,
    originalPrice: 72000,
    description: 'Sốt cacao Bỉ nồng nàn kết hợp cốt dừa non Bến Tre thơm ngậy và espresso shot đậm đà giải nhiệt.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrHyN0xWKO9ZjUlq0fZ_vgwVDjLjBSK_dw3Soww_fTBJ6aunH7yx1iR197nK9QEznq2yfjIF4MgNhq57QcMtActq3B7TdHwDGfq_cEE4toWPHdQ2rS3viFDGaJ2ELFzIBm7uM1R7B0JdO5Owy_T626t_oJP0MC2LAfAkZ0fZaXHHU6ATvDl4skqYGi4w8_z33PRbI8m1uSTNVr0nzti9MZUZu7DsA9L3imXGJaXbB8Tc45gR-vMLqd',
    badge: 'Bến Tre Coconut',
    popularity: 85,
    sensoryProfile: { body: 85, creaminess: 90, sweetness: 70 }
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    cartId: 'cart-1',
    productId: 'ca-phe-muoi',
    name: 'Cà phê Muối Aura Đặc Biệt',
    categoryTitle: 'Signature Drink',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmpTys3KoN-gBpIZ2NHZpRJuTwcv-5IYk5GLa4_0uVM_hhieERDkGhxBxjxrEkep1JSAnjV_4SPCgWBVKnMb6fwivTCsPDIZrULPy7mL5ADYCvY6PIwelzBqc3MDBhcvjIWD8AIfWl4SwKLbsFrj0d1ysYfNX_B5EnxoRyDrgKDFgvdcyO-Ms8_F5cd-FImpqdFCuvDZb5yW0IJIY2nfBTxVlU5v0Ss4rTwrmL4ZtFkSiyLaAxWJKC',
    size: 'M',
    sugar: '50% Đường',
    ice: 'Đá Chuẩn',
    toppings: [{ name: 'Kem Mặn Phô Mai', price: 10000 }],
    note: '',
    unitPrice: 55000,
    quantity: 1,
    checked: true
  },
  {
    cartId: 'cart-2',
    productId: 'tra-sen-vang',
    name: 'Trà Sen Vàng Hạt Sen',
    categoryTitle: 'Trà Thảo Mộc',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx7NKxyGqkROzY1xofhXVyslbVeAmAVClVfT7358gAdn0PasnnuURATjTGV6mLrYVhRCBrqc92TSNb57pb3E270WdsiJseGFk16KGheGuV1N_xIS_gWf3UIoBvfenOQvDskLFP-Fc07GXw_VuSDWMbpzzzrjLJJCxFbunwOw66Hh9w05GaO7yOlW84QNxdy0qRP0hcrGiObdP2GRgKWYAXOr49ie3aAs13gmRrFLYWJi3dbLOc7Xcu',
    size: 'L',
    sugar: '30% Đường',
    ice: 'Ít Đá',
    toppings: [{ name: 'Trân Châu Trắng', price: 10000 }],
    note: 'Củ năng giòn',
    unitPrice: 72000,
    quantity: 2,
    checked: true
  },
  {
    cartId: 'cart-3',
    productId: 'basque-cheesecake',
    name: 'Bánh Phô Mai Cháy Basque',
    categoryTitle: 'Bánh Ngọt Cao Cấp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMBjiJlHQdh2a2KGpo3LTxdF3PTAuLjQclmixYmGeGOdaiGBAMZtNAvlJbZdDl3PrgjXDvRXi-knwFb3zFIXzlxTKAcwAzGyV_j25ku8idERQp25_2jg8zUIt1ZAs0kro9x8nSjz9XlEUgMjPo4uRAazdpl-F0X8THnNkhdU3XJ8gTe0fS2A_hNJZ-_KUts1jhRmLYPOYOqM98lKp4dIjvTjaj4JRAIdvSlJnif0yK8LbiwIFNBHqo',
    size: 'S',
    sugar: 'Tiêu chuẩn',
    ice: 'Không',
    toppings: [],
    note: 'Nướng nóng mới trước khi giao',
    unitPrice: 52000,
    quantity: 1,
    checked: true
  }
];

export const INITIAL_PAST_ORDERS: PastOrder[] = [
  {
    id: '#AUR-86410',
    date: '20/10/2024',
    time: '15:30',
    status: 'completed',
    statusLabel: 'Đã giao thành công',
    total: 116000,
    itemsSummary: '2x Bạc Xỉu Kem Trứng, 1x Bánh Croissant bơ Pháp',
    address: 'Phòng 402, Tòa nhà Techcombank',
    paymentMethod: 'Thẻ Aura Member',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl58P6csTTx1lP0t2GVZTE1GO07mPOd5Q5J8X-oT4qdcxC8KQAnpHzwNVw_11SN-SErSOhnz_KRsUbktcC6PeIrnztSnWvXqN5sYeKVFTh06N0TstTbEUUmPxYAp4jYR6_PI3_0tRz8di4bydxIugVxkiEryUxI_eXLIyt7FwqWBINmWfJoOR2H5WLfQ3jEb4GzkmsMRsTYmykYbk-OhmDBYMLvEvuDGuuLfqT4rYDsamMQM31Ef18'
  },
  {
    id: '#AUR-81209',
    date: '14/10/2024',
    time: '08:20',
    status: 'completed',
    statusLabel: 'Đã giao thành công',
    total: 65000,
    pointsEarned: 65,
    itemsSummary: '1x Cold Brew Cam Quế (Chai thủy tinh 250ml)',
    address: '28 Phố Tràng Tiền (Mang đi)',
    paymentMethod: 'Ví MoMo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJHroFW59KvZSMljfx2ZVFphPRqlYmSzipJaP9GwUbKsgpGD4CAY1CpIvajYcXOPnsJ0JXWaSYckUhxaJR2g_m-c-l_VBU9B-kmX_xt3D13xXHT-Zf1XHX0qCYZ06yXDUbZfjTkkHHF-k2dd2cr4mIMz3x0vh7dWLxtOGBYkRpBqf0xWxTEOKj-vA0aFWtYVXQNvF3sHGBvMLNwUVWoR93SI0fXYB_QAeQlK3XWn5ECI7NcirOZqJG'
  },
  {
    id: '#AUR-79012',
    date: '02/10/2024',
    time: '11:15',
    status: 'canceled',
    statusLabel: 'Đã hủy theo yêu cầu',
    total: 0,
    refundedAmount: 145000,
    cancelReason: 'Khách đổi lịch họp đột xuất. Hoàn tiền 100% (145.000₫) về Ví MoMo hoàn tất lúc 11:18.',
    itemsSummary: '1x Pour Over Geisha Panama, 1x Tiramisu Cacao',
    address: 'Toà nhà Saigon Centre, Q.1',
    paymentMethod: 'Ví MoMo',
    image: ''
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Nguyễn Văn An',
  phone: '0908 123 456',
  email: 'van.an.nguyen@example.com',
  birthday: '1995-10-24',
  gender: 'male',
  address: 'Tháp Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
  tier: 'Gold',
  memberId: '#AURA-9981',
  points: 450,
  joinDate: 'Tháng 11/2022',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA47zxKEAqFqEBTnyBgtFjeWtHO7HcXWwiSbBBBbLGWZhodkAKsrDFRDbXZAcJI7zooG2v-HuF6lzqEigFehLsPtiWn4LjTjYz6qjW_txx0fp7Bx0gCBf2grNXxxMtpi437KGbJvBGfsaCHIQyhPS061qSk6oNBxXWyLSKYbsXnaS_HWtc5hbijtu-8pQ5P6EREeuUAZrj0TSey8vw23XgtmiCLyL-BdW5k3gQYiid9_5r6ROkzapPA',
  twoFactorEnabled: true
};

export const INITIAL_FEEDBACK_TICKETS: FeedbackTicket[] = [
  {
    id: '#FB-2024-089',
    orderId: '#AUR-86410',
    title: 'Giao sai size ly từ L xuống M',
    createdAt: '14:45 - 20/10/2024',
    status: 'processing',
    statusLabel: 'Đang xử lý',
    progressPercent: 65,
    agentName: 'Thu Hà',
    agentNote: 'Chuyên viên CSKH Thu Hà đang kiểm tra camera quầy đóng gói Chi nhánh Tràng Tiền để làm rõ sự sai lệch kích cỡ ly.'
  },
  {
    id: '#FB-2024-042',
    orderId: '#AUR-78219',
    title: 'Thiếu ống hút và khăn giấy',
    createdAt: '16/10/2024',
    status: 'resolved',
    statusLabel: 'Đã giải quyết xong',
    progressPercent: 100,
    resolution: 'Aura chân thành xin lỗi quý khách về sự bất tiện trên. Cửa hàng đã kiểm điểm khâu kiểm tra trước khi bàn giao cho shipper và xin gửi tặng 300 điểm thưởng trực tiếp vào tài khoản Aura Rewards của bạn.',
  }
];

export const CROSS_SELL_PASTRIES = [
  {
    id: 'croissant-co-dien',
    name: 'Croissant Bơ Pháp Cổ Điển',
    desc: 'Nướng mới mỗi 2 giờ với bơ Isigny',
    price: 38000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBokxXX9sCOiczGr2g1FqYy7QaxRFvP1GWeOkBLYwKq2KUHIXxN1jaFq20n-PUUxglq5ZNaXRLY0CuAbRpF2xSKTlpgTwIkRuQSAxN8o8SKOEaveoiq7Jf0rWpS6Phe0YtG_qhVk9jTfsooXmxNqaIf2XXL4O-l13d5ddacIAdhzPKLpHYfr1FjSJvzV49ht13ZB9IZYV4JrwWPo9caA_Ui6EhmWMm98zmWi6I7mKvskjoTBHpOG30h',
    badge: 'Nóng giòn'
  },
  {
    id: 'basque-burnt-cheesecake',
    name: 'Bánh Phô Mai Cháy Basque',
    desc: 'Ngậy béo nhẹ, cân bằng vị cà phê muối',
    price: 52000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5pR-KS7FfOTqngq-gXyLWX1shnhzaIRl7vennyr2YgVCPbXabV6dcJd61ZtsCP8zzTha1S6QdpVX3zIoB0vZwOuyGGTxGEQXXAqRlAPJmgDNd4L3wSiS1g2h3_erFnj5Cd1rwskzAurOxIAd7bq9GrCDZXH46pBwIMyTUrPXqqarm3sikZHVbaf7UaL9LmE38moKH69b-2RtnjFcIBOH1NtWIFTFs42Rek0k_f4iQE0joZN3JpLhI',
    badge: 'Top Match'
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    desc: 'Nhân thanh sô-cô-la Bỉ 70%',
    price: 42000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYH9ECTjcoHOQ7vsKXwjKSuDKRIcU8Z9eKp6q9tdaRFU_K-vs7u3xuUzDFFIMUwbqlvUitof_aA-KpyaN5uKhEoua8Y2LszH6YmugShekHlpFCJa4E4Xl12DRXJjbOssQ92lPip2gybDY_l7qnHdgk2feXBGnviTxMecscKIeYLCGF_V6esBgqVoOGNJvdEpfY8TMN-MQRWmZws2M4bpxXu3BCTQQBrBmSdzKj4sDfrjgWUS3mcIZM'
  },
  {
    id: 'mille-crepe-matcha',
    name: 'Mille Crepe Matcha Uji',
    desc: '20 lớp bánh mỏng mịn thơm ngát',
    price: 58000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZGCymRvT20RdqBlyUhGruzdwtXISqfXIwcuRcc6Cuns9I9JgDNIReHq-Nwz7v25UFJgNI6gJmVhew6bXHf9wqyn3FzzkNtKSzGGfvzz__Hx385CKL71sGS94QhDagP6QsgsexYWO8DsEZP9P7GguhpGJfWItYc7HiumhLWn2JYxLKHns5qMGjin-UISWUqMuGjEHU0XvPxbJqxlOobOnMvkQylBOMgU29jayQM6Bi35r1Qnys2Xad'
  }
];
