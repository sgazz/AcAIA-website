import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  StarIcon, 
  ArrowRightIcon, 
  BrainIcon, 
  BookOpenIcon, 
  UsersIcon, 
  ZapIcon, 
  ShieldIcon 
} from "@/components/icons";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 text-xs sm:text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <StarIcon className="w-3 h-3 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Latest AI Technology
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight tracking-tight">
              AcAIA – Your AI Assistant in
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                Learning
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto px-4 leading-relaxed">
              Meet an AI assistant that makes learning simpler, smarter, and unforgettable. Chat, practice, prepare for exams, and plan your career—all in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                Start Free
                <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Why Students and Teachers Choose AcAIA
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
              AcAIA combines cutting‑edge AI with proven learning methods. The result is a truly personal learning experience—built around your pace, your goals, and your style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* AI Chat Assistant */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <BrainIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">AI Chat Assistant</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Ask any question and get clear, instant answers. Our AI understands context and guides you through your learning journey.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Problem Generation */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <BookOpenIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Problem Generation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Practice with tasks designed just for you—challenging enough to help you grow, never overwhelming.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Exam Simulations */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <ZapIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Exam Simulations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Step into realistic exam settings, sharpen your skills under pressure, and receive detailed feedback.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Career Guidance */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <UsersIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Career Guidance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Based on your skills and interests, AcAIA suggests learning paths and career directions that fit you best.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Security & Privacy */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <ShieldIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Enterprise-grade security with end-to-end encryption ensuring your data remains private and protected.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Analytics & Tracking */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <StarIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Analytics & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Advanced progress tracking with intelligent insights and personalized recommendations for optimal learning.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            Ready to Make Learning Simple?
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students and teachers who have already discovered a smarter way to learn with AcAIA.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group">
            Start Your Journey
            <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>
      </section>
    </div>
  );
}
