import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Star, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
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
              Pricing
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Simple and
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Transparent Pricing
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Choose the plan that best fits your needs. 
              All plans include a free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Free Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">Free</CardTitle>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  €0
                  <span className="text-base sm:text-lg font-normal text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <CardDescription>
                  Perfect for beginners who want to try the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>5 AI chat messages per day</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>3 generated problems</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  Start Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white text-xs">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">Pro</CardTitle>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  €19
                  <span className="text-base sm:text-lg font-normal text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <CardDescription>
                  For active learners who want advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Unlimited AI chat messages</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>50 generated problems</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Exam simulations</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Career guidance</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base">
                  Start Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">Enterprise</CardTitle>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  €49
                  <span className="text-base sm:text-lg font-normal text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <CardDescription>
                  For institutions and teams who want all features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Everything from Pro plan</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Unlimited generation</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Team management</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center text-sm sm:text-base">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Answers to common questions about our pricing
            </p>
          </div>

          <div className="space-y-4 sm:space-y-8">
            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Can I change my plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Yes, you can change your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Yes, all plans include a 14-day free trial.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">How does cancellation work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of users who already use AcAIA
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-sm sm:text-base">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
} 