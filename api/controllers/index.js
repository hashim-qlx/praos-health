const EUR = 1.03;

export default (database) => {
    return {
        getSumBalance: async (req, res, next) => {
            try {
                const name = req.query.user;
                const user = await database.getUser(name);
                const accounts = await database.getAccounts(user.id);

                const sum = accounts.reduce((sum, account) => {
                    if (account.currency === 'EUR') {
                        sum.eur += account.balance;
                    } else {
                        sum.usd += account.balance;
                    }

                    return sum;
                }, { eur: 0, usd: 0 });

                sum.usd = sum.usd * EUR;
                res.status(200).json({
                    total: sum.usd + sum.eur,
                    name: user.name
                });
            } catch (error) {
                if (error.message === 'USER_NOT_FOUND') {
                    return res.status(404).send(error.message)
                } else {
                    next(error);
                }
            }
        }
    }
}
