import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Calendar, Award, BookOpen, Music, Activity, 
  ChevronRight, X, ExternalLink, Users, Star, 
  Trophy, Globe, Code, Clock, AlertCircle, Calculator, BarChart3,
  Sparkles, GraduationCap, Play, ArrowRight
} from 'lucide-react';
import ResourcesBanner from '@/components/ResourcesBanner';
import { Button } from '@/components/ui/button';

// --- DỮ LIỆU CUỘC THI: CẬP NHẬT NGÀY 13/12/2025 ---
const competitionsData = [
  // --- NHÓM 1: HỌC THUẬT ---
  {
    id: 101,
    name: "Violympic Quốc Gia",
    year: "2025-2026",
    category: "academic",
    organizer: "Bộ GD&ĐT & FPT",
    status: "Vòng Tự luyện",
    statusType: "active",
    color: "blue",
    icon: "globe",
    logo: "https://violympic.vn/assets/images/logo.png",
    description: "Cuộc thi giải toán, tiếng Việt, vật lý... qua mạng internet dành cho học sinh phổ thông.",
    rankingUrl: "https://violympic.vn/bang-xep-hang",
    details: {
      target: "Học sinh lớp 1 - 12",
      schedule: [
        { phase: "Vòng Tự luyện", time: "09/2025 - 12/2025 (Đang mở)" },
        { phase: "Cấp Trường", time: "Tháng 01/2026" },
        { phase: "Cấp Quận/Huyện", time: "Tháng 02/2026" },
        { phase: "Cấp Tỉnh", time: "Tháng 03/2026" },
        { phase: "Chung kết QG", time: "Tháng 04/2026" }
      ],
      format: "Thi trực tuyến trên máy tính. 30 phút/vòng thi. Đề thi thích ứng.",
      highlight: "Năm nay tiếp tục duy trì các môn Toán, Toán Tiếng Anh, Tiếng Việt, Sử-Địa.",
      website: "https://violympic.vn"
    }
  },
  {
    id: 108,
    name: "VioEdu - Đấu trường Khu vực",
    year: "2025-2026",
    category: "academic",
    organizer: "VioEdu",
    status: "Vòng Sơ loại",
    statusType: "active",
    color: "blue",
    icon: "globe",
    logo: "https://vt-cdn.vio.edu.vn/assets/img/logo.png",
    description: "Hệ sinh thái học tập & thi đấu trực tuyến với đấu trường khu vực toàn quốc dành cho học sinh tiểu học.",
    rankingUrl: "https://vio.edu.vn/bang-xep-hang",
    details: {
      target: "Học sinh Tiểu học (Khối 1-5)",
      schedule: [
        { phase: "Vòng sơ loại", time: "Tháng 10/2025 - 01/2026 (Đang diễn ra)" },
        { phase: "Chung kết Khu vực", time: "Tháng 02-03/2026" },
        { phase: "Trao giải", time: "Tháng 04/2026" }
      ],
      format: "Thi trực tuyến qua ứng dụng VioEdu. Các môn: Toán, Tiếng Việt, Tiếng Anh.",
      highlight: "Đấu trường theo địa phương (An Giang, TP.HCM...). Vinh danh top học sinh xuất sắc từng khu vực.",
      website: "https://vio.edu.vn"
    }
  },
  {
    id: 102,
    name: "Olympic Tiếng Anh (IOE)",
    year: "2025-2026",
    category: "academic",
    organizer: "Bộ GD&ĐT & VTC",
    status: "Sắp thi Cấp Huyện",
    statusType: "urgent",
    color: "blue",
    icon: "globe",
    logo: "https://ioe.vn/assets_new/images/logo_ioe.png",
    description: "Cuộc thi tiếng Anh trực tuyến quy mô lớn nhất Việt Nam.",
    rankingUrl: "https://ioe.vn/bang-xep-hang",
    details: {
      target: "Học sinh lớp 3 - 12",
      schedule: [
        { phase: "Vòng Tự luyện", time: "08/2025 - 12/2025 (Đang mở)" },
        { phase: "Thi Cấp Huyện", time: "10-12/01/2026" },
        { phase: "Thi Cấp Tỉnh", time: "22-24/02/2026" },
        { phase: "Thi Cấp Quốc gia", time: "Tháng 04/2026" }
      ],
      format: "200 câu hỏi trắc nghiệm trong 30 phút (Nghe - Đọc - Ngữ pháp).",
      highlight: "Học sinh cần vượt qua vòng tự luyện số 20 mới đủ điều kiện thi cấp Quận.",
      website: "https://ioe.vn"
    }
  },
  {
    id: 109,
    name: "Thiếu nhi VN - Vươn ra Thế giới",
    year: "2025-2026",
    category: "academic",
    organizer: "Hội đồng Đội TW & VTC",
    status: "Vòng 1 đang diễn ra",
    statusType: "active",
    color: "blue",
    icon: "globe",
    logo: "https://edu.go.vn/vuon-ra-the-gioi/static/media/logo.a0d4b3c5.png",
    description: "Chương trình thi tiếng Anh giúp thiếu nhi giới thiệu văn hóa Việt Nam ra thế giới.",
    rankingUrl: "https://edu.go.vn/vuon-ra-the-gioi/bang-xep-hang",
    details: {
      target: "Thiếu nhi 6-10 tuổi (Lớp 1-5)",
      schedule: [
        { phase: "Vòng 1 - Cấp Trường", time: "01/12 - 31/12/2025 (Đang thi)" },
        { phase: "Vòng 2 - Cấp Tỉnh", time: "20/01/2026 - 28/02/2026" },
        { phase: "Vòng 3 - Cấp Khu vực", time: "20/03/2026 - 30/04/2026" },
        { phase: "Chung kết Toàn quốc", time: "Tháng 05-06/2026" }
      ],
      format: "Vòng 1: 5 bài thi trực tuyến trên IOE.vn. Vòng 2-4: Quay video thuyết trình và thi trực tiếp.",
      highlight: "Tích hợp học tập trên Betia English. Thi đua giới thiệu văn hóa Việt bằng tiếng Anh.",
      website: "https://edu.go.vn/vuon-ra-the-gioi"
    }
  },
  {
    id: 103,
    name: "Trạng Nguyên Tiếng Việt",
    year: "2025-2026",
    category: "academic",
    organizer: "NXB Giáo dục",
    status: "Vòng 7 - Sơ khảo",
    statusType: "active",
    color: "red",
    icon: "book",
    logo: "https://trangnguyen.edu.vn/assets/images/logo_tn.png",
    description: "Sân chơi tìm hiểu tiếng Việt, văn hóa, lịch sử dành cho học sinh tiểu học.",
    rankingUrl: "https://trangnguyen.edu.vn/bang-xep-hang",
    details: {
      target: "Học sinh Tiểu học (Lớp 1-5)",
      schedule: [
        { phase: "Vòng 7 Sơ khảo", time: "09-13/12/2025 (Đang thi)" },
        { phase: "Thi Hương (Cấp Huyện)", time: "Tháng 02/2026" },
        { phase: "Thi Hội (Cấp Tỉnh)", time: "Tháng 03/2026" },
        { phase: "Thi Đình (Quốc gia)", time: "20-21/04/2026" }
      ],
      format: "Trắc nghiệm game hóa. Tái hiện không gian thi Hương - Hội - Đình xưa.",
      highlight: "Lịch thi Vòng 7: Miền Bắc 9-10/12, Miền Trung & Nam 11-12/12, Toàn quốc 13/12/2025.",
      website: "https://trangnguyen.edu.vn"
    }
  },
  {
    id: 104,
    name: "Viết thư Quốc tế UPU",
    year: "Lần thứ 55",
    category: "academic",
    organizer: "Bộ TT&TT, UPU",
    status: "Đang nhận bài",
    statusType: "active",
    color: "yellow",
    icon: "book",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Universal_Postal_Union_logo.svg/1200px-Universal_Postal_Union_logo.svg.png",
    description: "Cuộc thi viết thư quốc tế rèn luyện kỹ năng viết và tư duy xã hội.",
    rankingUrl: "https://vnpost.vn/ket-qua-upu",
    details: {
      target: "Học sinh từ 9 - 15 tuổi",
      schedule: [
        { phase: "Phát động", time: "Tháng 11/2025 (Đã phát động)" },
        { phase: "Hạn chót nộp bài", time: "Tháng 03/2026" },
        { phase: "Trao giải", time: "Tháng 05/2026" }
      ],
      format: "Viết thư tay, một mặt, không quá 800 từ. Chủ đề thay đổi hàng năm.",
      highlight: "Bài giải Nhất Quốc gia được dịch sang tiếng Pháp/Anh để thi Quốc tế.",
      website: "https://vnpost.vn"
    }
  },
  {
    id: 106,
    name: "TOEFL Primary Challenge",
    year: "2025-2026",
    category: "academic",
    organizer: "IIG Việt Nam",
    status: "Vòng 2 Cấp Tỉnh",
    statusType: "active",
    color: "blue",
    icon: "globe",
    logo: "https://iigvietnam.com/wp-content/uploads/2023/11/TOEFL-Primary-Logo.png",
    description: "Cuộc thi đánh giá năng lực tiếng Anh chuẩn khảo thí quốc tế ETS.",
    rankingUrl: "https://toeflchallenge.iigvietnam.com/ket-qua",
    details: {
      target: "Học sinh tiểu học (Lớp 2-5)",
      schedule: [
        { phase: "Vòng 1 (Sơ loại)", time: "Đã xong (11/2025)" },
        { phase: "Vòng 2 (Cấp Tỉnh)", time: "01 - 02/2026 (Sắp diễn ra)" },
        { phase: "Vòng 3 (Quốc gia)", time: "Tháng 05/2026" }
      ],
      format: "Vòng 2 thi bài thi TOEFL Primary cấp độ 1&2 trên giấy.",
      highlight: "Thí sinh vào Vòng 2 sẽ nhận được Phiếu điểm Quốc tế có giá trị toàn cầu.",
      website: "https://iigvietnam.com"
    }
  },
  {
    id: 107,
    name: "Tư duy Thuật toán Bebras",
    year: "2025-2026",
    category: "academic",
    organizer: "Bebras Việt Nam",
    status: "Vòng 2 đã thi",
    statusType: "active",
    color: "blue",
    icon: "code",
    logo: "https://www.bebras.vn/public/assets/img/logo.png",
    description: "Sân chơi Tư duy Thuật toán dành cho học sinh, tiếp cận Tin học mà không cần kỹ năng lập trình.",
    rankingUrl: "https://www.bebras.vn/tra-cuu",
    details: {
      target: "Học sinh lớp 1 - 12",
      schedule: [
        { phase: "Tuần lễ Bebras", time: "Đã xong (11/2025)" },
        { phase: "Vòng 2", time: "23/11/2025 (Đã thi)" },
        { phase: "Tra cứu điểm Vòng 2", time: "Đang mở" }
      ],
      format: "Trắc nghiệm trực tuyến (45 phút). Đề thi tập trung vào tư duy logic và thuật toán.",
      highlight: "Đề thi thú vị, gần gũi thực tế. Chứng nhận có giá trị quốc tế.",
      website: "https://www.bebras.vn"
    }
  },

  // --- NHÓM: TOÁN - TIN QUỐC TẾ ---
  {
    id: 405,
    name: "Toán Quốc tế Vio Global Math",
    year: "2025-2026",
    category: "math_cs_int",
    organizer: "Violympic & FPT",
    status: "Vòng Trải nghiệm",
    statusType: "active",
    color: "indigo",
    icon: "calc",
    logo: "https://vio-global.com/_next/image?url=https%3A%2F%2Fimages1.violympic.vn%2Fviolympic%2Fvgc%2Fassets%2Flogos%2Fvgc-logo.png&w=256&q=75",
    description: "Cuộc thi Olympic Toán học quốc tế quy mô lớn, kết nối học sinh Việt Nam với thế giới.",
    rankingUrl: "https://vio-global.com/vi/bang-xep-hang",
    details: {
      target: "Học sinh 6-13 tuổi (8 cấp độ)",
      schedule: [
        { phase: "Vòng Trải nghiệm", time: "11/2025 - 02/2026 (Đang mở)" },
        { phase: "Vòng Quốc gia", time: "02 - 04/2026" },
        { phase: "Chung kết Quốc tế", time: "Tháng 06/2026" }
      ],
      format: "Thi trực tuyến qua website. Đề thi chuẩn quốc tế, giao lưu văn hóa đa quốc gia.",
      highlight: "Tổng giải thưởng hàng tỷ đồng. Cơ hội giao lưu với thí sinh từ nhiều quốc gia.",
      website: "https://vio-global.com/vi"
    }
  },
  {
    id: 401,
    name: "Toán Quốc tế TIMO",
    year: "2025-2026",
    category: "math_cs_int",
    organizer: "Fermat Education",
    status: "Vòng loại QG",
    statusType: "active",
    color: "indigo",
    icon: "calc",
    logo: "https://olympic.fermat.edu.vn/wp-content/uploads/timo-cover-fb-01-scaled.jpg",
    description: "Thailand International Mathematical Olympiad - Kỳ thi Olympic Toán học quốc tế Thái Lan.",
    rankingUrl: "https://olympic.fermat.edu.vn/",
    details: {
      target: "Học sinh từ Mầm non - THPT",
      schedule: [
        { phase: "Vòng loại QG", time: "10 - 12/2025 (Đang diễn ra)" },
        { phase: "Chung kết QG", time: "Tháng 02/2026" },
        { phase: "Chung kết QT", time: "Tháng 04/2026" }
      ],
      format: "Trắc nghiệm tư duy logic toán học. Thi Online hoặc Tập trung.",
      highlight: "Cơ hội tranh tài tại Thái Lan vòng Chung kết quốc tế.",
      website: "https://olympic.fermat.edu.vn"
    }
  },
  {
    id: 402,
    name: "Toán Quốc tế HKIMO",
    year: "2025-2026",
    category: "math_cs_int",
    organizer: "Fermat Education",
    status: "Sắp mở ĐK",
    statusType: "upcoming",
    color: "indigo",
    icon: "calc",
    logo: "https://olympic.fermat.edu.vn/wp-content/uploads/7226380.jpg",
    description: "Hong Kong International Mathematical Olympiad - Kỳ thi Olympic Toán học quốc tế Hồng Kông.",
    rankingUrl: "https://olympic.fermat.edu.vn/",
    details: {
      target: "Học sinh từ Mầm non - THPT",
      schedule: [
        { phase: "Đăng ký Vòng loại", time: "Tháng 01 - 02/2026" },
        { phase: "Chung kết QG", time: "Tháng 05/2026" },
        { phase: "Chung kết QT", time: "Tháng 08/2026" }
      ],
      format: "Bài thi gồm 5 phần: Tư duy logic, Số học, Hình học, Tổ hợp, Đại số.",
      highlight: "Cơ hội thi đấu tại Hồng Kông vòng Chung kết quốc tế.",
      website: "https://olympic.fermat.edu.vn"
    }
  },
  {
    id: 403,
    name: "Toán SASMO",
    year: "2026",
    category: "math_cs_int",
    organizer: "SIMCC Việt Nam",
    status: "Sắp mở ĐK",
    statusType: "upcoming",
    color: "indigo",
    icon: "calc",
    logo: "https://sasmo.sg/wp-content/uploads/2019/02/SASMO-Logo-2019.png",
    description: "Singapore and Asian Schools Math Olympiad - Một trong những kỳ thi toán lớn nhất châu Á.",
    rankingUrl: "http://sasmo.vn/ket-qua",
    details: {
      target: "Học sinh lớp 2 - 10",
      schedule: [
        { phase: "Đăng ký", time: "Tháng 02/2026" },
        { phase: "Ngày thi", time: "Tháng 04/2026" },
        { phase: "Kết quả", time: "Tháng 05/2026" }
      ],
      format: "Trắc nghiệm và điền đáp án. Đề song ngữ Anh-Việt.",
      highlight: "Huy chương Vàng/Bạc được tham dự kỳ thi SIMOC tại Singapore.",
      website: "http://sasmo.vn"
    }
  },
  {
    id: 404,
    name: "Toán Hoa Kỳ (AMC 8)",
    year: "2025-2026",
    category: "math_cs_int",
    organizer: "AMC Vietnam",
    status: "Đang nhận ĐK",
    statusType: "active",
    color: "indigo",
    icon: "calc",
    logo: "https://www.amcvietnam.edu.vn/assets/images/logo-amc.png",
    description: "American Mathematics Competitions - Kỳ thi Toán học Hoa Kỳ uy tín lâu đời.",
    rankingUrl: "https://www.onluyen.vn/amc/",
    details: {
      target: "Lớp 4 - 8 (Dưới 14.5 tuổi)",
      schedule: [
        { phase: "Đăng ký", time: "10 - 12/2025 (Đang mở)" },
        { phase: "Ngày thi", time: "Tháng 01/2026" },
        { phase: "Kết quả", time: "Tháng 02 - 03/2026" }
      ],
      format: "25 câu trắc nghiệm trong 40 phút. Đề thi bằng tiếng Anh (có bản dịch).",
      highlight: "Tiêu chuẩn vàng đánh giá năng lực toán học. Kết quả được công nhận toàn cầu.",
      website: "https://www.amcvietnam.edu.vn"
    }
  },
  {
    id: 105,
    name: "Toán Quốc tế Kangaroo (IKMC)",
    year: "2026",
    category: "math_cs_int",
    organizer: "IEG Foundation",
    status: "Sắp hết hạn ĐK",
    statusType: "urgent",
    color: "indigo",
    icon: "calc",
    logo: "https://kangaroo-math.vn/wp-content/uploads/2019/10/logo.png",
    description: "Kỳ thi Toán tư duy quốc tế lớn nhất thế giới, chú trọng tư duy logic.",
    rankingUrl: "https://kangaroo-math.vn/ket-qua",
    details: {
      target: "Lớp 1-12 (Tiểu học thi Level 1-3)",
      schedule: [
        { phase: "Hạn đăng ký", time: "Trước 31/12/2025 (Sắp hết hạn)" },
        { phase: "Ngày thi", time: "15/03/2026 (Chủ nhật)" },
        { phase: "Kết quả", time: "Tháng 04/2026" }
      ],
      format: "Trắc nghiệm tư duy logic. Đề song ngữ Anh - Việt.",
      highlight: "Thí sinh tự do có thể đăng ký trực tuyến mà không cần qua trường.",
      website: "https://kangaroo-math.vn"
    }
  },
  {
    id: 406,
    name: "Olympic Tin học Quốc tế HKICO",
    year: "2025",
    category: "math_cs_int",
    organizer: "Fermat Education",
    status: "Đang nhận ĐK",
    statusType: "active",
    color: "indigo",
    icon: "code",
    logo: "https://olympic.fermat.edu.vn/wp-content/uploads/2024/12/logo-hkico.png",
    description: "Hong Kong International Computational Olympiad - Olympic Tin học quốc tế từ Hong Kong.",
    rankingUrl: "https://olympic.fermat.edu.vn/",
    details: {
      target: "Học sinh lớp 2-12",
      schedule: [
        { phase: "Hạn đăng ký", time: "Trước 10/02/2025" },
        { phase: "Vòng loại", time: "02/03/2025 (Chủ nhật)" },
        { phase: "Chung kết QG", time: "Tháng 05/2025" },
        { phase: "Chung kết QT", time: "Tháng 08/2025" }
      ],
      format: "Thi trực tuyến qua máy tính. Các môn: Tư duy thuật toán, Lập trình Scratch/Python.",
      highlight: "Cơ hội thi đấu tại Hong Kong vòng Chung kết quốc tế. Chứng nhận có giá trị toàn cầu.",
      website: "https://olympic.fermat.edu.vn/mo-dang-ky-ky-thi-olympic-tin-hoc-quoc-te-hkico-2025/"
    }
  },
  {
    id: 407,
    name: "Lập trình Scratch Quốc tế",
    year: "2025",
    category: "math_cs_int",
    organizer: "International Scratch Olympiad",
    status: "Kết quả đã có",
    statusType: "upcoming",
    color: "indigo",
    icon: "code",
    logo: "https://scratcholympiads.com/wp-content/uploads/2024/09/cropped-Logo-Transparent.png",
    description: "Cuộc thi lập trình Scratch quốc tế dành cho học sinh từ 5-18 tuổi trên toàn thế giới.",
    rankingUrl: "https://scratcholympiads.com/results/",
    details: {
      target: "Học sinh 5-18 tuổi (5 nhóm tuổi)",
      schedule: [
        { phase: "Đăng ký", time: "Tháng 08-09/2025" },
        { phase: "Ngày thi", time: "Tháng 10/2025" },
        { phase: "Kết quả", time: "Đã công bố (11/2025)" }
      ],
      format: "Thi online. Thí sinh tạo dự án Scratch sáng tạo theo chủ đề.",
      highlight: "Cuộc thi quốc tế uy tín. Giúp học sinh phát triển tư duy lập trình từ nhỏ.",
      website: "https://scratcholympiads.com/"
    }
  },
  {
    id: 408,
    name: "Olympic Khoa học Máy tính ĐNA SEACSO",
    year: "2026",
    category: "math_cs_int",
    organizer: "Fermat Education",
    status: "Hạn ĐK: 17/12",
    statusType: "urgent",
    color: "indigo",
    icon: "code",
    logo: "https://olympic.fermat.edu.vn/wp-content/uploads/logo-seacso.png",
    description: "Southeast Asian Computer Science Olympiad - Olympic Khoa học Máy tính khu vực Đông Nam Á.",
    rankingUrl: "https://olympic.fermat.edu.vn/",
    details: {
      target: "Học sinh từ Mầm non - THPT",
      schedule: [
        { phase: "Hạn đăng ký Vòng QG", time: "Trước 17/12/2025 (Còn 4 ngày)" },
        { phase: "Vòng quốc gia", time: "17/01/2026 (Chủ Nhật)" },
        { phase: "Vòng quốc tế", time: "06-10/03/2026 tại Philippines" }
      ],
      format: "Thi trực tuyến trên nền tảng quốc tế. Đề bài song ngữ Anh-Việt.",
      highlight: "Cơ hội thi đấu tại Tagaytay, Philippines. Chứng nhận quốc tế có giá trị cao.",
      website: "https://olympic.fermat.edu.vn/tong-hop-cac-ky-thi-olympic-quoc-te-dang-dien-ra-2/"
    }
  },

  // --- NHÓM: TIẾNG ANH QUỐC TẾ ---
  {
    id: 601,
    name: "Olympic Anh ngữ & Toán QT Teeneagle",
    year: "2026",
    category: "english_int",
    organizer: "Fermat Education",
    status: "Đang nhận ĐK",
    statusType: "active",
    color: "cyan",
    icon: "globe",
    logo: "https://olympic.fermat.edu.vn/wp-content/uploads/logo-teeneagle.png",
    description: "Olympic Anh ngữ và Toán học quốc tế Teeneagle - Cơ hội tranh tài tại Dubai, UK, và USA.",
    rankingUrl: "https://olympic.fermat.edu.vn/",
    details: {
      target: "Học sinh từ Mầm non - THPT",
      schedule: [
        { phase: "Vòng 1 (Online)", time: "Theo lịch đăng ký từng đợt" },
        { phase: "Vòng 2 Dubai", time: "22-28/03/2026" },
        { phase: "Vòng 2 UK", time: "21-28/06/2026" },
        { phase: "Vòng 2 USA", time: "19-25/07/2026" }
      ],
      format: "Vòng 1: Thi trực tuyến. Vòng 2: Thí sinh đạt HCV, HCB, HCĐ, Danh dự được tham dự chung kết quốc tế.",
      highlight: "Cơ hội học tập và trải nghiệm tại 3 địa điểm quốc tế. Chứng nhận toàn cầu.",
      website: "https://olympic.fermat.edu.vn/teeneagle-2026/"
    }
  },
  {
    id: 602,
    name: "Olympic Tiếng Anh QT ESOLIO",
    year: "2026",
    category: "english_int",
    organizer: "Fermat Education",
    status: "Hạn ĐK: 07/01",
    statusType: "urgent",
    color: "cyan",
    icon: "globe",
    logo: "https://olympic.fermat.edu.vn/wp-content/uploads/z7198127538965_092dc5b4728355b266ed134a9894367c.jpg",
    description: "English for Speakers of Other Languages International Olympiad - Olympic Tiếng Anh quốc tế từ Bali, Indonesia.",
    rankingUrl: "https://olympic.fermat.edu.vn/",
    details: {
      target: "Học sinh lớp 3-12 (4 cấp độ CEFR: A1-C1)",
      schedule: [
        { phase: "Hạn đăng ký", time: "Trước 24h00 ngày 07/01/2026" },
        { phase: "Vòng quốc gia", time: "01/02/2026 (Chủ Nhật)" },
        { phase: "Vòng quốc tế", time: "28/06 - 02/07/2026 tại Bali" }
      ],
      format: "Vòng QG: Thi trực tuyến. Gồm 4 cấp độ: Bright Explorers (3-4), Curious Walkers (5-6), Determined Runners (7-9), Visionary Flyers (10-12).",
      highlight: "Cơ hội thi đấu tại Bali, Indonesia. Đánh giá năng lực tiếng Anh theo chuẩn quốc tế CEFR.",
      website: "https://olympic.fermat.edu.vn/mo-dang-ky-ky-thi-olympic-tieng-anh-quoc-te-esolio-2026/"
    }
  },

  // --- NHÓM: NĂNG KHIẾU ---
  {
    id: 201,
    name: "Sáng tạo TTN Nhi Đồng",
    year: "2026",
    category: "talent",
    organizer: "VUSTA, Bộ KH&CN",
    status: "Đang phát động",
    statusType: "active",
    color: "purple",
    icon: "code",
    logo: "http://vifotec.com.vn/images/logo.png",
    description: "Cuộc thi sáng tạo kỹ thuật (Vifotec) dành cho thanh thiếu niên nhi đồng.",
    rankingUrl: "http://vifotec.com.vn/ket-qua",
    details: {
      target: "6-18 tuổi",
      schedule: [
        { phase: "Cấp Tỉnh", time: "12/2025 - 04/2026 (Đang diễn ra)" },
        { phase: "Hạn nộp QG", time: "31/07/2026" },
        { phase: "Trao giải", time: "Tháng 10/2026" }
      ],
      format: "Thi mô hình/sản phẩm: Đồ dùng học tập, Phần mềm, Môi trường...",
      highlight: "Giải thưởng uy tín cấp Quốc gia, được tính điểm thi đua.",
      website: "http://www.vifotec.com.vn"
    }
  },
  {
    id: 202,
    name: "Tin học trẻ Toàn quốc",
    year: "Lần thứ 32",
    category: "talent",
    organizer: "TW Đoàn",
    status: "Dự kiến (Hè)",
    statusType: "upcoming",
    color: "green",
    icon: "code",
    logo: "https://tinhoctre.vn/Uploads/Logo/logo_11_26_23_33.png",
    description: "Sân chơi lập trình uy tín nhất dành cho học sinh phổ thông.",
    rankingUrl: "http://tinhoctre.vn/ket-qua",
    details: {
      target: "Học sinh Tiểu học (Bảng A)",
      schedule: [
        { phase: "Sơ khảo Online", time: "Tháng 03 - 04/2026" },
        { phase: "Vòng Khu vực", time: "Tháng 06/2026" },
        { phase: "Chung kết QG", time: "Tháng 08/2026" }
      ],
      format: "Bảng A: Thi kỹ năng lập trình ngôn ngữ Scratch.",
      highlight: "Điểm cộng lớn khi xét tuyển vào các trường THCS chất lượng cao.",
      website: "http://tinhoctre.vn"
    }
  },
  {
    id: 203,
    name: "Vẽ tranh: Ngày hội sắc màu",
    year: "2026",
    category: "talent",
    organizer: "Hội đồng Đội TW",
    status: "Sắp tới",
    statusType: "upcoming",
    color: "pink",
    icon: "art",
    logo: "https://ngayhoisacmau.colokit.com/templates/images/logo.png",
    description: "Cuộc thi vẽ tranh lớn dành cho thiếu nhi, phát huy khả năng hội họa.",
    rankingUrl: "https://thieunien.vn",
    details: {
      target: "Thiếu nhi 6-15 tuổi",
      schedule: [
        { phase: "Phát động", time: "Tháng 03/2026" },
        { phase: "Hạn nộp bài", time: "Tháng 07/2026" },
        { phase: "Tổng kết", time: "Tháng 09/2026" }
      ],
      format: "Vẽ tranh trên giấy A3, chất liệu tự chọn.",
      highlight: "Thường kết hợp với các nhãn hàng dụng cụ học tập (Colokit).",
      website: "https://thieunien.vn"
    }
  },
  {
    id: 204,
    name: "Vô địch QG STEM, AI & Robotics",
    year: "2025-2026",
    category: "talent",
    organizer: "Báo Tiền Phong & ĐH Bách Khoa",
    status: "Vòng Sơ khảo",
    statusType: "active",
    color: "purple",
    icon: "code",
    logo: "https://vsar.tienphong.vn/static/media/logo.b5e3c8c8.svg",
    description: "Cuộc thi VSAR - Sân chơi STEM, AI và Robotics lớn nhất dành cho học sinh, sinh viên.",
    rankingUrl: "https://vsar.tienphong.vn/",
    details: {
      target: "Học sinh, sinh viên (3 nhóm tuổi)",
      schedule: [
        { phase: "Phát động", time: "Tháng 10/2025 (Đã phát động)" },
        { phase: "Vòng Sơ khảo", time: "11-12/2025 (Đang diễn ra)" },
        { phase: "Vòng Bán kết", time: "Tháng 02-03/2026" },
        { phase: "Chung kết QG", time: "Tháng 04/2026" }
      ],
      format: "Thi mô hình Robotics, dự án STEM/AI. Chủ đề 2025-2026: 'Năng lượng cho tương lai'.",
      highlight: "30.000+ học sinh, sinh viên từ 20+ quốc gia, 10.000+ trường & trung tâm.",
      website: "https://vsar.tienphong.vn/"
    }
  },
  {
    id: 205,
    name: "Sáng tạo Robotics",
    year: "2025",
    category: "talent",
    organizer: "Tài năng Việt",
    status: "CK đã kết thúc",
    statusType: "upcoming",
    color: "purple",
    icon: "code",
    logo: "https://robotics.tainangviet.vn/images/logo.png",
    description: "Cuộc thi Sáng tạo Robotics lần thứ 5 năm 2025 dành cho thiếu nhi yêu thích công nghệ.",
    rankingUrl: "https://robotics.tainangviet.vn/new/show/12",
    details: {
      target: "Thiếu nhi 6-15 tuổi",
      schedule: [
        { phase: "Vòng sơ loại Trường", time: "Đã xong" },
        { phase: "Vòng Tỉnh/TP", time: "Đã xong" },
        { phase: "Chung kết QG", time: "21/11/2025 (Đã kết thúc)" }
      ],
      format: "Chủ đề 2025: 'Robot - Smart Logistics'. Thi mô hình Robotics.",
      highlight: "Kết quả Vòng chung kết quốc gia 2025 đã được công bố ngày 21/11/2025.",
      website: "https://robotics.tainangviet.vn/"
    }
  },

  // --- NHÓM: THỂ THAO ---
  {
    id: 301,
    name: "Giải Thể thao Học sinh",
    year: "2025-2026",
    category: "sports",
    organizer: "Sở GD&ĐT Tỉnh/TP",
    status: "Cấp Quận/Huyện",
    statusType: "active",
    color: "orange",
    icon: "trophy",
    description: "Các giải thể thao học đường (Hội khỏe Phù Đổng các cấp).",
    rankingUrl: "https://moet.gov.vn",
    details: {
      target: "Học sinh phổ thông",
      schedule: [
        { phase: "Cấp Quận/Huyện", time: "12/2025 - 01/2026 (Đang diễn ra)" },
        { phase: "Cấp Tỉnh/TP", time: "Tháng 03 - 04/2026" }
      ],
      format: "Đa môn: Điền kinh, Bơi lội, Cầu lông, Đá cầu, Bóng rổ...",
      highlight: "Cơ sở để tuyển chọn vận động viên năng khiếu cho địa phương.",
      website: "https://moet.gov.vn"
    }
  },
  {
    id: 302,
    name: "Bóng đá Nhi đồng U11",
    year: "2026",
    category: "sports",
    organizer: "Báo TNTP & VFF",
    status: "Mùa hè",
    statusType: "upcoming",
    color: "green",
    icon: "activity",
    logo: "https://upload.wikimedia.org/wikipedia/vi/3/30/Gi%E1%BA%A3i_b%C3%B3ng_%C4%91%C3%A1_nhi_%C4%91%E1%BB%93ng_to%C3%A0n_qu%E1%BB%91c.png",
    description: "Giải bóng đá tranh Cúp Nestlé MILO truyền thống.",
    rankingUrl: "https://vff.org.vn",
    details: {
      target: "Học sinh nam U11 (Sinh năm 2015)",
      schedule: [
        { phase: "Vòng loại khu vực", time: "Tháng 05 - 06/2026" },
        { phase: "Vòng Chung kết", time: "Tháng 07/2026" }
      ],
      format: "Bóng đá 5 người (Futsal) hoặc sân cỏ nhân tạo.",
      highlight: "Cái nôi đào tạo cầu thủ trẻ chuyên nghiệp hàng đầu Việt Nam.",
      website: "https://vff.org.vn"
    }
  },
  {
    id: 303,
    name: "Giải Cờ Vua Thiếu Nhi Việt Nam",
    year: "2025-2026",
    category: "sports",
    organizer: "Hội đồng Đội TW & LĐ Cờ VN",
    status: "Đang mở đăng ký",
    statusType: "active",
    color: "blue",
    icon: "star",
    logo: "https://giaicovua.thieunhivietnam.vn/_next/image?url=%2Frobot.png&w=256&q=75",
    description: "Giải đấu cờ vua học đường quy mô quốc gia, ươm tạo tài năng trẻ Việt Nam 2025-2030.",
    rankingUrl: "https://giaicovua.thieunhivietnam.vn/",
    details: {
      target: "Thiếu nhi 6-15 tuổi (10 bảng đấu theo khối lớp 1-9 + bảng đặc biệt)",
      schedule: [
        { phase: "Vòng sơ loại cấp Trường", time: "10/2025 - 01/2026 (Đang mở ĐK)" },
        { phase: "Vòng thi đấu cấp Tỉnh/TP", time: "Tháng 02 - 04/2026" },
        { phase: "Chung kết Toàn quốc", time: "Tháng 6/2026 tại Đà Lạt" }
      ],
      format: "Swiss 7 ván, thời gian 10 phút + 2 giây/nước đi. Lệ phí: 200.000 VNĐ.",
      highlight: "1+ triệu thiếu nhi tham gia, 34 tỉnh/thành. Tổng giải thưởng 1 tỷ đồng.",
      website: "https://giaicovua.thieunhivietnam.vn/"
    }
  },

  // --- NHÓM: ĐÀ NẴNG ---
  {
    id: 501,
    name: "AIMazing English Contest",
    year: "2025-2026",
    category: "danang",
    organizer: "Hội đồng Đội TP. Đà Nẵng & Kyna",
    status: "Vòng 1 đang diễn ra",
    statusType: "active",
    color: "teal",
    icon: "globe",
    logo: "https://kynaenglish.vn/assets/images/logo.svg",
    description: "Cuộc thi tiếng Anh trực tuyến dành cho học sinh Đà Nẵng, tài trợ bởi Chính phủ Úc.",
    rankingUrl: "https://kynaenglish.vn/ai-mazing-contest-2025-danang",
    details: {
      target: "Học sinh Tiểu học và THCS tại Đà Nẵng (6 bảng)",
      schedule: [
        { phase: "Vòng 1 - Sơ kết", time: "12/2025 - 01/2026 (Đang diễn ra)" },
        { phase: "Vòng 2 - Bán kết", time: "Tháng 02/2026" },
        { phase: "Chung kết TP", time: "Tháng 03/2026" }
      ],
      format: "Vòng 1: Thi trực tuyến với Kyna AI Tutor (3 kỹ năng). Vòng 2-3: Thi 4 kỹ năng với AI.",
      highlight: "Đánh giá năng lực chuẩn quốc tế (Pre-Starters → PET). Trải nghiệm miễn phí gia sư AI.",
      website: "https://kynaenglish.vn/ai-mazing-contest-2025-danang"
    }
  },
  {
    id: 502,
    name: "Olympic Tiếng Anh TP. Đà Nẵng",
    year: "2025-2026",
    category: "danang",
    organizer: "Đoàn TN TP. Đà Nẵng & WISE",
    status: "Vòng Sơ loại",
    statusType: "active",
    color: "teal",
    icon: "globe",
    logo: "https://wiseenglish.edu.vn/wp-content/uploads/2025/11/Logo_Full-for-16-9-scaled.png",
    description: "Olympic tiếng Anh thành phố Đà Nẵng - Danang WISE English Olympic năm học 2025-2026.",
    rankingUrl: "https://wiseenglish.edu.vn/olympic-tieng-anh-da-nang-2025-2026",
    details: {
      target: "Học sinh 6-18 tuổi tại Đà Nẵng (Lớp 1-12, 3 bảng)",
      schedule: [
        { phase: "Vòng Sơ loại", time: "Tháng 12/2025 - 01/2026 (Đang thi)" },
        { phase: "Vòng Bán kết", time: "Tháng 01-02/2026" },
        { phase: "Vòng Chung kết", time: "Tháng 02-03/2026" }
      ],
      format: "Thi trực tuyến và trực tiếp. Đánh giá 4 kỹ năng Nghe - Nói - Đọc - Viết.",
      highlight: "Cuộc thi uy tín cấp thành phố. Giải thưởng hấp dẫn và chứng nhận có giá trị.",
      website: "https://wiseenglish.edu.vn/olympic-tieng-anh-da-nang-2025-2026"
    }
  }
];

