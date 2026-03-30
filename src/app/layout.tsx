import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProps, AuthProvider } from '@/context/AuthContext';

import { cookies } from 'next/headers';
import { Token } from '@/models/Token';
import { getInitialUsername } from '@/utils/transform/getInitialUsername';

const outfit = Outfit({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const tokenObj = new Token(cookieStore.get('access_token')?.value);

  const AuthProps: AuthProps = {
    name: 'Donny Fadhillah',
    username: await tokenObj.getUsername() ?? "",
    initial: '',
    email: 'donny.fadhillah@traxify.com'
  }

  AuthProps.initial = getInitialUsername(AuthProps.username);

  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider AuthProps={AuthProps}>
            <SidebarProvider>{children}</SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
