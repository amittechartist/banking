import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })
  console.log("accounts",accounts);
  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title="My Bank Accounts"
          subtext='Effortlessly manage your bank account activities.'
        />
        <div className='space-y-6'>
          <h2 className='header-2'>
            Your cards
          </h2>
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts?.data?.map((a: Account) => (
              <BankCard
                key={a?.id}
                account={a}
                userName={`${loggedIn?.firstName} ${loggedIn?.lastName}`}
                showBalance={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks
