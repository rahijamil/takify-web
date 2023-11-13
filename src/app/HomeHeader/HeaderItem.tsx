type HeaderItemType = {
    id: number;
    name: string;
    pathName: string;
    children?: HeaderItemType[]
}

export const HeaderItems: HeaderItemType[] = [
    // {
    //     id: 1,
    //     name: "Download",
    //     pathName: "/download",
    //     children: [
    //         {
    //             id: 1,
    //             name: "Android",
    //             pathName: "/download/mobile"
    //         },
    //         {
    //             id: 2,
    //             name: "Desktop",
    //             pathName: "/download/desktop"
    //         },
    //         {
    //             id: 3,
    //             name: "Extention",
    //             pathName: "/download/web"
    //         }
    //     ]
    // },
    // {
    //     id: 2,
    //     name: "Track",
    //     pathName: "#",
    //     children: [
    //         {
    //             id: 1,
    //             name: "Expenses",
    //             pathName: "/track/expenses"
    //         },
    //         {
    //             id: 2,
    //             name: "Incomes",
    //             pathName: "/track/incomes"
    //         },
    //         {
    //             id: 3,
    //             name: "Debt",
    //             pathName: "/track/debt"
    //         }
    //     ]
    // },
    // {
    //     id: 3,
    //     name: "Budget",
    //     pathName: "/budget",
    // }
]