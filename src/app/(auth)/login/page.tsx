"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/cypresslogo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { LoginFormSchema } from "@/lib/types";
import { Loader } from "lucide-react";

const LoginPage = () => {
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = async (
    formData
  ) => {};

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] gap-5 flex flex-col"
      >
        <div
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image src={Logo} alt="cypress Logo" width={50} height={50} />
          <span
            className="font-semibold
          dark:text-white text-3xl first-letter:ml-3"
          >
            ServeYouApps.
          </span>
        </div>
        <FormDescription
          className="
        text-foreground/60"
        >
          Internal Admin Portal.
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? "Login" : <Loader />}
        </Button>
        {/* <span className="self-container">
          Dont have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span> */}
      </form>
    </Form>
  );
};

export default LoginPage;
