import HeaderBox from '@/components/HeaderBox'
import RecentTranstions from '@/components/RecentTranstions'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccounts } from '@/lib/actions/bank.actions'
import { getBank, getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn?.$id
    });

    if (!accounts) return;

    const accountsData = accounts?.data;
    const appWriteItemsId = (id as string) || accountsData[0].appwriteItemId;
    const account = await getBank({
        documentId: appWriteItemsId
    });

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type='greeting'
                        title='Welcome'
                        user={loggedIn?.name}
                        subtext='Access and manage your account and transactions efficiently.'
                    />
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance || 0}
                    />
                </header>
                {/* RECENT TRANSACTIONS */}
                <RecentTranstions
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appWriteItemsId}
                    page={currentPage}
                />
            </div>
            {/* Right Sidebar */}
            <RightSidebar
                banks={accountsData?.slice(0, 2)}
                user={loggedIn}
                transactions={account?.transactions}
            />
        </section>
    )
}

export default Home
