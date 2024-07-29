

import './App.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { MainContainer } from './hoc/main'
import MainRoute from './routes'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './config/firebase.config'
import { useEffect } from 'react'
import { BASE_URL_DEVELOP } from './config/baseURL'
function App() {
    useEffect(() => {
        firebase.initializeApp(firebaseConfig)
    }, [])
    return (
        <Provider store={store}>
            <MainContainer>
                <MainRoute />
            </MainContainer>
        </Provider>
    )
}

export default App
