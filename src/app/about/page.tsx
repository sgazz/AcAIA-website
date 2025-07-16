import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Award, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 sm:mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">
              About Us
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Our Mission is to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Transform Learning
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              We believe everyone deserves access to quality education. 
              Our platform combines the latest AI technology with pedagogical principles 
              to create a personalized learning experience.
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
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              We are driven by clear principles that move us forward
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Innovation</CardTitle>
                <CardDescription>
                  We constantly explore new ways to improve the learning experience through AI technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">User First</CardTitle>
                <CardDescription>
                  Every decision we make is based on the needs and desires of our users
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Quality</CardTitle>
                <CardDescription>
                  We are committed to providing the highest quality in everything we do
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Meet the people behind the AcAIA platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">AI Team</CardTitle>
                <CardDescription>
                  Machine learning and artificial intelligence experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Pedagogical Team</CardTitle>
                <CardDescription>
                  Educational experts and teachers with years of experience
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 dark:bg-slate-700 sm:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Development Team</CardTitle>
                <CardDescription>
                  Full-stack developers and UX/UI designers
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Join our mission
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Together we can transform the way we learn and teach
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