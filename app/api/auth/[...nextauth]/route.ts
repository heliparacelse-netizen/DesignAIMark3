import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'designai-secret-2026',
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        return { id: '1', email: credentials.email, name: credentials.email.split('@')[0], plan: 'free', freeGenerationsUsed: 0 }
      },
    }),
  ],
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' as const },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) { token.plan = user.plan || 'free'; token.freeGenerationsUsed = user.freeGenerationsUsed || 0 }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) { session.user.plan = token.plan; session.user.freeGenerationsUsed = token.freeGenerationsUsed }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
