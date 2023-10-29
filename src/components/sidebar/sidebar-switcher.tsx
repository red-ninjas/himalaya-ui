'use client';
import MenuIcon from '../icons/menu';
import Button from '../button';
import { useConfigs } from '../use-context/config-context';
import useSidebar from '../use-sidebar';
import useLayout from '../use-layout';

export const SidebarSwitcher: React.FC = () => {
  const { isMobile } = useConfigs();
  const { setIsEnabled } = useSidebar();
  const layout = useLayout();

  const activateSidebar = () => {
    setIsEnabled(true);
  };
  return (
    <div className="sidebar-button-outer">
      {isMobile && (
        <Button className="sidebar-button" auto type="abort" onClick={() => activateSidebar()}>
          <MenuIcon size="1.125rem" />
        </Button>
      )}
      <style jsx>{`
        .sidebar-button-outer {
          display: none;
        }
        .sidebar-button-outer :global(.sidebar-button) {
          display: flex;
          align-items: center;
          min-width: 40px;
          height: 40px;
          padding: 0;
        }

        @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
          .sidebar-button-outer {
            display: inline-block;
          }
        }
      `}</style>
    </div>
  );
};

export default SidebarSwitcher;
