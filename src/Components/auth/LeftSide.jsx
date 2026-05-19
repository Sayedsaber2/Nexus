import { Bell, FileText, Image, MessageCircle, MessageSquare, Users } from "lucide-react";
import profile from "../../assets/sayed.jpg";

import React from "react";
import {motion} from "framer-motion";
export default function LeftSide() {
    return <motion.div
    
          initial={{opacity: 0, x: -60}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.4}}
        >
          <div className=" md:flex flex-col justify-start text-white space-y-5 pl-0 pr-6 max-w-lg">
            {/* MAIN TEXT */}
            <div>
              <h1 className="text-5xl font-bold leading-[1.1]">
                Connect with sdfsdfsdfsfsfsfdsf<br />
                <span className="text-[#7C5CFC]">amazing people</span>
              </h1>
              <p className="text-gray-200 mt-3 text-md max-w-md leading-relaxed">
                Build real connections, share your moments, and stay in sync
                with what matters most.{" "}
                <span className="bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8] bg-clip-text text-transparent font-bold">
                  NEXUS
                </span>{" "}
                brings conversations, communities, and creativity together in
                one seamless experience.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4">
              {/* CHAT */}
              <div
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 
  hover:bg-white/10 hover:border-[#7C5CFC]/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#7C5CFC]/30"
              >
                <MessageSquare className="text-[#7C5CFC]" size={20} />
                <div>
                  <p className="text-sm font-medium text-white">Instant Chat</p>
                  <p className="text-xs text-gray-400">Real-time messaging</p>
                </div>
              </div>

              {/* MEDIA */}
              <div
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 
  hover:bg-white/10 hover:border-[#FC5CA8]/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#FC5CA8]/30"
              >
                <Image className="text-[#FC5CA8]" size={20} />
                <div>
                  <p className="text-sm font-medium text-white">
                    Share Moments
                  </p>
                  <p className="text-xs text-gray-400">Photos & videos</p>
                </div>
              </div>

              {/* ALERTS */}
              <div
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 
      hover:bg-white/10 hover:border-[#00E5CC]/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#00E5CC]/30"
              >
                <Bell className="text-[#00E5CC]" size={20} />
                <div>
                  <p className="text-sm font-medium text-white">Smart Alerts</p>
                  <p className="text-xs text-gray-400">Stay always updated</p>
                </div>
              </div>

              {/* COMMUNITY */}
              <div
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 
        hover:bg-white/10 hover:border-[#7C5CFC]/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#7C5CFC]/30"
              >
                <Users className="text-[#7C5CFC]" size={20} />
                <div>
                  <p className="text-sm font-medium text-white">Communities</p>
                  <p className="text-xs text-gray-400">Find your people</p>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="flex gap-8">
              {/* USERS */}
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-2 rounded-lg bg-[#7C5CFC]/10 group-hover:bg-[#7C5CFC]/20 transition">
                  <Users className="text-[#7C5CFC]" size={20} />
                </div>
                <div>
                  <motion.h3
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                    className="text-2xl font-bold text-[#7C5CFC]"
                  >
                    2M+
                  </motion.h3>
                  <p className="text-sm text-gray-400">Active Users</p>
                </div>
              </div>

              {/* POSTS */}
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-2 rounded-lg bg-[#FC5CA8]/10 group-hover:bg-[#FC5CA8]/20 transition">
                  <FileText className="text-[#FC5CA8]" size={20} />
                </div>
                <div>
                  <motion.h3
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.6}}
                    className="text-2xl font-bold text-[#FC5CA8]"
                  >
                    10M+
                  </motion.h3>
                  <p className="text-sm text-gray-400">Posts</p>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-2 rounded-lg bg-[#00E5CC]/10 group-hover:bg-[#00E5CC]/20 transition">
                  <MessageCircle className="text-[#00E5CC]" size={20} />
                </div>
                <div>
                  <motion.h3
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.6}}
                    className="text-2xl font-bold text-[#00E5CC]"
                  >
                    500M+
                  </motion.h3>
                  <p className="text-sm text-gray-400">Messages</p>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL */}
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10 max-w-lg hover:bg-white/10 transition hover:shadow-[0_0_20px_rgba(124,92,252,0.25)]">
              <p className="text-sm text-gray-200 italic leading-relaxed">
                Building{" "}
                <span className="bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8] bg-clip-text text-transparent font-bold">
                  NEXUS
                </span>{" "}
                has been all about creating a smooth, fast, and enjoyable
                experience where people actually love to connect.
              </p>

              <div className="flex items-center gap-2 mt-2">
                {/* IMAGE PLACE */}
                <img
                  src={profile}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-semibold">Sayed Saber</p>
                  <p className="text-xs text-gray-400">Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
  ;
}
