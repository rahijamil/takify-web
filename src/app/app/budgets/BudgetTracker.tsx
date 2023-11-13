import { useState } from "react";

const BudgetTracker = () => {
    const [budgets, setBudgets] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const { user } = useAuth();

    // useEffect(() => {
    //     setLoading(true);
    //     const fetchBudgets = async () => {
    //         if (user?.id) {
    //             const { data, error } = await supabase.from("budgets").select("*").eq("profile_id", user.id);

    //             if (error) {
    //                 console.error(`Error fetching budgets: ${error.message}`);
    //             }

    //             setBudgets(data as Budget[]);
    //             setLoading(false);
    //         }
    //     };

    //     fetchBudgets();
    // }, []);

    return (
        <div style={styles.budgetContainer}>
            <p style={styles.sectionTitle}>Budget Tracking</p>
            {loading ? (
                <>
                    <BudgetSkeleton />
                    <BudgetSkeleton />
                </>
            ) : (
                budgets.map((budget) => (
                    <Card key={budget.id} style={styles.budgetCard}>
                        <p style={styles.budgetCategory}>{budget.category?.name}</p>
                        <Progress.Bar
                            progress={budget.spent / budget.budget}
                            width={null}
                            color={Colors.accent}
                            unfilledColor={Colors.lightGrey}
                            borderWidth={0}
                            borderRadius={5}
                        />
                        <p style={styles.budgetAmount}>${budget.spent} of ${budget.budget}</p>
                    </Card>
                ))
            )}
        </div>
    );
};