import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Calculator, Globe, MapPin, Trophy, Palette,
  FileText, Download, ExternalLink, Folder, Search, X
} from 'lucide-react';

// Dữ liệu tài liệu học tập
const resourcesData = {
  toan: {
    name: "Toán",
    icon: Calculator,
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    resources: [
      {
        id: 1,
        title: "Bộ đề ôn tập Toán lớp 3 - Violympic",
        description: "50+ đề thi thử Violympic Toán lớp 3 có đáp án chi tiết",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example1",
        downloadCount: 1250
      },
      {
        id: 2,
        title: "Sách bài tập Toán tư duy lớp 4-5",
        description: "Bài tập rèn luyện tư duy logic và giải toán nâng cao",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example2",
        downloadCount: 890
      },
      {
        id: 3,
        title: "Tổng hợp công thức Toán tiểu học",
        description: "Tất cả công thức cần nhớ từ lớp 1-5",
        type: "doc",
        url: "https://drive.google.com/drive/folders/example3",
        downloadCount: 2100
      }
    ]
  },
  tiengViet: {
    name: "Tiếng Việt",
    icon: BookOpen,
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    resources: [
      {
        id: 4,
        title: "Bộ đề Trạng Nguyên Tiếng Việt",
        description: "Đề thi các vòng Trạng Nguyên TV từ 2020-2025",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example4",
        downloadCount: 1580
      },
      {
        id: 5,
        title: "Tập làm văn mẫu lớp 4-5",
        description: "100+ bài văn mẫu hay theo chủ đề",
        type: "doc",
        url: "https://drive.google.com/drive/folders/example5",
        downloadCount: 3200
      },
      {
        id: 6,
        title: "Ngữ pháp Tiếng Việt cơ bản",
        description: "Tài liệu ngữ pháp TV dành cho học sinh tiểu học",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example6",
        downloadCount: 1120
      }
    ]
  },
  tiengAnh: {
    name: "Tiếng Anh",
    icon: Globe,
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    resources: [
      {
        id: 7,
        title: "Bộ đề IOE các cấp",
        description: "Đề thi Olympic Tiếng Anh IOE cấp trường, huyện, tỉnh",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example7",
        downloadCount: 2450
      },
      {
        id: 8,
        title: "Từ vựng Cambridge theo chủ đề",
        description: "1000+ từ vựng tiếng Anh cơ bản có hình ảnh minh họa",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example8",
        downloadCount: 1890
      },
      {
        id: 9,
        title: "Ngữ pháp tiếng Anh tiểu học",
        description: "Tổng hợp ngữ pháp từ cơ bản đến nâng cao",
        type: "doc",
        url: "https://drive.google.com/drive/folders/example9",
        downloadCount: 1650
      }
    ]
  },
  lichSuDiaLy: {
    name: "Lịch sử - Địa lý",
    icon: MapPin,
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    resources: [
      {
        id: 10,
        title: "Đề thi Violympic Lịch sử - Địa lý",
        description: "Bộ đề ôn tập môn Sử - Địa trên Violympic",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example10",
        downloadCount: 980
      },
      {
        id: 11,
        title: "Tóm tắt Lịch sử Việt Nam",
        description: "Kiến thức lịch sử VN dành cho học sinh tiểu học",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example11",
        downloadCount: 1340
      },
      {
        id: 12,
        title: "Bản đồ Địa lý Việt Nam",
        description: "Bộ sưu tập bản đồ địa lý VN có chú thích chi tiết",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example12",
        downloadCount: 760
      }
    ]
  },
  toanQuocTe: {
    name: "Toán quốc tế",
    icon: Trophy,
    color: "indigo",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    resources: [
      {
        id: 13,
        title: "Đề thi Kangaroo Math 2020-2025",
        description: "Trọn bộ đề thi Kangaroo có lời giải chi tiết",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example13",
        downloadCount: 2780
      },
      {
        id: 14,
        title: "Đề thi SASMO các năm",
        description: "Bộ đề SASMO Level 1-5 kèm đáp án",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example14",
        downloadCount: 1920
      },
      {
        id: 15,
        title: "Tài liệu ôn thi AMC 8",
        description: "Sách và đề luyện thi AMC 8 cho học sinh tiểu học",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example15",
        downloadCount: 1450
      },
      {
        id: 16,
        title: "Đề thi TIMO/HKIMO",
        description: "Bộ đề Olympic Toán quốc tế Thái Lan & Hồng Kông",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example16",
        downloadCount: 1680
      }
    ]
  },
  kyNang: {
    name: "Kỹ năng - Năng khiếu",
    icon: Palette,
    color: "pink",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    resources: [
      {
        id: 17,
        title: "Sách hướng dẫn lập trình Scratch",
        description: "Tài liệu học lập trình Scratch từ cơ bản đến nâng cao",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example17",
        downloadCount: 1560
      },
      {
        id: 18,
        title: "Bài tập rèn luyện tư duy Bebras",
        description: "100+ bài tập tư duy thuật toán theo chuẩn Bebras",
        type: "pdf",
        url: "https://drive.google.com/drive/folders/example18",
        downloadCount: 890
      },
      {
        id: 19,
        title: "Kỹ năng viết thư UPU",
        description: "Hướng dẫn viết thư quốc tế UPU kèm bài mẫu đạt giải",
        type: "doc",
        url: "https://drive.google.com/drive/folders/example19",
        downloadCount: 720
      }
    ]
  }
};

