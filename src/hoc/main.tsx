

import { BrowserRouter } from 'react-router-dom'
import { BaseTheme } from './theme'

export const MainContainer = (props: any) => {
    return (
        <BrowserRouter>
            <BaseTheme>{props.children}</BaseTheme>
        </BrowserRouter>
    )
}
