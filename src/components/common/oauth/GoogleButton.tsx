// GoogleSignInButton.tsx
import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Button } from '@mantine/core'
import { authenticateUserUsingGoogle } from '../../../store/modules/auth/actions'
import { useDispatch } from 'react-redux'
import { BrandGoogle } from 'tabler-icons-react'
export const GoogleSignInButton = () => {
    const dispatch: any = useDispatch()

    const handleGoogleSignIn = async () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()

        try {
            const result: any = await signInWithPopup(auth, provider)

            if (result._tokenResponse?.oauthIdToken) {
                dispatch(
                    authenticateUserUsingGoogle(
                        result._tokenResponse?.oauthIdToken,
                    ),
                )
            } else {
                throw new Error('Authentication failed')
            }
        } catch (error: any) {
            console.error('Google Sign-In Error:', error.message)
        }
    }

    return (
        <Button
            onClick={handleGoogleSignIn}
            size={'lg'}
            className={'w-full'}
            name={'google-btn'}
            leftSection={<BrandGoogle color={'white'} />}
        >
            Sign in with Google
        </Button>
    )
}