const colorClasses: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; hoverBg: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", iconBg: "bg-blue-100", iconColor: "text-blue-600", hoverBg: "hover:bg-blue-100" },
  red: { bg: "bg-red-50", border: "border-red-200", iconBg: "bg-red-100", iconColor: "text-red-600", hoverBg: "hover:bg-red-100" },
  green: { bg: "bg-green-50", border: "border-green-200", iconBg: "bg-green-100", iconColor: "text-green-600", hoverBg: "hover:bg-green-100" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", iconBg: "bg-amber-100", iconColor: "text-amber-600", hoverBg: "hover:bg-amber-100" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", hoverBg: "hover:bg-indigo-100" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", iconBg: "bg-pink-100", iconColor: "text-pink-600", hoverBg: "hover:bg-pink-100" }
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.entries(resourcesData);

  const filteredCategories = categories.filter(([key, category]) => {
    if (selectedCategory && key !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        category.name.toLowerCase().includes(query) ||
        category.resources.some(r => 
          r.title.toLowerCase().includes(query) || 
          r.description.toLowerCase().includes(query)
        )
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Quay lại</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Tài liệu học tập</h1>
                <p className="text-xs text-slate-500">Miễn phí cho học sinh</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Kho tài liệu học tập miễn phí
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tổng hợp tài liệu ôn thi, sách bài tập và đề thi các cuộc thi học sinh giỏi
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              !selectedCategory 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          {categories.map(([key, category]) => {
            const Icon = category.icon;
            const colors = colorClasses[category.color];
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  key === selectedCategory 
                    ? `${colors.iconBg} ${colors.iconColor}` 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="space-y-12">
          {filteredCategories.map(([key, category]) => {
            const Icon = category.icon;
            const colors = colorClasses[category.color];
            
            const filteredResources = searchQuery 
              ? category.resources.filter(r => 
                  r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  r.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : category.resources;

            if (filteredResources.length === 0) return null;

            return (
              <div key={key} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{category.name}</h2>
                    <p className="text-slate-500">{filteredResources.length} tài liệu</p>
                  </div>
                </div>

                {/* Resources Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group block p-5 rounded-2xl border-2 ${colors.border} ${colors.bg} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                          <FileText className={`w-5 h-5 ${colors.iconColor}`} />
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.iconBg} ${colors.iconColor} uppercase`}>
                          {resource.type}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-slate-900">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloadCount.toLocaleString()} lượt tải</span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-medium ${colors.iconColor} group-hover:gap-2 transition-all`}>
                          <span>Tải xuống</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Không tìm thấy tài liệu</h3>
            <p className="text-slate-400">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Tài liệu học tập miễn phí. Chia sẻ vì cộng đồng.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Resources;
