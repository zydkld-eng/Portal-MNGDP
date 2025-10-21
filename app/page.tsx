"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  DollarSign,
  BarChart3,
  Settings,
  Users as UsersIcon, // ⬅️ avoid clash with your user data
  FileText,
  CreditCard,
  ClipboardList,
  ArrowLeft,
  Menu,
  X,
  ClipboardCheck,
  Briefcase,
  Shield,
  TrendingUp,
  Target,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getUserProfile,
  signOut,
  redirectToLogin,
} from "@/lib/auth"; // ⬅️ add getUserProfile
import { clearSupabaseCookies } from "@/lib/clear-cookies";

// ✅ Minimal, modern Badge (no external package)
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

type LinkItem = {
  name: string;
  icon: any;
  description: string;
  href: string;
  beneficiary?: string; // ⬅️ single beneficiary
};

export default function MNGDPPortal() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<
    "main" | "systems" | "dashboards"
  >("main");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>(""); // ⬅️ add

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsLoggedIn(true);
          // ⬅️ fetch profile name
          const profile = await getUserProfile(user.id);
          setUserName(profile?.name || profile?.full_name || "المستخدم");
        } else {
          clearSupabaseCookies();
          redirectToLogin();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        clearSupabaseCookies();
        redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    // Scroll to top smoothly whenever the view changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentView]);

  const currentYear = new Date().getFullYear();

  const systems: LinkItem[] = [
    {
      name: "نظام إدارة المشاريع",
      icon: Building2,
      description:
        "نظام يهدف إلى إدارة المشاريع ومتابعتها بشكل مؤتمت، يتيح لمدير المشروع رفع الطلبات اللازمة وتتبع التقدم حتى إتمام المشروع",
      href: "https://apps.powerapps.com/play/e/default-859f050e-9731-4556-aab4-683a27e7fa1b/a/6a835da0-59e3-4021-9ff6-03791d837ff8?tenantId=859f050e-9731-4556-aab4-683a27e7fa1b&hint=2dac8b0c-3c22-470c-a5d5-19a8f822c5e0&sourcetime=1759311763362",
      beneficiary: "مدراء المشاريع",
    },
    {
      name: "نظام التذاكر",
      icon: Settings,
      description:
        "نظام يتيح رفع التذاكر ومتابعتها وتوجيهها تلقائيًا إلى الإدارة المختصة لمعالجتها",
      href: "https://tickets.mngdp.com/",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "نظام إنجاز",
      icon: UsersIcon,
      description:
        "نظام لإدارة عمليات الموارد البشرية، يتيح للموظفين تقديم الإجازات والطلبات المختلفة، ويهدف إلى تسهيل الإجراءات الإدارية ورفع كفاءة العمل المؤسسي",
      href: "https://www.mngdp-erp.com/web/login",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "نظام إدارة المجالس",
      icon: FileText,
      description:
        "نظام لتنظيم وإدارة المجالس واللجان وفرق العمل، وتسهيل تنسيق الاجتماعات وتوزيع المهام بفعالية",
      href: "https://mjls.tech/login/mngdp",
      beneficiary: "أعضاء مجالس برامج التحول",
    },
    {
      name: "نظام خطة التفعيل",
      icon: ClipboardCheck,
      description: "نظام لمتابعة سير عمل مشاريع التفعيل بشكل مباشر وفعّال ",
      href: "https://apps.powerapps.com/play/e/default-859f050e-9731-4556-aab4-683a27e7fa1b/a/21840821-01f4-40da-9f27-f9a9feed1d19?tenantId=859f050e-9731-4556-aab4-683a27e7fa1b&hint=ef0a2f93-5591-4e56-8de5-d22cb295f174&sourcetime=1758440126051",
      beneficiary: "مدراء مشاريع التفعيل",
    },
    {
      name: "نظام الإدارة العامة للمحافظ",
      icon: Shield,
      description:
        "نظام لإدارة المحافظ يضم أقسام رئيسية تشمل: التحكم، إدارة المخاطر، البوابات المرحلية، والتخطيط وإدارة الموارد",
      href: "https://apps.powerapps.com/play/e/default-859f050e-9731-4556-aab4-683a27e7fa1b/a/dfe1c119-9e93-4799-ba41-0a42de7e1836?tenantId=859f050e-9731-4556-aab4-683a27e7fa1b&hint=a5ceb3ce-8062-4d9c-971c-4d1362c06890&sourcetime=1759312168219",
      beneficiary: "أعضاء فريق الادارة العامة للمحافظ",
    },
    {
      name: "نظام المالية لمتابعة المشاريع",
      icon: CreditCard,
      description:
        "نظام لمتابعة الجوانب المالية ومخرجات المشاريع، بما يسهم في تحسين الرقابة المالية ودقة التقارير",
      href: "https://apps.powerapps.com/play/e/default-859f050e-9731-4556-aab4-683a27e7fa1b/a/3501ef08-2021-4ad6-93a9-3277877446af?tenantId=859f050e-9731-4556-aab4-683a27e7fa1b&hint=1c561904-a8f5-4146-b0b3-5a28effb26da&sourcetime=1759696425694",
      beneficiary: "أعضاء فريق الادارة المالية",
    },
    {
      name: "نظام الموائمة للتخطيط والمشتريات",
      icon: Target,
      description: "أعضاء فريق ادارة المشتريات",
      href: "https://apps.powerapps.com/play/e/default-859f050e-9731-4556-aab4-683a27e7fa1b/a/2833251c-6a2a-46d2-a3e6-2b4d689612d1?tenantId=859f050e-9731-4556-aab4-683a27e7fa1b&hint=ddc19978-60e3-4d06-a355-38efd734b790&sourcetime=1759696442155",
      beneficiary: "إدارة التخطيط",
    },
    {
      name: "نظام حلول الأعمال",
      icon: Briefcase,
      description:
        "نظام يعرض بيانات المشاريع ويساعد على تتبع التذاكر ومتابعة سير العمل ",
      href: "https://apps.powerapps.com/play/e/default-859f050e-9731-4556-aab4-683a27e7fa1b/a/ac35b128-ddb3-4c24-831f-9dcd2e3dde55?tenantId=859f050e-9731-4556-aab4-683a27e7fa1b&hint=fe2334ab-4643-456d-8fc9-f8c0238fe6cd&sourcetime=1759696472305",
      beneficiary: "أعضاء فريق الادارة العامة للمحافظ",
    },
    {
      name: "نظام بصير",
      icon: BarChart3,
      description:
        "نظام لمتابعة مؤشرات الأداء الرئيسية و رصد الفجوات و تسجيل الإنجازات الخاصة بالأداء ",
      href: "",
      beneficiary: "جميع منسوبي البرنامج",
    },
  ];

  // Power BI Dashboards
  const dashboards: LinkItem[] = [
    {
      name: "National Guard Report Pack Long",
      icon: ClipboardList,
      description:
        "لوحة معلومات تعرض الجدول الزمني للمشاريع، والمخرجات، ورُزم العمل، والمشاريع المستقبلية، والمخاطر، ومشاريع التفعيل",
      href: "https://app.powerbi.com/links/YsxLLECnne?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "أعضاء فريق الادارة العامة للمحافظ",
    },
    {
      name: "لوحة معلومات الخطة التفصيلية للتحول - Transformation Detailed Plan",
      icon: BarChart3,
      description:
        "لوحة معلومات متكاملة تعرض خطة التحول، وبرامجها ومبادراتها، والدور الاستراتيجي، وتحليل الاعتماديات، و البيانات المالية",
      href: "https://app.powerbi.com/links/QRofCQU7Zz?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "لوحة معلومات الإدارة العامة للمحافظ",
      icon: Briefcase,
      description:
        "لوحة معلومات لمتابعة بيانات المشاريع، رزم العمل، المهام، المخاطر، المخرجات، الموافقات، والدروس المستفادة",
      href: "https://app.powerbi.com/links/qDlw_dRfOD?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "الإدارة العامة للمحافظ",
    },
    {
      name: "لوحة معلومات متابعة مشاريع خطط التفعيل",
      icon: BarChart3,
      description: "لوحة  معلومات تفاعلية لعرض ومتابعة سير عمل مشاريع التفعيل",
      href: "https://app.powerbi.com/links/20AGKY-Vn0?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare&bookmarkGuid=bbfb8166-6240-45ca-945f-2771d6df310",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "Supply & Demand Resources",
      icon: UsersIcon,
      description:
        "لوحة معلومات لمتابعة وتوازن العرض والطلب على الموارد، وتحليل توفرها مقابل احتياجات المشاريع",
      href: "https://app.powerbi.com/links/jjNuQ5CIpF?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "أعضاء فريق الادارة العامة للمحافظ",
    },
    {
      name: "لوحة معلومات الخطة التفصيلية للتحول - Transformation Detailed Plan Live",
      icon: DollarSign,
      description:
        "لوحة معلومات متكاملة تعرض خطة التحول، وبرامجها ومبادراتها، ومخرجاتها ، و النتائج المستهدفة و التكاليف المالية بالاعتماد على بيانات مباشرة",
      href: "https://app.powerbi.com/links/4cgkvB7GKb?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "أعضاء فريق الادارة العامة للمحافظ",
    },
    {
      name: "لوحة معلومات مركز إدارة التحول - Transformation Management Centre",
      icon: Settings,
      description:
        "لوحة معلومات شاملة تجمع الخطة التفصيلية، النموذج التشغيلي، وإدارة التغيير لتسهيل المتابعة وتعزيز التكامل",
      href: "https://app.powerbi.com/links/DQX1TEGNFD?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "لوحة معلومات إدراة التغيير  - Change",
      icon: TrendingUp,
      description:
        "لوحة معلومات توضح مؤشرات التغيير على مستوى الإدارات، وأثر تغيير البرامج على القطاعات، ودرجة تحمل الإدارات، بشكل مترابط يدعم التقييم واتخاذ القرار",
      href: "https://app.powerbi.com/links/yfGvUaUEaS?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "النموذج التشغيلي المستهدف  - Tareget Operating Model",
      icon: Target,
      description:
        "لوحة معلومات تعرض النموذج التشغيلي على المستوى المؤسسي وتقيس أدائه بشكل دقيق",
      href: "https://app.powerbi.com/links/rNJPjJGxy3?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "جميع منسوبي البرنامج",
    },
    {
      name: "لوحة معلومات المعاملات الإدارية",
      icon: FileText,
      description:
        "لوحة متابعة حالة المعاملات الإدارية لنواب المدير العام التنفيذي",
      href: "https://app.powerbi.com/links/5vFP_vb8vg?ctid=859f050e-9731-4556-aab4-683a27e7fa1b&pbi_source=linkShare",
      beneficiary: "الإدارة التنفيذية للبرنامج",
    },
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/mngdp-logo.png"
                alt="شعار برنامج تطوير وزارة الحرس الوطني"
                width={40}
                height={40}
                className="rounded-full flex-shrink-0 sm:w-[44px] sm:h-[44px]"
                onClick={() => setCurrentView("main")}
              />
              <div className="text-right">
                <h1 className="text-sm sm:text-lg font-bold text-primary leading-tight">
                  البوابة الموحدة
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  أهلاً وسهلاً، {userName || "جاري التحميل..."}
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant={currentView === "main" ? "default" : "ghost"}
                  onClick={() => setCurrentView("main")}
                  className="px-4 py-2"
                >
                  الرئيسية
                </Button>
                <Button
                  variant={currentView === "systems" ? "default" : "ghost"}
                  onClick={() => setCurrentView("systems")}
                  className="px-4 py-2"
                >
                  الأنظمة
                </Button>
                <Button
                  variant={currentView === "dashboards" ? "default" : "ghost"}
                  onClick={() => setCurrentView("dashboards")}
                  className="px-4 py-2"
                >
                  لوحات المعلومات
                </Button>
              </div>
              <div className="mr-4 pr-4 border-r border-border">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="px-4 py-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                >
                  تسجيل الخروج
                </Button>
              </div>
            </nav>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 pb-4 border-t pt-6">
              <nav className="flex flex-col gap-3">
                <Button
                  variant={currentView === "main" ? "default" : "ghost"}
                  className="justify-start h-12 px-4"
                  onClick={() => {
                    setCurrentView("main");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  الرئيسية
                </Button>
                <Button
                  variant={currentView === "systems" ? "default" : "ghost"}
                  className="justify-start h-12 px-4"
                  onClick={() => {
                    setCurrentView("systems");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  الأنظمة
                </Button>
                <Button
                  variant={currentView === "dashboards" ? "default" : "ghost"}
                  className="justify-start h-12 px-4"
                  onClick={() => {
                    setCurrentView("dashboards");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  لوحات المعلومات
                </Button>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="justify-start h-12 px-4 w-full text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    تسجيل الخروج
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {currentView === "main" && (
          <div className="space-y-12">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h2 className="text-xl lg:text-3xl font-bold text-primary leading-tight sm:text-2xl">
                مرحباً بك في البوابة الموحدة
              </h2>
              <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                مركزك الرئيسي للوصول إلى جميع أنظمة ولوحات معلومات برنامج تطوير
                وزارة الحرس الوطني
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary/50"
                onClick={() => setCurrentView("systems")}
              >
                <CardHeader className="text-center p-8">
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Settings className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl text-primary mb-4">
                    الأنظمة
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-8 pt-0">
                  <div className="flex items-center justify-center text-primary group-hover:-translate-x-2 transition-transform">
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    <span className="text-base lg:text-lg font-medium">
                      استكشاف الأنظمة
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-secondary/50"
                onClick={() => setCurrentView("dashboards")}
              >
                <CardHeader className="text-center p-8">
                  <div className="mx-auto w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                    <BarChart3 className="w-10 h-10 text-secondary" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl text-secondary mb-4">
                    لوحات المعلومات
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-8 pt-0">
                  <div className="flex items-center justify-center text-secondary group-hover:-translate-x-2 transition-transform">
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    <span className="text-base lg:text-lg font-medium">
                      عرض لوحات المعلومات
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === "systems" && (
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                أنظمة الأعمال
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl">
                الوصول وإدارة عمليات أعمالك الأساسية
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {systems.map((system, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <CardHeader className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <system.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <CardTitle className="text-lg sm:text-xl leading-tight">
                          {system.name}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                          <span className="font-medium">الوصف:</span>{" "}
                          {system.description}
                        </CardDescription>

                        {/* المستفيد */}
                        {system.beneficiary && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              المستفيدين:
                            </span>
                            <Badge>{system.beneficiary}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 text-base font-medium text-primary hover:bg-primary hover:text-white hover:border-primary"
                    >
                      <a
                        href={system.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        الوصول إلى النظام
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === "dashboards" && (
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
                لوحات المعلومات
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl">
                تحليل الأداء ومتابعة التقدم عبر المبادرات والمشاريع
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {dashboards.map((dashboard, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <CardHeader className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                        <dashboard.icon className="w-7 h-7 text-secondary" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <CardTitle className="text-lg sm:text-xl leading-tight">
                          {dashboard.name}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                          <span className="font-medium">الوصف:</span>{" "}
                          {dashboard.description}
                        </CardDescription>

                        {/* المستفيد */}
                        {dashboard.beneficiary && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              المستفيد:
                            </span>
                            <Badge>{dashboard.beneficiary}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 bg-transparent text-base font-medium"
                    >
                      <a
                        href={dashboard.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        عرض لوحة المعلومات
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-secondary text-secondary-foreground py-6 mt-16 lg:mt-20">
        <div className="flex items-center justify-center mx-auto px-4">
          <div
            className="text-sm md:text-base font-medium text-center"
            dir="rtl"
          >
            <div>جميع الحقوق محفوظة لبرنامج تطوير وزارة الحرس الوطني</div>
            <div>© {currentYear}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
