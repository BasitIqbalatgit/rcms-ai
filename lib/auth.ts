import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./db/mongodb";
import User, { UserRole } from "./db/models/User";

// Define the user object structure returned from the authorization function
interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Extend the NextAuth User type to include role and id
interface CustomSessionUser extends NextAuthUser {
  id: string;
  role: UserRole;
}

// Extend JWT type to include custom properties
interface CustomJWT extends JWT {
  id?: string;
  role?: UserRole;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email.toLowerCase() });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return a plain object with just the needed properties
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          } as AuthUser;
        } catch (error) {
          console.error("Authentication error:", error);
          // Re-throw the error to be handled by NextAuth
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Type assertion with the AuthUser interface when user is provided
      if (user) {
        token.id = (user as AuthUser).id;
        token.role = (user as AuthUser).role;
      }
      return token as CustomJWT;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      
      if (customToken && session.user) {
        (session.user as CustomSessionUser).id = customToken.id as string;
        (session.user as CustomSessionUser).role = customToken.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/auth/session");
    if (!res.ok) {
      throw new Error(`Failed to fetch session: ${res.status}`);
    }
    const session = await res.json();
    return !!session.user;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export const getUserRole = async (): Promise<UserRole | null> => {
  try {
    const res = await fetch("/api/auth/session");
    if (!res.ok) {
      throw new Error(`Failed to fetch session: ${res.status}`);
    }
    const session = await res.json();
    return (session.user as CustomSessionUser)?.role || null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};