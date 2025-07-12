'use client'

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <p>
            <CountUp
                decimal=','
                decimals={2}
                prefix='$'
                end={amount}
            />
        </p>
    )
}

export default AnimatedCounter
