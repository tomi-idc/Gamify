const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// MARK Firebase

const admin = require("firebase-admin");
let serviceAccount = require("./gamify-21595-firebase-adminsdk-jmaaa-63120ccbde.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gamify-21595.firebaseio.com"
});

let db = admin.firestore();

// MARK custom properties

const ActivityType = Object.freeze({
    "register": 0,
    "login": 1,
    "logout": 2,
    "cart": 3,
    "wishlist": 4,
    "checkout": 5,
    "removeFromCart": 6,
    "removeFromWishlist": 7
})

// MARK App use

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// MARK cors

const cors = require('cors');
let allowedOrigins = ['http://localhost:5000',
    'http://yourapp.com'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }, credentials: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MARK Cookie wrapper functions

function requestWithCookie(req, res, onSuccess) {
    requestCookie(req, res, false, onSuccess)
}

function requestCookie(req, res, adminOnly, onSuccess) {
    if (process.env.NODE_ENV == 'test') {
        let isAdmin = req.params.is_admin === "true"
        callFunctionAfterCookieReceived(req, res, isAdmin, adminOnly, onSuccess)
        return
    }
    const sessionCookie = req.cookies.session || '';
    admin.auth().verifySessionCookie(
        sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            let isAdmin = decodedClaims.admin === true
            callFunctionAfterCookieReceived(req, res, isAdmin, adminOnly, onSuccess)
        })
        .catch(error => {
            // Session cookie is unavailable or invalid. Force user to login.
            res.status(403).send({ message: "Not signed in", result: "fail" })
        });
}

function callFunctionAfterCookieReceived(req, res, isAdmin, adminOnly, onSuccess) {
    if (adminOnly == true && isAdmin == false) {
        res.status(403).send({ message: "Not authorized", result: "fail" })
         return
    }
    if (onSuccess) {
        req.params.is_admin = isAdmin
        onSuccess(req, res)
    }
}

// MARK app paths


// Auth
app.post('/api/sign_in', async (req, res) => {
    signIn(req, res)
})

app.post('/api/token', async (req, res) => {
    getToken(req, res)
})

app.post('/api/sign_out', async (req, res) => {
    signOut(req, res)
})

app.post('/api/create_user', async (req, res) => {
    createUser(req, res)
})

app.get('/api/verify_cookie', async (req, res) => {
    requestWithCookie(req, res, null)
})


// Individual items
app.get('/api/user/:id', async (req, res) => {
    requestWithCookie(req, res, getUser)
})

app.get('/api/game/:id', async (req, res) => {
    requestWithCookie(req, res, getGame)
})


// General lists GET commands
app.get('/api/get_games', async (req, res) => {
    requestWithCookie(req, res, getGames)
})

app.get('/api/get_category/:categoryId', async (req, res) => {
    requestWithCookie(req, res, getCategory)
})

app.get('/api/search/:encodedText', async (req, res) => {
    requestWithCookie(req, res, search)
})


// Cart-related APIs
app.get('/api/get_cart/:uid', async (req, res) => {
    requestWithCookie(req, res, getCart)
})

app.post('/api/buy_products', async (req, res) => {
    requestWithCookie(req, res, buyProducts)
})

app.put('/api/add_to_cart/:userId/:itemId', async (req, res) => {
    requestWithCookie(req, res, addToCart)
})

app.put('/api/decrement_from_cart/:userId/:itemId', async (req, res) => {
    requestWithCookie(req, res, decrementFromCart)
})

app.delete('/api/remove_from_cart/:userId/:itemId', async (req, res) => {
    requestWithCookie(req, res, removeFromCart)
})


// Wishlist-related APIs
app.get('/api/get_wishlist/:uid', async (req, res) => {
    requestWithCookie(req, res, getWishlist)
})

app.put('/api/add_to_wishlist/:userId/:itemId', async (req, res) => {
    requestWithCookie(req, res, addToWishlist)
})

app.post('/api/remove_from_wishlist/:userId', async (req, res) => {
    requestWithCookie(req, res, removeFromWishlist)
})


// Admin only
app.get('/api/get_activities', async (req, res) => {
    requestCookie(req, res, true, getActivities)
})

app.get('/api/get_activities/:is_admin', async (req, res) => {
    requestCookie(req, res, true, getActivities)
})

// MARK server implementation functions

function getToken(req, res) {
    // In test environment, no cookies support, skip sign in and call result
    if (process.env.NODE_ENV == 'test') {
        getTokenWithUser(req, res)
        return
    }
    admin.auth().verifyIdToken(req.body.idToken).then((decoded) => {
        admin.auth().getUser(decoded.uid).then((userRecord) => {
            getTokenWithUser(req, res)
        }).catch((err) => {
            res.status(401).send({ message: "Unauthorized request", result: "fail" })
        })
    })
}

function getTokenWithUser(req, res) {
    const expiresIn = 60 * 24 * 14 * 60 * 1000
    if (process.env.NODE_ENV != 'test') {
        let options = { maxAge: expiresIn, httpOnly: false, secure: !req.get('origin').includes('localhost') }
        res.cookie("csrfToken", (Math.random() * 100000000000000000).toString(), options)
    }
    res.send({ result: "ok" })
}

function signIn(req, res) {
    const expiresIn = (req.body.rememberMe ? 60 * 24 * 14 : 5) * 60 * 1000;
    // In test environment, no cookies support, skip sign in and call result
    if (process.env.NODE_ENV == 'test') {
        signInWithSessionCookie(req, res, expiresIn, "TEST_COOKIE")
        return
    }
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
    if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
        res.status(401).send({ message: "Unauthorized request", result: "fail" })
        return
    }
    // Set session expiration to 14 days or 5 minutes.
    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            signInWithSessionCookie(req, res, expiresIn, sessionCookie)
        }, _ => {
            res.status(401).send('UNAUTHORIZED REQUEST!');
        });
}

function signInWithSessionCookie(req, res, expiresIn, sessionCookie) {
    // Set cookie policy for session cookie.
    logActivity(req.body.id, null, ActivityType.login)
    if (process.env.NODE_ENV != 'test') {
        const options = { maxAge: expiresIn, httpOnly: false, secure: !req.get('origin').includes('localhost') };
        res.cookie('session', sessionCookie, options);
    }
    res.send({ result: 'ok' });
}

function signOut(req, res) {
    logActivity(req.body.id, null, ActivityType.logout)
    if (process.env.NODE_ENV != 'test') {
        res.clearCookie('session')
    }
    res.send({ result: "ok" })
}

