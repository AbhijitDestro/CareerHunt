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
import {
  Home,
  Briefcase,
  Building2,
  User,
  Settings,
  LogOut,
  FileText,
  Bell,
  Search,
} from 'lucide-react'

const AppSidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = React.useMemo(() => {
    const baseItems = [
      { title: 'Dashboard', icon: Home, href: '/dashboard' },
      { title: 'Profile', icon: User, href: '/profile' },
      { title: 'Settings', icon: Settings, href: '/settings' },
    ]

    if (user?.role === 'recruiter') {
      return [
        ...baseItems,
        { title: 'My Companies', icon: Building2, href: '/companies' },
        { title: 'My Jobs', icon: Briefcase, href: '/jobs' },
        { title: 'Applications', icon: FileText, href: '/applications' },
      ]
    } else if (user?.role === 'candidate') {
      return [
        ...baseItems,
        { title: 'Applied Jobs', icon: Briefcase, href: '/applied-jobs' },
        { title: 'Job Search', icon: Search, href: '/job-search' },
        { title: 'Companies', icon: Building2, href: '/companies' },
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
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
          <div className="space-y-2">
            <div className="px-3 py-2 text-sm text-gray-400">
              <p className="font-medium text-white">{user?.fullname}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar