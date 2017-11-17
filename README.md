# Pyro Components

A big repo containing all of the components for pyro apps.

## Install

```
yarn add pyro-components
```

All components must be wrapped in a firebase provider (at the top level).

This is how they access firebase.

## Components

### Firebase Provider
```js
import React from 'react'
import YourApp from './your-app
import { FirebaseProvider } from 'pyro-components'
const firebaseApp = firebase.initializeApp()

const AppWithFirebase = () => (
    <FirebaseProvider {...{
        firebaseApp
    }}>
        <YourApp />
    </FirebaseProvider>
)
```

### Logout Button

TODO

### Notification Center

TODO

### Auth

```js
import React from 'react'
import { Auth } from 'pyro-components'

// login
const Login = () => (
    <Auth {...{
        isSignUp: false,
        onFail: reason => {
            // reason is an error code from: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
        },
        onSuccess: user => {
            // user is a https://firebase.google.com/docs/reference/js/firebase.User
        }
    }} />
)

// signup
const Signup = () => (
    <Auth {...{
        isSignUp: false,
        onFail: reason => {
            // reason is an error code from: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
        },
        onSuccess: user => {
            // user is a https://firebase.google.com/docs/reference/js/firebase.User
        }
    }} />

)
```

## License

TBD