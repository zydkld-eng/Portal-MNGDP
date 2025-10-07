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
  Database,
  BarChart3,
  Settings,
  Users as UsersIcon, // ⬅️ avoid clash with your user data
  FileText,
  CreditCard,
  Headphones,
  ArrowLeft,
  Menu,
  X,
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

  const systems = [
    {
      name: "نظام إدارة المشاريع",
      icon: Building2,
      description: "الوصف",
      href: "#",
    },
    {
      name: "نظام التذاكر",
      icon: Settings,
      description: "الوصف",
      href: "https://tickets.mngdp.com/",
    },
    { name: "نظام إنجاز", icon: UsersIcon, description: "الوصف", href: "#" },
    {
      name: "نظام إدارة المجالس",
      icon: FileText,
      description: "الوصف",
      href: "#",
    },
  ];

  const dashboards = [
    { name: "لوحة المعلومات الخضراء", icon: CreditCard, description: "الوصف" },
    {
      name: "لوحة معلومات الخطة التفصيلية",
      icon: BarChart3,
      description: "الوصف",
    },
    { name: "لوحة خطة التحول", icon: Database, description: "الوصف" },
    { name: "لوحة إضافية", icon: Headphones, description: "الوصف" },
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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/mngdp-logo.png"
                alt="شعار البوابة الموحدة"
                width={40}
                height={40}
                className="rounded-full flex-shrink-0 sm:w-[44px] sm:h-[44px]"
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

      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
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
                          {system.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button
                      onClick={() => router.push(system.href)}
                      className="w-full h-12 bg-transparent text-base font-medium"
                      variant="outline"
                    >
                      الوصول إلى النظام
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
                لوحات التحليلات
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl">
                مراقبة الأداء والحصول على رؤى عبر الأقسام
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
                          {dashboard.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-medium">
                      عرض لوحة المعلومات
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-secondary text-secondary-foreground mt-16 lg:mt-20">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/mngdp-logo.png"
                alt="شعار البوابة الموحدة"
                width={36}
                height={36}
                className="rounded-full flex-shrink-0"
              />
              <div className="text-center sm:text-right">
                <p className="font-semibold text-base lg:text-lg">
                  البوابة الموحدة لأنظمة برنامج التطوير
                </p>
                <p className="text-sm lg:text-base opacity-90 mt-1">
                  © ٢٠٢٥ جميع الحقوق محفوظة
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
