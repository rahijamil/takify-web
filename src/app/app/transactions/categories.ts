import { MdChair, MdFastfood, MdPets, MdFavorite, MdGamepad, MdCardGiftcard, MdCalendarToday, MdCreditCard, MdLightbulb, MdHome, MdSportsBasketball, MdPalette, MdFlight, MdRestaurant, MdWork, MdAttachMoney, MdAccountBalance, MdHomeWork, MdVolunteerActivism, MdSchool  } from 'react-icons/md';
import { AiFillCar, AiOutlineScan } from 'react-icons/ai';
import { BsPersonHeart } from 'react-icons/bs';
import { BiMaleFemale } from 'react-icons/bi';
import { RiVisaFill } from 'react-icons/ri';
import { FaCcMastercard } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';

export type Category = {
    id: string;
    name: string;
    icon: React.ComponentType;
}

export type CategoryGroup = {
    id: string;
    name: string;
    icon: React.ComponentType;
    categories: Category[];
};

export const EXPENSE_CATEGORY_GROUPS: CategoryGroup[] = [
    {
        id: 'living',
        name: 'Living Expenses',
        icon: MdChair,
        categories: [
            {
                id: '1',
                name: "Food",
                icon: MdFastfood,
            },
            {
                id: '2',
                name: 'Pets',
                icon: MdPets,
            },
            {
                id: '3',
                name: 'Transport',
                icon: AiFillCar,
            },
            {
                id: '4',
                name: 'Health',
                icon: MdFavorite,
            }
        ],
    },
    {
        id: 'personal',
        name: 'Personal',
        icon: BsPersonHeart,
        categories: [
            {
                id: '5',
                name: 'Entertainment',
                icon: MdGamepad,
            },
            {
                id: '6',
                name: 'Gifts',
                icon: MdCardGiftcard,
            }
        ]
    },
    {
        id: 'daily',
        name: 'Daily Expenses',
        icon: MdCalendarToday,
        categories: [
            {
                id: '7',
                name: 'Groceries',
                icon: MdCreditCard,
            },
            {
                id: '8',
                name: 'Utilities',
                icon: MdLightbulb,
            },
            {
                id: '9',
                name: 'Household Items',
                icon: MdHome,
            },
            {
                id: '10',
                name: 'Personal Care',
                icon: BiMaleFemale,
            }
        ],
    },
    {
        id: 'recreation',
        name: 'Recreation',
        icon: MdSportsBasketball,
        categories: [
            {
                id: '11',
                name: 'Sports',
                icon: MdSportsBasketball,
            },
            {
                id: '12',
                name: 'Hobbies',
                icon: MdPalette,
            },
            {
                id: '13',
                name: 'Travel',
                icon: MdFlight,
            },
            {
                id: '14',
                name: 'Dining Out',
                icon: MdRestaurant,
            }
        ],
    },
    {
        id: 'financial',
        name: 'Financial',
        icon: "finance",
        categories: [
            {
                id: '15',
                name: 'Savings',
                icon: 'bank',
            },
            {
                id: '16',
                name: 'Investments',
                icon: 'trending-up',
            },
            {
                id: '17',
                name: 'Insurance',
                icon: 'shield-account',
            },
            {
                id: '18',
                name: 'Taxes',
                icon: 'file-document',
            }
        ],
    },
    {
        id: 'education',
        name: 'Education',
        icon: "school",
        categories: [
            {
                id: '19',
                name: "Tuition",
                icon: "book-open-variant",
            },
            {
                id: '20',
                name: 'Books & Supplies',
                icon: 'bookshelf',
            },
            {
                id: '21',
                name: 'Online Courses',
                icon: 'laptop',
            },
            {
                id: '22',
                name: 'Seminars',
                icon: 'book',
            }
        ],
    },
    {
        id: 'clothing',
        name: 'Clothing & Accessories',
        icon: "tshirt-crew",
        categories: [
            {
                id: '23',
                name: 'Clothing',
                icon: 'hanger',
            },
            {
                id: '24',
                name: 'Footwear',
                icon: 'shoe-formal',
            },
            {
                id: '25',
                name: 'Jewelry',
                icon: 'diamond-stone',
            },
            {
                id: '26',
                name: 'Accessories',
                icon: 'watch',
            }
        ],
    },
    {
        id: 'leisure',
        name: 'Leisure & Hobbies',
        icon: "emoticon-excited-outline",
        categories: [
            {
                id: '27',
                name: 'Movies & Theater',
                icon: 'filmstrip',
            },
            {
                id: '28',
                name: 'Concerts',
                icon: 'music-circle',
            },
            {
                id: '29',
                name: 'Sporting Events',
                icon: 'ticket-confirmation',
            },
            {
                id: '30',
                name: 'Arts & Crafts',
                icon: 'palette-advanced',
            }
        ],
    },
    {
        id: 'technology',
        name: 'Technology & Gadgets',
        icon: "cellphone-link",
        categories: [
            {
                id: '31',
                name: 'Electronics',
                icon: 'television-classic',
            },
            {
                id: '32',
                name: 'Software',
                icon: 'file-cabinet',
            },
            {
                id: '33',
                name: 'Mobile Apps & Services',
                icon: 'cellphone-settings',
            },
            {
                id: '34',
                name: 'Gadgets',
                icon: 'gamepad-variant-outline',
            }
        ],
    },
    {
        id: 'beauty',
        name: 'Beauty & Wellness',
        icon: "lipstick",
        categories: [
            {
                id: '35',
                name: 'Spa & Massage',
                icon: 'spa',
            },
            {
                id: '36',
                name: 'Salon Services',
                icon: 'hair-dryer',
            },
            {
                id: '37',
                name: 'Skin Care Products',
                icon: 'bottle-tonic-plus-outline',
            },
            {
                id: '38',
                name: 'Gym Memberships',
                icon: 'weight-lifter',
            }
        ],
    },
    {
        id: 'childcare',
        name: 'Childcare & Babysitting',
        icon: "baby-carriage",
        categories: [
            {
                id: '39',
                name: 'Nursery & Pre-School',
                icon: 'baby-face-outline',
            },
            {
                id: '40',
                name: 'Babysitting',
                icon: 'human-child',
            },
            {
                id: '41',
                name: 'Child Support',
                icon: 'wallet-giftcard',
            },
            {
                id: '42',
                name: 'Toys & Games',
                icon: 'toy-brick',
            }
        ],
    },
];


