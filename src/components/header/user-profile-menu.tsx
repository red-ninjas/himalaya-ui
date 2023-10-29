'use client';

import Avatar from '../avatar';
import Popover from '../popover';
import useScale, { withScale } from '../use-scale';
import React, { PropsWithChildren } from 'react';

export interface UserProfileMenuProps {
  name?: string;
}
const UserProfileComponent: React.FC<PropsWithChildren<UserProfileMenuProps>> = ({ children, name }) => {
  const userProfileMenu = () => children;
  const { SCALES } = useScale();

  return (
    <div className="user-profile-menu">
      <Popover className="menu-popover" offset={8} ml={3} placement="bottomEnd" trigger="click" enterDelay={0} leaveDelay={0} content={userProfileMenu}>
        <Avatar text={name} scale={1.2}></Avatar>
      </Popover>
      <style jsx>{`
        :global(.menu-popover) {
          display: inline-flex !important;
        }
        .user-profile-menu {
          display: inline-flex;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  );
};

const UserProfileMenu = withScale(UserProfileComponent);
export default UserProfileMenu;
