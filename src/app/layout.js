// app/layout.js
export const metadata = {
  title: "Smart Fitness Planner 🏋️",   // Title on browser tab
  description: "Personalized diet & workout planner",
  icons: {
    icon: "/favicon", // place favicon inside /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
