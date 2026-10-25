import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Nepal Together | Flood Recovery', description: 'A Nepal flood recovery campaign in preparation. Explore recovery priorities, original reporting, and our approach to transparent giving.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
