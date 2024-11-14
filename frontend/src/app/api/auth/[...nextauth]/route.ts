import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Import the separated authOptions

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST methods
export { handler as GET, handler as POST };
