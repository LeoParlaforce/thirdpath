import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Third Path Access",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Logique de vérification (exemple statique pour tester)
        // Plus tard, tu connecteras ta base de données ici
        if (credentials?.email === "leo@thirdpath.cloud" && credentials?.password === "ton_password_ultra_secure") {
          return { id: "1", name: "Leo", email: "leo@thirdpath.cloud" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login", // On personnalisera cette page plus tard
  },
})