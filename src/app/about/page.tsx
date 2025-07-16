import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, UsersIcon, TargetIcon, AwardIcon, HeartIcon } from "@/components/icons";
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