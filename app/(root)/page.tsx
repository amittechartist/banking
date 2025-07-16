import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccounts } from '@/lib/actions/bank.actions'
import { getBank, getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const loggedIn = await getLoggedInUser();

    const accounts = await getAccounts({
        userId: loggedIn?.userId
    });

    if (!accounts) return;

    const accountsData = accounts?.data;
    const appWriteItemsId = (id as string) || accountsData?.[0]?.appWriteItemId;

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
            </div>
            {/* Right Sidebar */}
            <RightSidebar
                banks={accountsData?.slice(0, 2) || []}
                user={loggedIn}
                transactions={accounts?.transactions || []}
            />
        </section>
    )
}

export default Home
