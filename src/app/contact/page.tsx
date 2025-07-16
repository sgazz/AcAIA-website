"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MailIcon, PhoneIcon, MapPinIcon, SendIcon, MessageSquareIcon, ClockIcon } from "@/components/icons";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the logic for sending email
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent. We will respond as soon as possible.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              Contact
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Let&apos;s
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Talk
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Got a question or an idea? Reach out—we&apos;re here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl flex items-center">
                  <MessageSquareIcon className="h-5 w-6 mr-2" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    >
                      <option value="">Choose a subject</option>
                      <option value="general">General Questions</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Questions</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="Write your question or comment here..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base">
                    <SendIcon className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Contact Information</CardTitle>
                  <CardDescription>
                    You can also reach us here:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MailIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">info@acaia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">+381 11 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Belgrade, Serbia
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl flex items-center">
                    <ClockIcon className="h-5 w-6 mr-2" />
                    Working Hours
                  </CardTitle>
                  <CardDescription>
                    When we&apos;re available:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">Monday – Friday</span>
                      <span className="font-semibold text-gray-900 dark:text-white">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                      <span className="font-semibold text-gray-900 dark:text-white">10:00 AM – 2:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">How quickly do you respond to messages?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  We respond within 24 hours. For urgent cases, please call us.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Do you offer technical support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Yes, all users get technical support. Pro and Enterprise users receive priority.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Can I schedule a demo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Absolutely! Contact us and we&apos;ll arrange a demo that fits your schedule.
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
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of users already enjoying AcAIA.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-sm sm:text-base">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
} 