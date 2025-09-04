import "./globals.css";
import Header from "./components/Header/Header.jsx";

export const metadata = {
  title: "Jobsy",
  description: "jobsy || find your job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Header />
          {children}
      </body>
    </html>
  );
}