function getUser(req, res) {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(500).send({ message: "User ID is required", result: "fail" })
        }
        db.collection('users').doc(userId).get().then(user => {
            if (!user.exists) {
                res.status(500).send({ message: "User doesn't exist.", result: "fail" })
            }
            db.collection('users/' + userId + '/cart_games').get().then(snapshot => {
                let cartGamesCount = 0
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        cartGamesCount += doc.data().count
                    })
                }
                res.json({
                    user: {
                        id: user.id,
                        is_admin: req.params.is_admin,
                        cart_games: cartGamesCount,
                        ...user.data()
                    }, result: "ok"
                })
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

function getGame(req, res) {
    try {
        const gameId = req.params.id;
        if (!gameId) {
            res.status(500).send("Game ID is required")
        }
        db.collection('games').doc(gameId).get().then(game => {
            if (!game.exists) {
                res.status(404).send({ message: "Game doesn't exist.", result: "fail" })
                return
            }
            res.send({
                item: {
                    id: game.id,
                    ...game.data()
                }, result: "ok"
            });
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

function createUser(req, res) {
    const expiresIn = (req.body.rememberMe ? 60 * 24 * 14 : 5) * 60 * 1000;
    if (process.env.NODE_ENV == 'test') {
        createUserWithSessionCookie(req, res, expiresIn, "TEST_COOKIE")
        return
    }
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
    if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
        res.status(401).send({ message: "Unauthorized request", result: "fail" })
        return
    }
    // Set session expiration to 14 days or 5 minutes.
    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            createUserWithSessionCookie(req, res, expiresIn, sessionCookie);
        }, _ => {
            res.status(401).send('UNAUTHORIZED REQUEST!');
        });
}

function createUserWithSessionCookie(req, res, expiresIn, sessionCookie) {
    // Set cookie policy for session cookie.
    if (process.env.NODE_ENV != 'test') {
        const options = { maxAge: expiresIn, httpOnly: false, secure: !req.get('origin').includes('localhost') };
        res.cookie('session', sessionCookie, options);
    }
    db.collection('users')
        .doc(req.body.id).set({ email: req.body.email, purchased_games: {}, saved_games: {} })
        .then(createdUserRef => {
            logActivity(req.body.id, null, ActivityType.register)
            res.send({ result: "ok" });
        })
}

function getGames(req, res) {
    getGamesForCategory(req, res, "HTwHVEhKW7ksac7CqEAG")
}

function getGamesForCategory(req, res, categoryId) {
    db.collection('categories').doc(categoryId).get().then(doc => {
        let gameRefs = []
        if (!doc.exists) {
            res.status(500).send({ message: "Category not found", result: "fail" })
            return
        }
        doc.data().games.forEach(gameId => {
            gameRefs.push(db.doc("games/" + gameId))
        })
        if (gameRefs.length == 0) {
            res.send({ items: [], result: "ok" })
            return
        }
        db.getAll(...gameRefs).then(docs => {
            let gameDetails = docs.map(gameDoc => {
                return { id: gameDoc.id, ...gameDoc.data() }
            });
            res.send({ items: sortGamesByName(gameDetails), result: "ok" })
        })
    })
}

function sortGamesByName(gamesList) {
    return gamesList.sort((firstGame, secondGame) => (firstGame.name > secondGame.name) ? 1 : -1)
}

function getCart(req, res) {
    db.collection('users/' + req.params.uid + '/cart_games').get().then(snapshot => {
        if (snapshot.empty) {
            res.send({ items: [], result: "ok" })
            return
        }
        let items = []
        snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() })
        })
        let cartGameIds = items.map(item => db.doc("games/" + item.id));
        db.getAll(...cartGameIds).then(docs => {
            let gameDetails = docs.map(gameDoc => gameDoc.data());
            for (let i = 0; i < gameDetails.length; i++) {
                gameDetails[i].quantity = items[i].count
                gameDetails[i].id = items[i].id
            }
            res.send({ items: sortGamesByName(gameDetails), result: "ok" })
        })
    })
}

function getWishlist(req, res) {
    db.collection('users').doc(req.params.uid).get().then(doc => {
        if (!doc.exists) {
            res.status(500).send({ id: req.params.uid, result: "fail" })
            return
        }
        let keysArr = Object.keys(doc.data()["saved_games"]);
        if (keysArr.length == 0) {
            res.send({ items: [], result: "ok" })
            return
        }
        let cartGameIds = keysArr.map(item => db.doc("games/" + item));
        db.getAll(...cartGameIds).then(docs => {
            let gameDetails = docs.map(gameDoc => {
                return { id: gameDoc.id, ...gameDoc.data() }
            });
            res.send({ items: sortGamesByName(gameDetails), result: "ok" })
        })
    })
}
function buyProducts(req, res) {
    db.collection('users').doc(req.body.user_id).get().then(doc => {
        if (!doc.exists) {
            res.status(500).send({ id: req.body.user_id, result: "fail" });
            return
        }
        let purchasedGames = doc.data()["purchased_games"];
        req.body.items.forEach(function (item) {
            let itemCount = purchasedGames[item.id];
            if (itemCount == null) {
                itemCount = 0
            }
            purchasedGames[item.id] = itemCount + item.quantity
        });
        logActivity(req.body.user_id, null, ActivityType.checkout)
        deleteCollection(db, "users/" + req.body.user_id + "/cart_games", 50).then(_ => {
            db.collection('users').doc(req.body.user_id).update({ purchased_games: purchasedGames }).then(_ => res.send({ result: "ok" }))
        })
    })
}

function addToCart(req, res) {
    if (!req.params.userId || !req.params.itemId) {
        res.status(500).send({ message: "Missing user or item ID", result: "fail" })
        return
    }
    db.collection('users/' + req.params.userId + '/cart_games')
        .doc(req.params.itemId).get().then(doc => {
            if (!doc.exists) {
                doc.ref.set({ count: 1 })
            } else {
                doc.ref.set({ count: doc.data().count + 1 })
            }
        }).then(_ => res.send({ result: "ok" }))
}

