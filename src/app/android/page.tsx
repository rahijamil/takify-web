import React from 'react'
import HomeHeader from '../HomeHeader'
import HomeFooter from '../HomeFooter.tsx'
import Image from 'next/image'
import Button from '@/components/Button'
import { MdArrowForward } from 'react-icons/md'

export default function Android() {
    return (
        <main>
            <HomeHeader />

            <section>
                <div className="wrapper max-w-5xl flex gap-8 min-h-[90vh] py-10">
                    <div className="flex items-center justify-center flex-1">
                        <div className="w-full space-y-4">
                            <h2 className="text-5xl font-bold">
                                Track on the go <br /> with the Takify app
                            </h2>

                            <p className="text-xl font-medium">
                                Seamlessly transition from laptop to phone.
                            </p>

                            <div className="flex items-center">
                                <Button
                                    href="https://expo.dev/@mohammadrahi/takify"
                                    target='_blank'
                                >
                                    <span>Expo</span>
                                    <MdArrowForward />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-[320px] aspect-[1/2.1] overflow-hidden rounded-3xl relative">
                            <Image
                                src="/assets/images/takify_mobile_home.png"
                                alt="Takify Mobile Home"
                                fill
                                objectFit="cover"
                            />
                        </div>
                    </div>

                </div>
            </section>

            <HomeFooter />
        </main>
    )
}
