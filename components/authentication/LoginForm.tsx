"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";

// Define a type for our animation object
interface AnimationObject {
  x: number;
  y: number;
  rotate: number;
  xVelocity: number;
  yVelocity: number;
  rotateVelocity: number;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email"
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters long"
  })
});

export function LoginForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [animations, setAnimations] = useState<AnimationObject[]>([]);
  const animationRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
  }

  const colors = useMemo(() => [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ], []);

  const boxStyles = useMemo(() => {
    return colors.map(() => ({
      width: "20px",
      height: "20px",
    }));
  }, [colors]);

  // Initialize animations on mount only
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    // Client-side only code - initialize with window object
    if (typeof window !== 'undefined') {
      // Initialize animation objects without hooks
      const initialAnimations = colors.map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotate: Math.random() * 360,
        xVelocity: Math.random() * 5 - 2.5,
        yVelocity: Math.random() * 5 - 2.5,
        rotateVelocity: Math.random() * 5 - 2.5,
      }));

      setAnimations(initialAnimations);
    }
  }, [colors]);

  // Animation loop
  useEffect(() => {
    // Only run if we have animations to update
    if (animations.length === 0) return;

    const updateAnimations = () => {
      setAnimations(prevAnimations => 
        prevAnimations.map(anim => {
          const newX = anim.x + anim.xVelocity;
          const newY = anim.y + anim.yVelocity;
          const newRotate = anim.rotate + anim.rotateVelocity;

          let newXVelocity = anim.xVelocity;
          let newYVelocity = anim.yVelocity;

          if (newX < 0 || newX > window.innerWidth) {
            newXVelocity *= -1;
          }
          if (newY < 0 || newY > window.innerHeight) {
            newYVelocity *= -1;
          }

          return {
            ...anim,
            x: newX,
            y: newY,
            rotate: newRotate % 360,
            xVelocity: newXVelocity,
            yVelocity: newYVelocity,
          };
        })
      );

      animationRef.current = requestAnimationFrame(updateAnimations);
    };

    animationRef.current = requestAnimationFrame(updateAnimations);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animations]);

  return (
    <div className="relative p-0.5 rounded-lg w-75 md:w-96  md:max-w-md mx-auto">
      {/* Gradient border wrapper */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {animations.map((anim, index) => (
          <motion.div
            key={index}
            className={`absolute ${colors[index]} rounded-full`}
            style={{
              width: boxStyles[index].width,
              height: boxStyles[index].height,
              x: anim.x,
              y: anim.y,
              rotate: anim.rotate,
            }}
          />
        ))}
      </div>
      
      {/* White content area */}
      <motion.div 
        className="relative p-4 sm:p-8 bg-white rounded-lg shadow-xl"
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="bg-gray-50 border-gray-200"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Password" 
                      {...field} 
                      className="bg-gray-50 border-gray-200"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Sign In
              </Button>
            </motion.div>
            
            <div className="text-center mt-4">
              <Link 
                href="/signup" 
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Don't have an account? <span className="font-medium">Sign Up</span>
              </Link>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}