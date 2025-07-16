"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
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
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">
              Contact
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Get in
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Touch
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Have questions? Want to learn more about AcAIA? 
              Feel free to contact us - we're here to help!
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
                  <MessageSquare className="h-5 w-6 mr-2" />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
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
                      placeholder="Describe your question or message..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base">
                    <Send className="h-4 w-4 mr-2" />
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
                    Here's how you can reach us
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">info@acaia.com</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">support@acaia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">+381 11 123 456</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">+381 60 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Knez Mihailova 1<br />
                        11000 Belgrade, Serbia
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl flex items-center">
                    <Clock className="h-5 w-6 mr-2" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                      <span className="font-semibold text-gray-900 dark:text-white">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                      <span className="font-semibold text-gray-900 dark:text-white">10:00 - 16:00</span>
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
                  We respond to most messages within 24 hours. For urgent cases, 
                  you can contact us by phone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">What are your business hours?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  We're available Monday to Friday from 9 AM to 6 PM, and Saturday from 10 AM to 4 PM.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-50 dark:bg-slate-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Do you offer technical support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Yes, we provide comprehensive technical support for all our services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 