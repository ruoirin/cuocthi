import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Calculator, Globe, MapPin, Trophy, Palette,
  Download, ExternalLink, Folder, Search, X, ChevronRight, ChevronDown,
  Mic, GraduationCap, Languages, Calendar, Brain, Compass,
  Target, Lightbulb, Puzzle, Sparkles, Medal, Award, LucideIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

// Type definitions
interface SubLevel {
  name: string;
  url: string;
}

interface Level {
  name: string;
  url?: string;
  subLevels?: SubLevel[];
}

interface SingleResource {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  url: string;
  downloadCount: number;
  hasLevels?: false;
}

interface LeveledResource {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  downloadCount: number;
  hasLevels: true;
  levels: Level[];
}

type Resource = SingleResource | LeveledResource;

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  resources: Resource[];
}

// Dữ liệu tài liệu học tập
const resourcesData: Record<string, Category> = {
  cuocThi: {
    name: "Cuộc thi",
    icon: Award,
    color: "orange",
    resources: [
      {
        id: 211,
        title: "Kỳ thi Toán quốc tế TIMO",
        description: "Tài liệu ôn thi và đề thi Olympic Toán quốc tế Thái Lan (TIMO) các khối",
        icon: Medal,
        downloadCount: 3500,
        hasLevels: true,
        levels: [
          { name: "Khối Mầm non", url: "https://drive.google.com/file/d/1LMueJIqJFilPHgVSFKdXv3ii17VDILK6/view" },
          { name: "Khối 1", url: "https://drive.google.com/file/d/1S1WI2_pc00Es7KjnVh-f_CmkTH8PHVX_/view" },
          { name: "Khối 2", url: "https://drive.google.com/file/d/1QuMoHiSUCl3DRVwuYiOZJmupyP2XyDn-/view" },
          { name: "Khối 3", url: "https://drive.google.com/file/d/1SsA1UHMGOvWPHPd5dXSs_u1WGmiwELkD/view" },
          { name: "Khối 4", url: "https://drive.google.com/file/d/1akP92t5tLYNaYomZz3xI4eZ4lOjHcDoj/view" },
          { name: "Khối 5", url: "https://drive.google.com/file/d/1M9V_EaFpM9VUbcsIKnco21jX1UKkBhOE/view" },
          { name: "Khối 6", url: "https://drive.google.com/file/d/168L8Abx2KombTqkSg-dyMKDODAy1VCYY/view" },
          { name: "Khối 7", url: "https://drive.google.com/file/d/10wC6DxrCChZ2CdLQz18K6r_mD9NAunoy/view" },
          { name: "Khối 8", url: "https://drive.google.com/file/d/19GI47cb2QlwVris3kj0BLa_2T4J_aJLy/view" },
          { name: "Khối 9", url: "https://drive.google.com/file/d/1vSuONzhmo6O300rwaCTCGrHEUcuX30Ag/view" }
        ]
      },
      {
        id: 212,
        title: "Trạng Nguyên Tiếng Việt",
        description: "Tổng hợp đề thi và tài liệu ôn luyện Trạng Nguyên Tiếng Việt từ lớp 1 đến lớp 5",
        icon: Trophy,
        downloadCount: 12500,
        hasLevels: true,
        levels: [
          { name: "Tổng hợp câu đố ôn thi TNTV", url: "https://docs.google.com/document/d/1_HrZJ4oTfyvBgKrJj3HQFjswCNf7WUxP/edit" },
          { name: "Cẩm nang TNTV các khối lớp", url: "https://drive.google.com/drive/folders/1NTz5zMRQztw8-6_yKUYNcQ5VDffv7RO6" },
          { 
            name: "Lớp 1",
            subLevels: [
              { name: "Cấp trường", url: "https://drive.google.com/drive/folders/1FyTnq6XnbAunjMDECesR9kO-lFUUZ7Ks" },
              { name: "Cấp huyện", url: "https://drive.google.com/drive/folders/1Vc5giNG7ml7WiuQe10nIgIbZiv0UokbI" },
              { name: "Cấp tỉnh", url: "https://drive.google.com/drive/folders/10LkmcCWCzs7FGeKFaQx7lLRgGkR_9Pcc" }
            ]
          },
          { 
            name: "Lớp 2",
            subLevels: [
              { name: "Cấp trường", url: "https://drive.google.com/drive/folders/1UuFynvFXPxkZ9mjZibHo_df4TpwSkvLP" },
              { name: "Cấp huyện", url: "https://drive.google.com/drive/folders/1HufQVxR8rjQByXTwBDx5ULO11YpCPunY" },
              { name: "Cấp tỉnh", url: "https://drive.google.com/drive/folders/1m1PovQVEW7Qzf1gUJWirb7FAuUxlIYrJ" }
            ]
          },
          { 
            name: "Lớp 3",
            subLevels: [
              { name: "Cấp trường", url: "https://drive.google.com/drive/folders/1TChswCdmj3mlme5_AixSXWjGhps8bGxE" },
              { name: "Cấp huyện", url: "https://drive.google.com/drive/folders/1SVDyHWglXYabxlZmMybowpWf6VyxkT_z" },
              { name: "Cấp tỉnh", url: "https://drive.google.com/drive/folders/1wzpmnU0Eym1GJL-AjNu1DpjPkd0edi05" },
              { name: "Các vòng 2024-2025 (có đáp án)", url: "https://drive.google.com/drive/folders/11tbmmGPJ_jjLgr3dz6xXe1BKBNUQR4ze" },
              { name: "10 đề vòng trường", url: "https://drive.google.com/drive/folders/1P0V2ZCqzIh3RJjK2XQzyWKuxQq8y_k1I" },
              { name: "Bộ ôn 19 vòng", url: "https://drive.google.com/drive/folders/1XfL0iw_X5Ne2dwJhCnexawZVL_UZ3gr5" },
              { name: "Đề thi tỉnh chính thức 23-24", url: "https://drive.google.com/drive/folders/172Iu9lp1fUI6bT1BQoTwPPeanaxoD-Y1" },
              { name: "Cấp huyện 2023-2024 vòng 6", url: "https://drive.google.com/drive/folders/1du_HCrn6b1byTcusNmiR40iiG1ogNMwM" },
              { name: "Trạng Nguyên Toán TA TV", url: "https://drive.google.com/drive/folders/1c7pHQsCaJLeoidpV3sCqqkNcH94BnFG6" }
            ]
          },
          { 
            name: "Lớp 4",
            subLevels: [
              { name: "Cấp trường", url: "https://drive.google.com/drive/folders/1XbcPR6NGpxyGnSy8JVMPpMjmDPhfAF0O" },
              { name: "Cấp huyện", url: "https://drive.google.com/drive/folders/1O9VT2WGW3YQ85uzCvW20t4aHFbgFmMgM" },
              { name: "Cấp tỉnh", url: "https://drive.google.com/drive/folders/1iU7VvQb91TlNnauNWHe8_4KNv8cUjNyG" }
            ]
          },
          { 
            name: "Lớp 5",
            subLevels: [
              { name: "Cấp trường", url: "https://drive.google.com/drive/folders/1aKOrap2ilH_gRr0zghYqeW_4qFoLWcBm" },
              { name: "Cấp huyện", url: "https://drive.google.com/drive/folders/1zkmlj_XhZVWV0LUTYdsmehVhmB_BoSbx" },
              { name: "Cấp tỉnh", url: "https://drive.google.com/drive/folders/1aajSXVcih7woEeivS5XZolgdFapfb8xs" }
            ]
          }
        ]
      },
      {
        id: 213,
        title: "Violympic",
        description: "Tổng hợp tài liệu và đề thi ôn luyện Violympic các khối lớp",
        icon: Medal,
        downloadCount: 4500,
        hasLevels: true,
        levels: [
          { name: "Bộ đề luyện Violympic – TNTV các khối lớp", url: "https://drive.google.com/drive/folders/1FJJe2I3hSjrBYcN7E8OxJVTtpXcESwgB" },
          { 
            name: "Lớp 3",
            subLevels: [
              { name: "Violympic - Vioedu - TN", url: "https://drive.google.com/drive/folders/1Q0I09p8inNGk16HJPxTEjXHhVAm8grQk" },
              { name: "Cấp tỉnh", url: "https://drive.google.com/drive/folders/1CmQMPeCYpCg6HSWio35fzsn6R-BNUY2V" }
            ]
          }
        ]
      }
    ]
  },
  toan: {
    name: "Toán",
    icon: Calculator,
    color: "blue",
    resources: [
      {
        id: 401,
        title: "Tổng hợp môn toán lớp 5",
        description: "Bộ tài liệu toàn diện bao gồm đề thi và bài tập chuyên toán lớp 5",
        icon: Calculator,
        downloadCount: 2500,
        hasLevels: true,
        levels: [
          { name: "99 bộ đề toán lớp 5", url: "https://drive.google.com/file/d/1RWn51V21PMVRU4Dqn0XcE4bB79t4088R/view" },
          { name: "40 bộ đề toán lớp 5", url: "https://drive.google.com/file/d/1zkmHpjzVEySOrqVJaRQj4DufXwoMhXnG/view" },
          { name: "369 bài tập chuyên toán lớp 5", url: "https://drive.google.com/file/d/1DDikN1pyOgovKiQv8pfSV0S7my-jG82t/view" },
          { name: "39 Bộ đề bồi dưỡng toán 5", url: "https://drive.google.com/file/d/1yAK7PLcn_uv5cVNGK3I8HubC8zfGuaJl/view" },
          { name: "Bồi dưỡng toán 5 hay và khó", url: "https://drive.google.com/file/d/1zsfn9yP6CdBvhidktTNrl26i_AEEhlEL/view" },
          { name: "Để học tốt toán 5", url: "https://drive.google.com/file/d/1O8MZVHPq0r97FDDHNmknnvmA88GTnO5t/view" },
          { name: "Những bài toán hay và khó lớp 5", url: "https://drive.google.com/file/d/1F203E7uYlaITNKNSPf1EYhhbT0RUU8rP/view" }
        ]
      },
      {
        id: 402,
        title: "Tổng hợp toán tuổi thơ (toán tiểu học)",
        description: "Bộ sưu tập đề thi và tài liệu toán tuổi thơ dành cho học sinh tiểu học",
        icon: Sparkles,
        downloadCount: 3200,
        hasLevels: true,
        levels: [
          { name: "Tổng tập 10 năm toán tuổi thơ tiểu học", url: "https://drive.google.com/file/d/1H3CcAR8caUprpkvALJnTI3tKkkZ92FTE/view" },
          { name: "35 Bộ đề thi toán tuổi thơ", url: "https://drive.google.com/file/d/1Fbbhy_l4DHpvDQBRGEXDkUf7-efEr08F/view" },
          { name: "500 bài toán tiểu học", url: "https://drive.google.com/file/d/1Pm7BYtTZLTO6IUQwOsJ1ok02Tvhfly-C/view" },
          { name: "10 chuyên đề bồi dưỡng toán tiểu học Tập 1", url: "https://drive.google.com/file/d/179BG9IxYi_MoWPCJMTQo56tCUPM2K7E2/view" },
          { name: "10 chuyên đề bồi dưỡng toán tiểu học Tập 2", url: "https://drive.google.com/file/d/1l5FonSqITVYK7UOgsn2CBT6qJlNFf9FG/view" },
          { name: "Phương pháp giải toán tiểu học tập 1 (Sách GV)", url: "https://drive.google.com/file/d/1fU70Yq1rj-b02Xfl-v07jmZxZCFxH1XF/view" },
          { name: "Phương pháp giải toán tiểu học tập 2 (Sách GV)", url: "https://drive.google.com/file/d/1saHT6ZAOeOSWYr-NcpJg4Fn8nIG_aZd3/view" },
          { name: "Giải toán bằng nhiều cách", url: "https://drive.google.com/file/d/1zFJeZflpyk6G_FUrMexe1Hn6j54zDMD0/view" },
          { name: "Những bài toán hay Toán tuổi thơ", url: "https://drive.google.com/file/d/1zY46fsTguQiMkuRPpPQ3vx-FlzT2DqTO/view" },
          { name: "Toán chọn lọc tiểu học tập 1", url: "https://drive.google.com/file/d/1ybQqCtaM2KYsVWwvH6sJBRLmD-kX1W7O/view" },
          { name: "Toán chọn lọc tiểu học tập 2 (52 bộ đề có đáp án)", url: "https://drive.google.com/file/d/1-2XCvx8wwKF8o0IGxT9Kkj5D77QLVWjy/view" },
          { name: "Số đo thời gian và toán chuyển động", url: "https://drive.google.com/file/d/1DB6q2Dx9UUPtGJcz87G04-gO7NxAc7Ap/view" },
          { name: "Phương pháp giải 50 bộ đề toán (Có đáp án)", url: "https://drive.google.com/file/d/1BQQkjaBod8Drz5H6LVnNVWGuBpvIcSH8/view" }
        ]
      },
      {
        id: 403,
        title: "Tổng hợp toán lớp 6",
        description: "Bộ đề thi vào lớp 6 Toán + Tiếng Việt của trường Marie Curie",
        icon: GraduationCap,
        url: "https://drive.google.com/file/d/1idINPLbajimzFSPyL-ehk7aud-uHlTFr/view",
        downloadCount: 1800,
        hasLevels: false
      },
      {
        id: 404,
        title: "Bộ đề thi Toán lớp 5 cuối học kì 1",
        description: "Tuyển tập đề thi cuối học kỳ 1 môn Toán lớp 5",
        icon: Target,
        url: "https://drive.google.com/drive/folders/1cVxUTvS2qLsjKl-sthBx3L_mM7qfhmSf",
        downloadCount: 1700,
        hasLevels: false
      },
      {
        id: 405,
        title: "Khảo sát chất lượng môn Toán đầu năm lớp 5",
        description: "Đề thi khảo sát chất lượng đầu năm môn Toán lớp 5",
        icon: Compass,
        url: "https://drive.google.com/drive/folders/1zFx8pegpGHGUSgiwQsJf_RF7h60DMtlW",
        downloadCount: 1500,
        hasLevels: false
      },
      {
        id: 406,
        title: "Tổng hợp các đề ôn thi cuối HK1 lớp 5 môn Toán",
        description: "Bộ đề ôn luyện thi cuối học kỳ 1 môn Toán lớp 5",
        icon: Brain,
        url: "https://drive.google.com/drive/folders/1dsJ3wq7i_9Xjedoh0f75lMq49q6dglC2",
        downloadCount: 1600,
        hasLevels: false
      }
    ]
  },
  tiengViet: {
    name: "Tiếng Việt",
    icon: BookOpen,
    color: "red",
    resources: [
      {
        id: 301,
        title: "35 bài văn hay lớp 4",
        description: "Tuyển tập 35 bài văn mẫu hay dành cho học sinh lớp 4",
        icon: Sparkles,
        url: "https://drive.google.com/file/d/1yOmQPTIsxP0LeIl8Wgbc9mSL42tL8CZ2/view",
        downloadCount: 1950,
        hasLevels: false
      },
      {
        id: 302,
        title: "Luyện tập thành ngữ, tục ngữ Việt Nam",
        description: "Tài liệu luyện tập thành ngữ và tục ngữ Việt Nam cho học sinh",
        icon: Brain,
        url: "https://drive.google.com/file/d/1C8rO34V7S16Uog_EfcIMwP8TyiOm4fR6/view",
        downloadCount: 1720,
        hasLevels: false
      },
      {
        id: 303,
        title: "Tổng hợp Ca dao, Tục ngữ theo chủ đề",
        description: "Tuyển tập ca dao, tục ngữ Việt Nam được phân loại theo từng chủ đề",
        icon: Lightbulb,
        url: "https://docs.google.com/document/d/1a3kSmWIh09amxxLgBtpr8DeSOOYb4Yy2/edit?rtpof=true&sd=true",
        downloadCount: 1580,
        hasLevels: false
      },
      {
        id: 304,
        title: "Luyện thi HSG Tiếng Việt lớp 3",
        description: "Tài liệu ôn luyện thi học sinh giỏi môn Tiếng Việt lớp 3",
        icon: Trophy,
        url: "https://drive.google.com/drive/folders/19cnRpz81jcH_qMJAsV3yuu8SS9pLBgzV",
        downloadCount: 1800,
        hasLevels: false
      },
      {
        id: 305,
        title: "Tập làm văn lớp 3",
        description: "Bộ tài liệu hướng dẫn tập làm văn cho học sinh lớp 3",
        icon: Sparkles,
        url: "https://drive.google.com/drive/folders/16uVyuDWKpnLX1lsQoxWAZHp6sDZrDx5P",
        downloadCount: 1650,
        hasLevels: false
      },
      {
        id: 306,
        title: "Tổng hợp Tiếng Việt lớp 3",
        description: "Luyện từ và câu, chính tả, luyện viết cho học sinh lớp 3",
        icon: BookOpen,
        url: "https://drive.google.com/drive/folders/1LD8H4UY7J7wwnrV2_6tsBSl6PQcl2rDA",
        downloadCount: 1750,
        hasLevels: false
      },
      {
        id: 307,
        title: "Tuyển tập 80 đề thi HSG Tiếng Việt lớp 5 (có đáp án)",
        description: "80 đề thi học sinh giỏi môn Tiếng Việt lớp 5 kèm đáp án chi tiết",
        icon: GraduationCap,
        url: "https://drive.google.com/drive/folders/1Kc5j_8V8asAB9pYRg0oR-YYV8xCUUn9r",
        downloadCount: 2200,
        hasLevels: false
      },
      {
        id: 308,
        title: "Tiếng Việt lớp 5 - Đề thi giữa HK1 và cuối HK1",
        description: "Bộ đề thi giữa học kỳ 1 và cuối học kỳ 1 môn Tiếng Việt lớp 5",
        icon: Target,
        url: "https://drive.google.com/drive/folders/1DNYJsTUggdqHqPiJniw7GDkvsreIloG_",
        downloadCount: 1900,
        hasLevels: false
      }
    ]
  },
  tiengAnh: {
    name: "Tiếng Anh",
    icon: Globe,
    color: "green",
    resources: [
      {
        id: 101,
        title: "Tài liệu luyện phát âm Tiếng Anh (IPA, Trọng âm, Ngữ âm)",
        description: "Tài liệu quý về phát âm chuẩn IPA, luyện trọng âm và ngữ âm tiếng Anh",
        icon: Mic,
        url: "https://drive.google.com/drive/folders/1cCNwg7nnOZtUOeXgylcBe3zhG5kt0rup",
        downloadCount: 2500,
        hasLevels: false
      },
      {
        id: 102,
        title: "Bộ tài liệu Tiếng Anh US-EDU từ Mẫu giáo đến Lớp 12",
        description: "Trọn bộ tài liệu học Tiếng Anh theo chương trình US-EDU",
        icon: GraduationCap,
        url: "https://drive.google.com/drive/folders/15PofJBFW3ymrm41AojESeKMuGvHVg7Y8",
        downloadCount: 3200,
        hasLevels: false
      },
      {
        id: 103,
        title: "Bộ tài liệu Tiếng Anh Global từ Lớp 1 đến Lớp 12",
        description: "Tài liệu Tiếng Anh Global đầy đủ cho học sinh từ lớp 1 đến lớp 12",
        icon: Languages,
        downloadCount: 4500,
        hasLevels: true,
        levels: [
          { name: "Lớp 1", url: "https://drive.google.com/drive/folders/1KBmi-wkaxoeopr5G2nLXHSi2VUOgzaZ_" },
          { name: "Lớp 2", url: "https://drive.google.com/drive/folders/1EIzQxO0ODNKgMUEGj2qcuW53X2_pIyEv" },
          { name: "Lớp 3", url: "https://drive.google.com/drive/folders/1jF2c1u_WxDjhOJoj-4OL8ZiPnWJmq3WP" },
          { name: "Lớp 4", url: "https://drive.google.com/drive/folders/10py5-8_UKOZHnpdw9I3zg8gZr5SM7mSl" },
          { name: "Lớp 5", url: "https://drive.google.com/drive/folders/10C4GKf4cA8Hd77wYGjb3rFCNHGyA1xEk" },
          { name: "Lớp 6", url: "https://drive.google.com/drive/folders/145CZUuNssd9yA6B1CMdGTz94Jrg8fG54" },
          { name: "Lớp 7", url: "https://drive.google.com/drive/folders/1OiWhJLTDukKeI2bPzoXCaD5w5bRo7Ai-" },
          { name: "Lớp 8", url: "https://drive.google.com/drive/folders/1pB_N5GCYUjwuHFbEbfz46RpUBGeq3uQS" },
          { name: "Lớp 9", url: "https://drive.google.com/drive/folders/1D5isV8_J-ImswVLrYoMnQuLMMdQk8zgA" },
          { name: "Lớp 10", url: "https://drive.google.com/drive/folders/17MjSNGiJg21xzv0YNKhJ04NzJGyprhoh" },
          { name: "Lớp 11", url: "https://drive.google.com/drive/folders/1ZjnG8WkNCPPo49nLFoSZX00mzVFz2ZWz" },
          { name: "Lớp 12", url: "https://drive.google.com/drive/folders/1xyxoRieCj6b589csXd8M-tfsupHT3_P5" }
        ]
      },
      {
        id: 104,
        title: "Đề thi tham khảo HK1 môn Tiếng Anh lớp 1 – lớp 9",
        description: "Bộ đề thi tham khảo học kỳ 1 môn Tiếng Anh từ lớp 1 đến lớp 9",
        icon: Target,
        url: "https://drive.google.com/drive/folders/1kq2O13VNcPRobzZ-Zeih3JGg6Oh6XZFc",
        downloadCount: 2800,
        hasLevels: false
      },
      {
        id: 105,
        title: "Đề thi chuyên Tiếng Anh lớp 10 THPT",
        description: "Tuyển tập đề thi chuyên Tiếng Anh vào lớp 10 các trường THPT",
        icon: Trophy,
        url: "https://drive.google.com/drive/folders/1ay2oBmjPOlqN-xveHhavcG42kN9lsJbq",
        downloadCount: 3100,
        hasLevels: false
      },
      {
        id: 106,
        title: "Tiếng Anh i-Learn Smart World THCS",
        description: "Bộ tài liệu Tiếng Anh i-Learn Smart World cho học sinh THCS",
        icon: Lightbulb,
        downloadCount: 3500,
        hasLevels: true,
        levels: [
          { name: "Lớp 6", url: "https://drive.google.com/drive/u/0/folders/1lXEcBJ9SRqDwlPW22rkVb19Bz8ZGr7-V" },
          { name: "Lớp 7", url: "https://dtpeducationvn-my.sharepoint.com/personal/nganptn_dtp-education_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fnganptn%5Fdtp%2Deducation%5Fcom%2FDocuments%2FT%C3%A0i%20nguy%C3%AAn%20S%C3%A1ch%20Gi%C3%A1o%20Khoa%2FT%C3%A0i%20li%E1%BB%87u%20full%20i%2DLearn%20Smart%20World%207&ga=1" },
          { name: "Lớp 8", url: "https://dtpeducationvn-my.sharepoint.com/personal/nganptn_dtp-education_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fnganptn%5Fdtp%2Deducation%5Fcom%2FDocuments%2FT%C3%A0i%20nguy%C3%AAn%20S%C3%A1ch%20Gi%C3%A1o%20Khoa%2FT%C3%A0i%20li%E1%BB%87u%20full%20i%2DLearn%20Smart%20World%208&ga=1" },
          { name: "Lớp 9", url: "https://dtpeducationvn-my.sharepoint.com/personal/nganptn_dtp-education_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fnganptn%5Fdtp%2Deducation%5Fcom%2FDocuments%2FT%C3%A0i%20nguy%C3%AAn%20S%C3%A1ch%20Gi%C3%A1o%20Khoa%2FT%C3%A0i%20li%E1%BB%87u%20full%20i%2DLearn%20Smart%20World%209&ga=1" }
        ]
      }
    ]
  },
  lichSuDiaLy: {
    name: "Lịch sử - Địa lý",
    icon: MapPin,
    color: "amber",
    resources: []
  },
  toanQuocTe: {
    name: "Toán quốc tế",
    icon: Trophy,
    color: "indigo",
    resources: [
      {
        id: 201,
        title: "Bộ sách 180 Days of Math",
        description: "Bộ sách luyện toán 180 ngày giúp học sinh rèn luyện kỹ năng toán học mỗi ngày",
        icon: Calendar,
        url: "https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9",
        downloadCount: 1850,
        hasLevels: false
      },
      {
        id: 202,
        title: "Bộ sách Common Core Math",
        description: "Tài liệu toán học theo chuẩn Common Core của Mỹ",
        icon: Target,
        url: "https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT",
        downloadCount: 1620,
        hasLevels: false
      },
      {
        id: 203,
        title: "Bộ sách In Step Maths - Singapore Math",
        description: "Phương pháp toán Singapore nổi tiếng thế giới",
        icon: Compass,
        url: "https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM",
        downloadCount: 2100,
        hasLevels: false
      },
      {
        id: 204,
        title: "Bộ sách Master Skills Math",
        description: "Sách rèn luyện kỹ năng toán học nâng cao",
        icon: Brain,
        url: "https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu",
        downloadCount: 1450,
        hasLevels: false
      },
      {
        id: 205,
        title: "Bộ sách Math Guide G1-G6 - Singapore Math",
        description: "Hướng dẫn toán Singapore cho học sinh từ Grade 1 đến Grade 6",
        icon: BookOpen,
        url: "https://drive.google.com/drive/folders/1fuz2THBSHduFAz3gifiNZ61H8ksTzmMS",
        downloadCount: 1980,
        hasLevels: false
      },
      {
        id: 206,
        title: "Bộ sách Math In My World",
        description: "Sách toán ứng dụng trong đời sống thực tế",
        icon: Globe,
        url: "https://drive.google.com/drive/folders/1fME5VvuiOA3_dVFqNkRMS-drcJJEr8ew",
        downloadCount: 1320,
        hasLevels: false
      },
      {
        id: 207,
        title: "Bộ sách Math Minutes G1-G7",
        description: "Bài tập toán ngắn giúp luyện tập nhanh mỗi ngày từ Grade 1 đến Grade 7",
        icon: Sparkles,
        url: "https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3",
        downloadCount: 1680,
        hasLevels: false
      },
      {
        id: 208,
        title: "Bộ sách Oxford Mathematics PYP",
        description: "Sách toán Oxford theo chương trình Primary Years Programme",
        icon: GraduationCap,
        url: "https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b",
        downloadCount: 1520,
        hasLevels: false
      },
      {
        id: 209,
        title: "Bộ sách Singapore Math Challenge Word Problems G2-G5",
        description: "Bài toán đố theo phương pháp Singapore từ Grade 2 đến Grade 5",
        icon: Puzzle,
        url: "https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8",
        downloadCount: 1890,
        hasLevels: false
      },
      {
        id: 210,
        title: "Bộ sách Toán Sing",
        description: "Trọn bộ sách toán Singapore cho học sinh tiểu học",
        icon: Lightbulb,
        url: "https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM",
        downloadCount: 2200,
        hasLevels: false
      }
    ]
  },
  kyNang: {
    name: "Kỹ năng - Năng khiếu",
    icon: Palette,
    color: "pink",
    resources: []
  }
};

