import type { LandingConfig } from "@/lib/landing.types";

const vang: LandingConfig = {
  meta: {
    slug: "vang",
    title: "Aurum — Đầu tư vàng thông minh, sinh lời bền vững",
    description:
      "Aurum là nền tảng đầu tư vàng kỹ thuật số hàng đầu — mua, lưu trữ và tăng trưởng tài sản vàng của bạn với sự an toàn và minh bạch tuyệt đối.",
  },
  theme: {
    primary: "212 175 55",   // classic gold
    primaryFg: "10 8 4",
    bg: "10 8 4",            // deep warm black
    surface: "22 17 8",      // dark warm surface
    fg: "245 232 200",       // warm white
    muted: "155 138 100",    // muted gold
    border: "48 37 14",      // dark gold border
    mode: "dark",
    radius: "0.85rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Nền tảng vàng kỹ thuật số #1 Việt Nam",
      title: "Vàng thật. Lợi nhuận thật. An toàn thật.",
      subtitle:
        "Aurum biến đầu tư vàng trở nên đơn giản như chuyển tiền — mua theo gram, lưu trữ có bảo hiểm, và theo dõi tài sản của bạn 24/7 ngay trên điện thoại.",
      actions: [
        { label: "Bắt đầu miễn phí", href: "#pricing", variant: "primary" },
        { label: "Xem demo", href: "#features", variant: "secondary" },
      ],
      note: "Không phí ẩn · Bảo hiểm 100% tài sản · Rút tiền trong 24h",
    },
    {
      type: "stats",
      items: [
        { value: "85,000+", label: "Nhà đầu tư tin dùng" },
        { value: "2,400 tỷ", label: "Tổng tài sản quản lý" },
        { value: "99.97%", label: "Uptime hệ thống" },
        { value: "4.8★", label: "Đánh giá ứng dụng" },
      ],
    },
    {
      type: "features",
      eyebrow: "Tại sao chọn Aurum",
      title: "Mọi thứ bạn cần để đầu tư vàng hiệu quả",
      subtitle:
        "Từ mua vàng theo gram đến phân tích thị trường chuyên sâu — Aurum trang bị cho bạn đầy đủ công cụ của một nhà đầu tư chuyên nghiệp.",
      columns: 3,
      items: [
        {
          icon: "ShieldCheck",
          title: "Bảo mật đa lớp",
          description:
            "Vàng thật được lưu trữ tại kho tiêu chuẩn quốc tế, có bảo hiểm đầy đủ. Tài khoản bảo vệ bằng xác thực 2 yếu tố và mã hóa AES-256.",
        },
        {
          icon: "TrendingUp",
          title: "Biểu đồ giá thời gian thực",
          description:
            "Theo dõi giá vàng trong nước và quốc tế theo thời gian thực. Cảnh báo giá tức thì để bạn không bỏ lỡ cơ hội mua vào tốt nhất.",
        },
        {
          icon: "Coins",
          title: "Mua từ 0.01 gram",
          description:
            "Không cần vốn lớn để bắt đầu. Tích lũy vàng dần dần từ số tiền nhỏ và hưởng lợi từ chiến lược DCA (mua theo định kỳ).",
        },
        {
          icon: "Repeat",
          title: "Tự động tích lũy",
          description:
            "Thiết lập lệnh mua vàng tự động hàng tuần hoặc hàng tháng. Kỷ luật tài chính không cần nỗ lực — hệ thống làm thay bạn.",
        },
        {
          icon: "Wallet",
          title: "Rút vàng hoặc tiền mặt",
          description:
            "Chuyển đổi vàng thành tiền mặt trong vòng 24 giờ, hoặc yêu cầu giao vàng vật chất tận nhà với gói Premium.",
        },
        {
          icon: "BarChart3",
          title: "Phân tích danh mục",
          description:
            "Dashboard trực quan hiển thị lợi nhuận, tỷ trọng tài sản và lịch sử giao dịch. Báo cáo thuế xuất file một cú nhấp.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Khách hàng nói gì",
      title: "Hàng nghìn nhà đầu tư đã chọn Aurum",
      items: [
        {
          quote:
            "Trước đây tôi sợ đầu tư vàng vì không biết cất giữ ở đâu cho an toàn. Aurum giải quyết hoàn toàn nỗi lo đó — vàng được bảo hiểm, tôi chỉ việc mua và theo dõi danh mục.",
          author: "Nguyễn Minh Tú",
          role: "Kỹ sư phần mềm, TP.HCM",
        },
        {
          quote:
            "Tính năng mua tự động hàng tuần giúp tôi tích lũy được hơn 50 gram vàng trong 2 năm mà không cần nghĩ nhiều. Đây là cách tiết kiệm thông minh nhất tôi từng thử.",
          author: "Trần Thị Lan Anh",
          role: "Chủ doanh nghiệp nhỏ, Hà Nội",
        },
        {
          quote:
            "Biểu đồ và công cụ phân tích của Aurum rất chuyên nghiệp. Lần đầu tiên tôi cảm thấy mình thực sự hiểu thị trường vàng và đưa ra quyết định có cơ sở.",
          author: "Lê Hoàng Phúc",
          role: "Quản lý tài chính, Đà Nẵng",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Bảng giá",
      title: "Gói đầu tư phù hợp cho mọi nhu cầu",
      subtitle: "Bắt đầu miễn phí. Nâng cấp khi danh mục của bạn tăng trưởng.",
      tiers: [
        {
          name: "Cơ bản",
          price: "Miễn phí",
          description: "Dành cho người mới bắt đầu tích lũy vàng.",
          features: [
            "Mua / bán vàng từ 0.01g",
            "Giá thời gian thực",
            "Bảo hiểm tài sản 100%",
            "Ứng dụng iOS & Android",
          ],
          cta: { label: "Đăng ký ngay", href: "#", variant: "secondary" },
        },
        {
          name: "Tích lũy",
          price: "49.000đ",
          period: "/tháng",
          description: "Dành cho nhà đầu tư nghiêm túc muốn tối ưu lợi nhuận.",
          featured: true,
          features: [
            "Tất cả tính năng Cơ bản",
            "Mua tự động theo lịch",
            "Cảnh báo giá tức thì",
            "Phân tích danh mục nâng cao",
            "Ưu tiên hỗ trợ 24/7",
            "Phí giao dịch giảm 30%",
          ],
          cta: { label: "Dùng thử 30 ngày", href: "#", variant: "primary" },
        },
        {
          name: "Cao cấp",
          price: "199.000đ",
          period: "/tháng",
          description: "Dành cho nhà đầu tư và doanh nghiệp có nhu cầu cao.",
          features: [
            "Tất cả tính năng Tích lũy",
            "Giao vàng vật chất tận nhà",
            "Tài khoản đa thành viên",
            "API tích hợp hệ thống",
            "Báo cáo thuế tự động",
            "Quản lý tài sản chuyên biệt",
          ],
          cta: { label: "Liên hệ tư vấn", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "Câu hỏi thường gặp",
      title: "Giải đáp mọi thắc mắc của bạn",
      items: [
        {
          question: "Vàng trên Aurum có phải vàng thật không?",
          answer:
            "Có. Mỗi gram vàng kỹ thuật số trên Aurum được đảm bảo bằng vàng vật chất tương ứng lưu trữ tại kho tiêu chuẩn LBMA. Bạn có thể yêu cầu kiểm toán độc lập bất kỳ lúc nào.",
        },
        {
          question: "Tiền và vàng của tôi có được bảo hiểm không?",
          answer:
            "Toàn bộ tài sản vàng được bảo hiểm 100% bởi hợp đồng bảo hiểm với đối tác hàng đầu. Tiền mặt trong tài khoản chờ giao dịch được bảo vệ theo quy định của Ngân hàng Nhà nước.",
        },
        {
          question: "Mất bao lâu để rút tiền về tài khoản ngân hàng?",
          answer:
            "Với gói Cơ bản và Tích lũy, lệnh bán vàng được khớp ngay và tiền về tài khoản trong 24 giờ làm việc. Gói Cao cấp được ưu tiên xử lý trong 4 giờ.",
        },
        {
          question: "Aurum tính phí giao dịch như thế nào?",
          answer:
            "Gói Cơ bản áp dụng phí 0.5% mỗi giao dịch mua/bán. Gói Tích lũy giảm còn 0.35%, Gói Cao cấp còn 0.2%. Không có phí lưu trữ, phí nạp tiền hay phí ẩn nào khác.",
        },
      ],
    },
    {
      type: "cta",
      title: "Sẵn sàng để vàng làm việc cho bạn?",
      subtitle:
        "Tham gia cùng hơn 85,000 nhà đầu tư đang tích lũy tài sản bền vững với Aurum. Bắt đầu với bất kỳ số tiền nào — ngay hôm nay.",
      actions: [
        { label: "Mở tài khoản miễn phí", href: "#", variant: "primary" },
        { label: "Xem hướng dẫn", href: "#features", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Aurum",
      tagline: "Nền tảng đầu tư vàng kỹ thuật số — an toàn, minh bạch, sinh lời.",
      columns: [
        {
          heading: "Sản phẩm",
          links: [
            { label: "Tính năng", href: "#features" },
            { label: "Bảng giá", href: "#pricing" },
            { label: "Câu hỏi thường gặp", href: "#" },
          ],
        },
        {
          heading: "Công ty",
          links: [
            { label: "Giới thiệu", href: "#" },
            { label: "Tin tức", href: "#" },
            { label: "Tuyển dụng", href: "#" },
          ],
        },
        {
          heading: "Pháp lý",
          links: [
            { label: "Chính sách bảo mật", href: "#" },
            { label: "Điều khoản dịch vụ", href: "#" },
          ],
        },
      ],
      legal:
        "© 2026 Aurum Technologies JSC. Đây là sản phẩm minh họa (fictional demo). Không phải lời khuyên đầu tư.",
    },
  ],
};

export default vang;