function decrementFromCart(req, res) {
    if (!req.params.userId || !req.params.itemId) {
        res.status(500).send({ message: "Missing user or item ID", result: "fail" })
        return
    }
    db.collection('users/' + req.params.userId + '/cart_games')
        .doc(req.params.itemId).get().then(doc => {
            if (doc.exists) {
                let count = doc.data().count
                if (count > 1) {
                    doc.ref.set({ count: count - 1 })
                }
            }
        }).then(_ => res.send({ result: "ok" }))
}

function removeFromCart(req, res) {
    if (!req.params.userId || !req.params.itemId) {
        res.status(500).send({ message: "Missing user or item ID", result: "fail" })
        return
    }
    db.collection('users/' + req.params.userId + '/cart_games')
        .doc(req.params.itemId).delete().then(_ => res.send({ result: "ok" }))
}

function addToWishlist(req, res) {
    db.collection('users').doc(req.params.userId).get().then(doc => {
        let savedGames = doc.data()["saved_games"];
        savedGames[req.params.itemId] = "";
        logActivity(req.params.userId, req.params.itemId, ActivityType.wishlist)
        db.collection('users').doc(req.params.userId).update({ saved_games: savedGames }).then(_ => res.send({ result: "ok" }))
    })
}

function getCategory(req, res) {
    getGamesForCategory(req, res, req.params.categoryId)
}

function search(req, res) {
    let encodedText = req.params.encodedText
    let searchText = decodeURIComponent(encodedText)
    let searchWords = searchText.toLowerCase().split(" ")
    let searchQuery = db.collection('games')
    searchWords.forEach(searchWord => {
        searchQuery = searchQuery.where('keywords.' + searchWord, '==', true)
    })
    searchQuery.get().then(snapshot => {
        if (snapshot.empty) {
            res.send({ items: [], result: "ok" })
            return
        }
        let items = []
        snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() })
        })
        res.send({ items: sortGamesByName(items), result: "ok" })
    })
}

function getActivities(req, res) {
    db.collection("activities").get().then(snapshot => {
        if (snapshot.empty) {
            res.send({ items: [], result: "ok" })
            return
        }
        let items = snapshot.docs.map(doc => {
            let obj = { id: doc.id, ...doc.data() }
            obj.date = obj.date.toDate()
            return obj
        })
        res.send({ items: items, result: "ok" })
    })
}

function removeFromWishlist(req, res) {
    if (!req.params.userId) {
        res.status(500).send({ message: "Missing user ID", result: "fail" })
        return
    }
    db.collection('users').doc(req.params.userId).get().then(doc => {
        if (!doc.exists) {
            res.status(500).send({ message: "User not found", result: "fail" })
            return
        }
        let savedGames = doc.data()["saved_games"];
        delete savedGames[req.body.id]
        logActivity(req.params.userId, req.body.id, ActivityType.removeFromWishlist)
        db.collection('users').doc(req.params.userId).update({ saved_games: savedGames }).then(_ => {
            res.send({ result: "ok" })
        })
    })
}

function logActivity(userId, gameId, activityType) {
    let userDoc = db.collection("users").doc(userId)
    userDoc.get().then(user => {
        db.collection("activities").add({
            date: admin.firestore.FieldValue.serverTimestamp(),
            game: gameId || '',
            type: activityType,
            user: user.id,
            email: user.data().email
        }).then(docRef => {
            userDoc.collection("activities").doc(docRef.id).set({});
        })
    })
}

// MARK Firebase utils

function deleteCollection(db, collectionPath, batchSize) {
    let collectionRef = db.collection(collectionPath);
    let query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                return 0;
            }

            // Delete documents in a batch
            let batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
            if (numDeleted === 0) {
                resolve();
                return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        })
        .catch(reject);
}


app.listen(process.env.PORT || 3000, () => console.log(`Express server listening on port ${process.env.PORT || 3000}!`));

module.exports = app;