import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, UsersIcon, TargetIcon, AwardIcon, HeartIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 sm:mb-8">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">
              About Us
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Changing the Way We Learn—
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Together
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              We believe everyone deserves access to quality education. Our mission is to turn AI into a tool that helps every learner achieve more.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TargetIcon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Innovation</CardTitle>
                <CardDescription>
                  We constantly push boundaries to make learning faster, easier, and more engaging.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HeartIcon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Accessibility</CardTitle>
                <CardDescription>
                  We make quality education available to anyone, anywhere.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <AwardIcon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Personalization</CardTitle>
                <CardDescription>
                  Everyone learns differently—so AcAIA adapts to you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Excellence</CardTitle>
                <CardDescription>
                  We hold ourselves to the highest standards in everything we create.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're a passionate team of educators, engineers, and innovators dedicated to transforming the way we learn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Team Member 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">AM</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Aleksandar Marković</CardTitle>
                <CardDescription className="text-base font-medium text-blue-600 dark:text-blue-400">
                  CEO & Co-Founder
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Former Google engineer with 10+ years in AI and education technology. Passionate about making learning accessible to everyone.
                </CardDescription>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GithubIcon className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <TwitterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">MJ</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Marija Jovanović</CardTitle>
                <CardDescription className="text-base font-medium text-purple-600 dark:text-purple-400">
                  CTO & Co-Founder
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4">
                  PhD in Computer Science with expertise in machine learning and educational psychology. Leads our AI development team.
                </CardDescription>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GithubIcon className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <TwitterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">NP</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Nikola Petrović</CardTitle>
                <CardDescription className="text-base font-medium text-green-600 dark:text-green-400">
                  Head of Product
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Former teacher with 15 years of classroom experience. Ensures our products meet real educational needs.
                </CardDescription>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GithubIcon className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <TwitterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 4 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">AS</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Ana Stojanović</CardTitle>
                <CardDescription className="text-base font-medium text-orange-600 dark:text-orange-400">
                  Lead Designer
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4">
                  UX/UI expert with a focus on educational interfaces. Creates intuitive and engaging learning experiences.
                </CardDescription>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GithubIcon className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <TwitterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 5 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">MD</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Marko Đorđević</CardTitle>
                <CardDescription className="text-base font-medium text-pink-600 dark:text-pink-400">
                  Senior Developer
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Full-stack developer with expertise in React, Node.js, and AI integration. Builds the core platform features.
                </CardDescription>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GithubIcon className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <TwitterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 6 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">SM</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Sara Milić</CardTitle>
                <CardDescription className="text-base font-medium text-indigo-600 dark:text-indigo-400">
                  Content Manager
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Educational content specialist with a background in curriculum development. Ensures quality learning materials.
                </CardDescription>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GithubIcon className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <TwitterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Together, we can transform the way we teach and learn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-sm sm:text-base">
              Start Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-sm sm:text-base">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 