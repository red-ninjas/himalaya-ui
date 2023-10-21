import React from 'react'
import MobileMenu from './mobile-menu'
import NavigationItem from './item'
import NavigationGroup from './group'

export type INavigationItem = {
  title?: string
  url?: string
  desc?: string
  icon?: React.ReactNode
  exactMatch?: boolean
}

export type MobileMenuProps = {
  isSwipeable?: boolean
  direction?: 'left' | 'right'
  animationTime?: number
  showButton?: boolean
}

export type MobileMenuButtonProps = {
  notHiding?: boolean
  toggleMenu?: () => void
}

export type NavigationItemComponentType = typeof NavigationItem
export type NavigationGroupComponentType = typeof NavigationGroup

export type MobileNavigationComponentType = typeof MobileMenu & {
  Item: NavigationItemComponentType
  Group: NavigationGroupComponentType
}
;(MobileMenu as MobileNavigationComponentType).Item =
  NavigationItem as NavigationItemComponentType
;(MobileMenu as MobileNavigationComponentType).Group =
  NavigationGroup as NavigationGroupComponentType

export { default as MobileMenuButton } from './mobile-menu-button'
export default MobileMenu as MobileNavigationComponentType
