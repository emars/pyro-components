# Pyro Components

A big repo containing all of the components for pyro apps.

## Components

### Auth

```js
import { Auth } from 'pyro-auth'

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