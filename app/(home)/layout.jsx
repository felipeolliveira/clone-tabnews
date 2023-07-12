import "./styles.css";

export const metadata = {
  title: "clone tabnews",
  description: "only for study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
