import Container from "../container";
import Tab from "./tab";
import ThemeChanger from "./themeChanger";

export default function Header() {
  return (
    <div className="sticky z-50 inset-0 w-screen mt-8 p-2 flex justify-center bg-white dark:bg-black">
      <Container className="flex items-center">
        <Tab path="/">Home</Tab>
        <Tab path="/projects">Projects</Tab>
        <Tab path="/blog">Blog</Tab>

        <div className="flex-grow" />

        <ThemeChanger />
      </Container>
    </div>
  );
}
