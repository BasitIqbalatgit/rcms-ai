import * as React from "react"
import {  
  Sparkles,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
// import { createClient } from "@/lib/supabase/server"




export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const supabase = await createClient();
//   const {data} = await supabase.auth.getUser();

//   const user = {
//     name : data.user?.user_metadata.full_name || 'Basit Iqbal',
//     email : data.user?.email ?? "",
//   }
  const user = {
    name : 'Basit Iqbal',
    email :  "",
  }

  return (
    <Sidebar collapsible="icon" {...props} >
      
      <SidebarHeader>
      <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent bg-blue-200 data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  RCMS AI
                </span>
                <span className="truncate text-xs">Pro</span>
              </div>
            </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain  />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}