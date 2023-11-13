type HeaderItemType = {
    id: number;
    name: string;
    pathName: string;
    children?: HeaderItemType[]
}

export const HeaderItems: HeaderItemType[] = [
    {
        id: 1,
        name: "Track",
        pathName: "#",
        children: [
            {
                id: 1,
                name: "Expenses",
                pathName: "#"
            },
            {
                id: 2,
                name: "Incomes",
                pathName: "#"
            },
            {
                id: 3,
                name: "Debt",
                pathName: "#"
            },
        ]
    },
    {
        id: 2,
        name: "Download",
        pathName: "/download",
        children: [
            {
                id: 1,
                name: "Android",
                pathName: "/android"
            },
            {
                id: 2,
                name: "Web",
                pathName: "/app"
            },
        ]
    },
    {
        id: 3,
        name: "Budget",
        pathName: "#"
    }
]