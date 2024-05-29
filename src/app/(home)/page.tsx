"use client";
import { ProfileAvatar } from "@/components/global/ProfileAvatar";
import Image from "next/image";
import Logo from "../../../public/cypresslogo.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
export default function Home() {
  const [section, setSection] = useState("customer");
  return (
    <main className=" min-h-screen">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 pb-24 pt-10  px-8 sm:px-24  ">
        <section className="flex flex-col gap-3 sm:max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div
              className="
          w-full
          flex
          justify-left
          items-center"
            >
              <Image src={Logo} alt="cypress Logo" width={35} height={35} />
              <span
                className="font-semibold
          text-white text-lg first-letter:ml-3"
              >
                ServeYouApps.
              </span>
            </div>
            <ProfileAvatar />
          </div>
          <Separator className="bg-gray-100" />
          <Tabs
            className="w-full relative"
            value={section}
            onValueChange={(s) => {
              setSection(s);
            }}
          >
            <TabsList className="bg-transparent gap-6">
              <TabsTrigger value="customer" className="text-white">
                Customer
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-white">
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="customer"
              className="absolute top-14 w-full bg-white h-96 shadow-lg rounded-lg p-4 text-black z-10"
            >
              Make changes to your account here.
            </TabsContent>
            <TabsContent
              value="settings"
              className="absolute top-14 w-full bg-white h-96 shadow-lg rounded-lg p-4 text-black z-10"
            >
              Change your password here.
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
