const {MongoClient} = require('mongodb');
const db_name       = process.env.DB_NAME || "FaceStylizerDB";
const mongoUrl      = process.env.MONGO_URL || "mongodb://root:password@localhost:27017";

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(db_name);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a doc into collection', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', username: 'johndoe', password: 'password'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });
});


describe('post/auth', () => {
    let connection;
    let db

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(db_name);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should post new user if non existing', async () => {
        const users = db.collection('users');

        const newUser = {username: 'someemailtotest@gmail.com'};
        await users.insertOne(newUser);
        const insertedUser = await users.findOne({username: 'someemailtotest@gmail.com'});
        expect(insertedUser).toEqual(newUser);
    });


    it('if existing in db check if so', async () => {
        const users = db.collection('users')
        const emailtotest = "someemailtotest@gmail.com"
        const userFromDb = await users.findOne({username: emailtotest });
        expect(userFromDb).toBeDefined();
        expect(userFromDb.username).toEqual(emailtotest);

    });
});