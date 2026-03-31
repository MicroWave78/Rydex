'use client'
import TitleSubtitle from "@/components/titleSubtitle";
import { CircleDollarSign, Gem, Tag, Car, ShieldCheck, Cpu, Wrench, Calendar, ShieldQuestionMark, Component } from "lucide-react";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import {useInView} from "react-intersection-observer";





export default function About() {
  const [start, setStart] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true, // only animate once
    threshold: 0.3,    // % of element visible before triggering
  });

  useEffect(() => {
    if (inView) {
      setStart(true);
    }
  }, [inView]);
  
  return (
    <div className="w-full flex flex-col mt-16">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 backdrop-blur-xs" />
      </div>
      <section className="min-h-[calc(100vh-90px)] md:min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        
        <TitleSubtitle 
          title="About Rydex"
          subtitle="Premium car rental experience, redefined." />

      </section>
      

       <div className="w-full bg-[#31363F] text-[#EEEEEE] p-1 rounded-t-lg">
          {/* Story */}
          <div className="flex flex-col w-full items-center p-6">
            <h1 className="text-2xl md:text-4xl font-semibold">Our Story</h1>
            <p className="text-md md:text-lg">Rydex was created to simplify the way people rent cars. No complicated processes, no hidden fees — just a smooth experience from search to drive.</p>

            <div className="w-full py-5 px-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-5 p-4 text-base md:text-lg">

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <CircleDollarSign className="w-8 h-8 mb-4" />
                  <h3 className="font-semibold">Special Financing Offers</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <Gem className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Trusted Car Dealership</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <Tag className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Transparent Pricing</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <Car className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Expert Car Service</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col w-full items-center p-6">
            <h1 className="text-2xl md:text-4xl font-semibold">Our Mission</h1>
            <p className="text-md md:text-lg">To provide a seamless and enjoyable car rental experience that exceeds our customers' expectations, making every journey memorable.</p>
          </div>

          <div className="flex flex-col w-full items-center p-6">
            <h1 className="text-2xl md:text-4xl font-semibold">Our Vision</h1>
            <p className="text-md md:text-lg">To be the leading car rental service, known for our exceptional customer service, diverse fleet, and commitment to sustainability.</p>
          </div>

          {/* Values */}
          <div className="flex flex-col w-full items-center p-6">
            <h1 className="text-2xl md:text-4xl font-semibold">Our Values</h1>

            <div className="w-full py-4 px-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-5 p-4 text-base md:text-lg">

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <CircleDollarSign className="w-8 h-8 mb-4" />
                  <h3 className="font-semibold">Customer Satisfaction</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <ShieldCheck className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Integrity</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <Cpu className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Innovation</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <Car className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Sustainability</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>

                <div className="flex flex-col mx-auto items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] lg:col-start-2 lg:col-span-2 shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
                  <Wrench className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Teamwork</h3>
                  <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Why is rydex best */}
          <div className="flex flex-col w-full items-center p-6">
            <h1 className="text-2xl md:text-4xl font-semibold">Why is Rydex the Best Choice?</h1>

            <div className="w-full px-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-5 py-4 text-base md:text-lg">

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
                  <ShieldQuestionMark className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">No Hidden Fees</h3>
                  <p className="text-sm md:text-base">We believe in transparent pricing. No surprise charges at checkout.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
                  <Calendar className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Fast booking</h3>
                  <p className="text-sm md:text-base">Book your car in just a few simple steps.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
                  <Car className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Wide variety of cars</h3>
                  <p className="text-sm md:text-base">Choose from a wide range of vehicles to suit your needs.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
                  <Component className="w-8 h-8 mb-4"/>
                  <h3 className="font-semibold">Clean UI</h3>
                  <p className="text-sm md:text-base">Intuitive design for a better user experience.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="w-[50vw] px-4 py-6 mx-auto">
            <h1 className="w-full text-center text-2xl md:text-4xl font-semibold">Our Achievements</h1>
            
            <div ref = {ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 py-4 text-base md:text-lg">
              <div className="flex flex-col text-center gap-4">
                <div
                className="w-40 h-40 flex flex-col md:mx-auto items-center justify-center text-center rounded-full border-2 shadow-2xl hover:shadow-[#76ABAE] border-[#76ABAE] duration-500 ease-out">
                  <h3 className="font-semibold">
                    {start && <CountUp start={0} end={10000} duration={4} />}+ Bookings
                  </h3>
                </div>
                <p className="text-sm lg:text-lg">Rydex proudly serves over 10,000 satisfied customers!</p>
              </div>

              <div className="flex flex-col text-center gap-4">
                <div  
                className="w-40 h-40 flex flex-col md:mx-auto items-center justify-center text-center rounded-full border-2 shadow-2xl hover:shadow-[#76ABAE] border-[#76ABAE] duration-500 ease-out">
                  <h3 className="font-semibold">
                    {start && <CountUp start={0} end={500} duration={4} delay={3.7} />}+ Cars
                  </h3>
                </div>
                <p className="text-sm lg:text-lg">Our fleet boasts over 500 vehicles, ensuring the perfect ride for every customer.</p>
              </div>

              <div className="flex flex-col text-center gap-4">
                <div 
                className="w-40 h-40 flex flex-col md:mx-auto items-center justify-center text-center rounded-full border-2 shadow-2xl hover:shadow-[#76ABAE] border-[#76ABAE] duration-500 ease-out">
                  <h3 className="font-semibold">
                    {start && <CountUp start={0} end={98} duration={2} delay={7.3} />}% Customer Satisfaction
                  </h3>
                </div>
                <p className="text-sm lg:text-lg">We are proud to maintain a 98% customer satisfaction rate!</p>
              </div>
              
            </div>
          </div>

       </div>
      
    </div>
  );
}