// --- ICON HELPER COMPONENTS ---
const ContestIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'globe': return <Globe className={className} />;
    case 'book': return <BookOpen className={className} />;
    case 'code': return <Code className={className} />;
    case 'art': return <Music className={className} />;
    case 'trophy': return <Trophy className={className} />;
    case 'activity': return <Activity className={className} />;
    case 'star': return <Star className={className} />;
    case 'calc': return <Calculator className={className} />;
    default: return <Award className={className} />;
  }
};

// --- LOGO OR ICON FALLBACK COMPONENT ---
const ContestLogoOrIcon = ({ contest, color }: { contest: any; color: string }) => {
  const [imgError, setImgError] = useState(false);

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-amber-100 text-amber-600',
    green: 'bg-emerald-100 text-emerald-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    teal: 'bg-teal-100 text-teal-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  const colorClass = colorMap[color] || 'bg-slate-100 text-slate-600';

  if (!contest.logo || imgError) {
    return (
      <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
        <ContestIcon type={contest.icon} className="h-7 w-7" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-2xl bg-white ring-1 ring-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
      <img 
        src={contest.logo} 
        alt={`${contest.name} logo`} 
        className="h-full w-full object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContest, setSelectedContest] = useState<any>(null);

  // Filter Logic
  const filteredContests = competitionsData.filter(contest => {
    const matchesCategory = activeCategory === 'all' || contest.category === activeCategory;
    const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contest.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'academic': return 'Học thuật & Kiến thức';
      case 'math_cs_int': return 'Toán - Tin Quốc tế';
      case 'english_int': return 'Tiếng Anh Quốc tế';
      case 'talent': return 'Năng khiếu & Sáng tạo';
      case 'sports': return 'Thể thao & Vận động';
      case 'danang': return 'Đà Nẵng';
      default: return 'Tất cả cuộc thi';
    }
  };

  const getStatusClasses = (type: string) => {
    switch(type) {
      case 'active': return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 'urgent': return "bg-red-100 text-red-700 border-red-200 animate-pulse";
      case 'upcoming': return "bg-blue-50 text-blue-600 border-blue-100";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (selectedContest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedContest]);

  const categories = [
    { id: 'all', label: 'Tất cả', icon: Trophy },
    { id: 'academic', label: 'Học thuật', icon: BookOpen },
    { id: 'math_cs_int', label: 'Toán - Tin QT', icon: Calculator },
    { id: 'english_int', label: 'Tiếng Anh QT', icon: Globe },
    { id: 'talent', label: 'Năng khiếu', icon: Music },
    { id: 'sports', label: 'Thể thao', icon: Activity },
    { id: 'danang', label: 'Đà Nẵng', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* --- HERO SECTION (Prodigy-style) --- */}
      <section className="relative overflow-hidden bg-gradient-hero animate-gradient">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Năm học 2025-2026
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 leading-tight">
              Học mà chơi,<br />
              <span className="text-yellow-300">Chơi mà học!</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Tổng hợp tất cả cuộc thi học thuật, năng khiếu và thể thao dành cho học sinh tiểu học. Cập nhật lịch thi, tài liệu ôn tập và thông tin chi tiết.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl btn-shadow"
                onClick={() => document.getElementById('contests')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2" />
                Khám phá cuộc thi
              </Button>
              <Link to="/tai-lieu">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Tài liệu miễn phí
                </Button>
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm: TIMO, IOE, Cờ vua..." 
                className="w-full py-4 px-6 pl-14 rounded-2xl text-slate-800 bg-white/95 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl placeholder:text-slate-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-3xl md:text-4xl font-bold">{competitionsData.length}+</div>
                <div className="text-white/80 text-sm">Cuộc thi</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">8</div>
                <div className="text-white/80 text-sm">Danh mục</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">50K+</div>
                <div className="text-white/80 text-sm">Học sinh tham gia</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">24/7</div>
                <div className="text-white/80 text-sm">Cập nhật liên tục</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RESOURCES BANNER --- */}
      <ResourcesBanner />

      {/* --- CATEGORY TABS --- */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="py-4 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                      activeCategory === tab.id 
                      ? 'bg-gradient-primary text-white shadow-lg shadow-primary/30' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- INFO BANNER --- */}
      <div className="bg-amber-50 border-b border-amber-100 py-3 px-4">
        <div className="container mx-auto flex items-center justify-center text-center space-x-2">
          <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-900 font-medium truncate">
            Cập nhật trạng thái tháng <span className="font-bold">12/2025</span>. Bấm vào mỗi thẻ để xem chi tiết.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main id="contests" className="container mx-auto px-4 py-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 flex items-center">
            {getCategoryLabel(activeCategory)}
          </h2>
          <span className="text-sm font-semibold bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
            Tìm thấy {filteredContests.length} cuộc thi
          </span>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest, index) => (
            <div 
              key={contest.id} 
              onClick={() => setSelectedContest(contest)}
              className="group bg-white rounded-2xl border border-slate-200 card-hover cursor-pointer flex flex-col h-full animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Card Header */}
              <div className="p-6 flex items-start justify-between gap-3">
                <ContestLogoOrIcon contest={contest} color={contest.color} />
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${getStatusClasses(contest.statusType)}`}>
                    {contest.status}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{contest.year}</span>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="px-6 pb-4 flex-grow">
                <h3 className="text-lg font-heading font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {contest.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4 truncate">
                  {contest.organizer}
                </p>
                
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-3 text-primary/60 flex-shrink-0" />
                    <span className="truncate font-medium">
                      {contest.details.schedule.find((s: any) => s.phase.includes("Chung kết") || s.phase.includes("Quốc gia") || s.phase.includes("Ngày thi"))?.time || "Cập nhật sau"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-3 text-primary/60 flex-shrink-0" />
                    <span className="truncate">{contest.details.target}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-2xl group-hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium group-hover:text-primary">Xem chi tiết</span>
                  {contest.rankingUrl && (
                    <a 
                      href={contest.rankingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-semibold hover:bg-amber-200 transition-colors"
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      Xếp hạng
                    </a>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 p-8 rounded-full mb-6">
              <Search className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-700">Không tìm thấy kết quả</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-3">
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
            </p>
            <Button 
              onClick={() => {setSearchTerm(''); setActiveCategory('all')}} 
              className="mt-8 bg-gradient-primary text-white font-semibold px-6 py-3 rounded-xl btn-shadow"
            >
              Xem tất cả cuộc thi
            </Button>
          </div>
        )}
      </main>

      {/* --- MODAL DETAIL --- */}
      {selectedContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedContest(null)}>
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 p-6 flex justify-between items-start sticky top-0 z-10">
              <div className="flex items-start space-x-4 pr-8">
                <div className="hidden sm:block">
                  <ContestLogoOrIcon contest={selectedContest} color={selectedContest.color} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-900 leading-tight">{selectedContest.name}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 text-slate-600 uppercase border border-slate-200">
                      {selectedContest.organizer}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${getStatusClasses(selectedContest.statusType)}`}>
                      {selectedContest.status}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedContest(null)} 
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-6 w-6 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto">
              
              {/* Description */}
              <div className="mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed">
                  {selectedContest.description}
                </p>
              </div>

              {/* Info Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                  <h4 className="text-xs font-bold text-blue-600 uppercase mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" /> Đối tượng
                  </h4>
                  <p className="font-semibold text-slate-800">{selectedContest.details.target}</p>
                </div>
                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
                  <h4 className="text-xs font-bold text-purple-600 uppercase mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" /> Hình thức thi
                  </h4>
                  <p className="font-semibold text-slate-800 text-sm">{selectedContest.details.format}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-heading font-bold text-slate-800 mb-6 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" /> Lịch trình 2025-2026
                </h3>
                <div className="relative border-l-2 border-primary/20 ml-4 space-y-6 pb-2">
                  {selectedContest.details.schedule.map((item: any, idx: number) => (
                    <div key={idx} className="relative pl-8">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white shadow-sm transition-all
                        ${item.phase.includes("Quốc gia") || item.phase.includes("Chung kết") || item.phase.includes("Ngày thi")
                          ? 'bg-primary ring-2 ring-primary/20 scale-110' 
                          : 'bg-primary/40'}`
                      }></div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg w-fit">
                          {item.time}
                        </span>
                      </div>
                      <p className="font-medium text-slate-700 mt-1">{item.phase}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900">Lưu ý quan trọng</h4>
                  <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                    {selectedContest.details.highlight}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap justify-end gap-3 rounded-b-3xl">
              <Button 
                variant="outline"
                onClick={() => setSelectedContest(null)}
                className="rounded-xl"
              >
                Đóng lại
              </Button>
              {selectedContest.rankingUrl && (
                <a 
                  href={selectedContest.rankingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="bg-amber-500 hover:bg-amber-600 rounded-xl">
                    <BarChart3 className="h-4 w-4 mr-2" /> Bảng xếp hạng
                  </Button>
                </a>
              )}
              {selectedContest.details.website !== "#" && (
                <a 
                  href={selectedContest.details.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="bg-gradient-primary hover:opacity-90 rounded-xl btn-shadow">
                    <ExternalLink className="h-4 w-4 mr-2" /> Trang chính thức
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Thi Đua Tiểu Học</h3>
                <p className="text-slate-400 text-sm">Cổng thông tin 2025-2026</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/tai-lieu" className="text-slate-400 hover:text-white transition-colors">
                Tài liệu
              </Link>
              <a href="mailto:contact@example.com" className="text-slate-400 hover:text-white transition-colors">
                Liên hệ
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © 2025 Thi Đua Tiểu Học. Tổng hợp thông tin vì cộng đồng.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;