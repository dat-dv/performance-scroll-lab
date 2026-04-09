import { Breadcrumb } from "../breadcrumbs";
import { ThemeToggle } from "../theme-toggle";

const Header = () => {
  return (
    <div className="border-border-primary bg-footer-bg fixed inset-x-0 top-0 z-[100] border-b shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Breadcrumb />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
