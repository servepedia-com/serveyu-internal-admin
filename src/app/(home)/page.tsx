"use client";
import { ProfileAvatar } from "@/components/global/ProfileAvatar";
import Image from "next/image";
import Logo from "../../../public/cypresslogo.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import CustomerListing from "./components/CustomerListing";
export default function Home() {
  const [section, setSection] = useState("customer");
  return (
    <main className="h-screen overflow-y-auto">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-background dark:to-background pb-24 pt-10  px-8 sm:px-24  ">
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
            <TabsList className="bg-transparent dark:bg-gray-800 gap-6">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent
              value="customer"
              className="absolute top-14 w-full  h-[70vh] shadow-lg rounded-lg text-black z-10"
            >
              <CustomerListing />
            </TabsContent>
            <TabsContent
              value="settings"
              className="absolute top-14 w-full bg-background  h-[70vh] dark:text-white border shadow-lg rounded-lg p-4 text-black z-10"
            >
              Change your password here.
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