export const INCOME_CATEGORY_GROUPS: CategoryGroup[] = [
    {
        id: 'employment',
        name: 'Employment Income',
        icon: MdWork,
        categories: [
            {
                id: '1',
                name: "Salary",
                icon: MdAttachMoney,
            },
            {
                id: '2',
                name: 'Wages',
                icon: 'cash-multiple',
            }
        ],
    },
    {
        id: 'business',
        name: 'Business Income',
        icon: "store",
        categories: [
            {
                id: '3',
                name: 'Business Profits',
                icon: 'cart-plus',
            },
            {
                id: '4',
                name: 'Trade Earnings',
                icon: 'account-cash',
            }
        ]
    },
    {
        id: 'investments',
        name: 'Investment Income',
        icon: "chart-line",
        categories: [
            {
                id: '5',
                name: 'Halal Investments',
                icon: 'bank',
            },
            {
                id: '6',
                name: 'Rental Income',
                icon: 'home-city',
            }
        ],
    },
    {
        id: 'miscellaneous',
        name: 'Miscellaneous Income',
        icon: "plus-circle-outline",
        categories: [
            {
                id: '7',
                name: 'Gifts',
                icon: 'gift-outline',
            },
            {
                id: '8',
                name: 'Inheritance',
                icon: 'account-cash',
            }
        ],
    }
];

export const DEBT_CATEGORY_GROUPS: CategoryGroup[] = [
    {
        id: 'loans',
        name: 'Loans',
        icon: MdAccountBalance,
        categories: [
            {
                id: '1',
                name: "Mortgage",
                icon: MdHomeWork,
            },
            {
                id: '2',
                name: 'Personal Loan',
                icon: MdVolunteerActivism,
            },
            {
                id: '3',
                name: 'Auto Loan',
                icon: AiFillCar,
            },
            {
                id: '4',
                name: 'Student Loan',
                icon: MdSchool,
            }
        ],
    },
    {
        id: 'credit_cards',
        name: 'Credit Cards',
        icon: MdCreditCard,
        categories: [
            {
                id: '5',
                name: 'Visa',
                icon: RiVisaFill,
            },
            {
                id: '6',
                name: 'MasterCard',
                icon: FaCcMastercard,
            },
            {
                id: '7',
                name: 'American Express',
                icon: SiAmericanexpress,
            },
            {
                id: '8',
                name: 'Discover',
                icon: AiOutlineScan,
            }
        ],
    },
    {
        id: 'bills',
        name: 'Bills',
        icon: "receipt",
        categories: [
            {
                id: '9',
                name: 'Utility Bills',
                icon: 'flash',
            },
            {
                id: '10',
                name: 'Mobile Bills',
                icon: 'cellphone',
            },
            {
                id: '11',
                name: 'Subscription Services',
                icon: 'youtube-subscription',
            },
            {
                id: '12',
                name: 'Other Bills',
                icon: 'file-document-outline',
            }
        ],
    }
];