const colorClasses: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; hoverBg: string; levelBg: string; levelHover: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", iconBg: "bg-blue-100", iconColor: "text-blue-600", hoverBg: "hover:bg-blue-100", levelBg: "bg-blue-500", levelHover: "hover:bg-blue-600" },
  red: { bg: "bg-red-50", border: "border-red-200", iconBg: "bg-red-100", iconColor: "text-red-600", hoverBg: "hover:bg-red-100", levelBg: "bg-red-500", levelHover: "hover:bg-red-600" },
  green: { bg: "bg-green-50", border: "border-green-200", iconBg: "bg-green-100", iconColor: "text-green-600", hoverBg: "hover:bg-green-100", levelBg: "bg-green-500", levelHover: "hover:bg-green-600" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", iconBg: "bg-amber-100", iconColor: "text-amber-600", hoverBg: "hover:bg-amber-100", levelBg: "bg-amber-500", levelHover: "hover:bg-amber-600" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", hoverBg: "hover:bg-indigo-100", levelBg: "bg-indigo-500", levelHover: "hover:bg-indigo-600" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", iconBg: "bg-pink-100", iconColor: "text-pink-600", hoverBg: "hover:bg-pink-100", levelBg: "bg-pink-500", levelHover: "hover:bg-pink-600" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", iconBg: "bg-orange-100", iconColor: "text-orange-600", hoverBg: "hover:bg-orange-100", levelBg: "bg-orange-500", levelHover: "hover:bg-orange-600" }
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<LeveledResource | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("indigo");
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set());

  const toggleLevel = (index: number) => {
    setExpandedLevels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Fetch download counts from database
  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const { data, error } = await supabase
        .from('resource_downloads')
        .select('resource_id, download_count');
      
      if (data && !error) {
        const counts: Record<number, number> = {};
        data.forEach(item => {
          counts[item.resource_id] = item.download_count;
        });
        setDownloadCounts(counts);
      }
    };

    fetchDownloadCounts();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('resource-downloads')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'resource_downloads'
        },
        (payload) => {
          if (payload.new && typeof payload.new === 'object' && 'resource_id' in payload.new) {
            const newData = payload.new as { resource_id: number; download_count: number };
            setDownloadCounts(prev => ({
              ...prev,
              [newData.resource_id]: newData.download_count
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = Object.entries(resourcesData);

  const filteredCategories = categories.filter(([key, category]) => {
    if (category.resources.length === 0) return false;
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

  const handleResourceClick = async (resource: Resource, color: string) => {
    // Increment download count in database
    await supabase.rpc('increment_download_count', { p_resource_id: resource.id });

    if (resource.hasLevels) {
      setSelectedResource(resource);
      setSelectedColor(color);
    } else {
      window.open((resource as SingleResource).url, '_blank');
    }
  };

  const handleLevelClick = async (resourceId: number) => {
    // Increment download count when clicking a level
    await supabase.rpc('increment_download_count', { p_resource_id: resourceId });
  };

  const getDownloadCount = (resourceId: number) => {
    return downloadCounts[resourceId] || 0;
  };

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
          {categories.filter(([, cat]) => cat.resources.length > 0).map(([key, category]) => {
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
                    <button
                      key={resource.id}
                      onClick={() => handleResourceClick(resource, category.color)}
                      className={`group block p-5 rounded-2xl border-2 ${colors.border} ${colors.bg} ${colors.hoverBg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-left w-full`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                          <resource.icon className={`w-5 h-5 ${colors.iconColor}`} />
                        </div>
                        {resource.hasLevels && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.levelBg} text-white`}>
                            {resource.levels.length} cấp độ
                          </span>
                        )}
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
                          <span>{getDownloadCount(resource.id).toLocaleString()} lượt tải</span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-medium ${colors.iconColor} group-hover:gap-2 transition-all`}>
                          <span>{resource.hasLevels ? 'Xem chi tiết' : 'Tải xuống'}</span>
                          {resource.hasLevels ? <ChevronRight className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>
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

      {/* Level Selection Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={() => { setSelectedResource(null); setExpandedLevels(new Set()); }}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 pr-8">
              {selectedResource?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex-1 overflow-hidden flex flex-col">
            <p className="text-slate-500 mb-4">{selectedResource?.description}</p>
            <p className="text-sm font-medium text-slate-600 mb-3">Chọn cấp độ / lớp học:</p>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {selectedResource?.levels.map((level, index) => {
                const colors = colorClasses[selectedColor];
                const hasSubLevels = level.subLevels && level.subLevels.length > 0;
                const isExpanded = expandedLevels.has(index);
                
                if (hasSubLevels) {
                  return (
                    <div key={index} className="space-y-1">
                      <button
                        onClick={() => toggleLevel(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl ${colors.bg} ${colors.border} border-2 ${colors.hoverBg} transition-all hover:shadow-md`}
                      >
                        <span className="font-semibold text-slate-700">{level.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${colors.levelBg} text-white`}>
                            {level.subLevels?.length} tài liệu
                          </span>
                          {isExpanded ? (
                            <ChevronDown className={`w-4 h-4 ${colors.iconColor}`} />
                          ) : (
                            <ChevronRight className={`w-4 h-4 ${colors.iconColor}`} />
                          )}
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {level.subLevels?.map((subLevel, subIndex) => (
                            <a
                              key={subIndex}
                              href={subLevel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => selectedResource && handleLevelClick(selectedResource.id)}
                              className={`flex items-center justify-between p-2.5 rounded-lg bg-white border ${colors.border} hover:${colors.bg} transition-all hover:shadow-sm group`}
                            >
                              <span className="text-sm text-slate-600">{subLevel.name}</span>
                              <ExternalLink className={`w-3.5 h-3.5 ${colors.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <a
                    key={index}
                    href={level.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => selectedResource && handleLevelClick(selectedResource.id)}
                    className={`flex items-center justify-between p-3 rounded-xl ${colors.bg} ${colors.border} border-2 ${colors.hoverBg} transition-all hover:shadow-md group`}
                  >
                    <span className="font-medium text-slate-700">{level.name}</span>
                    <ExternalLink className={`w-4 h-4 ${colors.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </a>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
