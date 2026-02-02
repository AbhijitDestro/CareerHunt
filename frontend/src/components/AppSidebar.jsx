import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import {
  Home,
  Briefcase,
  Building2,
  User,
  LogOut,
  Bell,
  Search,
  Bookmark,
} from 'lucide-react'

const AppSidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = React.useMemo(() => {
    const baseItems = [
      { title: 'Dashboard', icon: Home, href: '/dashboard' },
      { title: 'Profile', icon: User, href: '/profile' },
    ]

    if (user?.role === 'recruiter') {
      return [
        ...baseItems,
        { title: 'My Companies', icon: Building2, href: '/admin/companies' },
        { title: 'My Jobs', icon: Briefcase, href: '/admin/jobs' },
        { title: 'Notifications', icon: Bell, href: '/notifications' },
      ]
    } else if (user?.role === 'candidate') {
      return [
        ...baseItems,
        { title: 'Applied Jobs', icon: Briefcase, href: '/applied-jobs' },
        { title: 'Saved Jobs', icon: Bookmark, href: '/saved-jobs' },
        { title: 'Job Search', icon: Search, href: '/job-search' },
        { title: 'Notifications', icon: Bell, href: '/notifications' },
      ]
    }

    return baseItems
  }, [user?.role])

  const handleNavigation = (href) => {
    navigate(href)
  }

  const handleLogout = () => {
    logout(navigate)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src="/logo.png" alt="logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">CareerHunt</h2>
              <p className="text-gray-400 text-sm capitalize">{user?.role} Portal</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

        <SidebarFooter>
          <div className="flex items-center gap-1">
          <div> 
            <Avatar className="w-8 h-8">
              <AvatarImage className='w-full h-full object-cover'
                src={user?.profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} 
                alt={user?.fullname || 'User Avatar'} 
              />
              <AvatarFallback>
                {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            </div>
            <div className="px-2 py-2 text-sm text-gray-400">
              <p className="font-medium text-white">{user?.fullname}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
            </div>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="cursor-pointer hover:text-red-500">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
