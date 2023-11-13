type AppSidebarItemType = {
    id: number;
    name: string;
    iconName: string;
    pathName: string;
}

const AppSidebarItem: AppSidebarItemType[] = [
    {
        id: 1,
        name: "Dashboard",
        pathName: "/app",
        iconName: "dashboard"
    },
    {
        id: 2,
        name: "Transactions",
        pathName: "/app/transactions",
        iconName: "wallet"
    },
    {
        id: 3,
        name: "Budget",
        pathName: "/app/budget",
        iconName: "piechart"
    },
    {
        id: 4,
        name: "Settings",
        pathName: "/app/settings",
        iconName: "settings"
    },
]