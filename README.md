# README

### Resources

RedwoodJS tutorial: https://learn.redwoodjs.com/docs/tutorial/welcome-to-redwood/
RedwoodJS documentation: https://redwoodjs.com/docs/introduction
Prisma documentation: https://www.prisma.io/docs/

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Run migrations

Make sure you have updated your `.env` file with the DB and firebase credentials.

```terminal
yarn run prisma migrate dev --preview-feature --schema ./api/db/schema.prisma
```

### Fire it up

```terminal
yarn rw dev --fwd="--disable-host-check=true"
```

A `.env` file is required to be created with proper credentials for the app to work.

#### Demo Companies and Seed data

The `yarn rw db seed` command can be run to create some demo companies, with associated stories, insights, and contacts. The password for admins and contacts created `Pwd$123`.

This is what the page should look like after seeding:
![image](https://user-images.githubusercontent.com/70818495/111852816-cd20b980-88ee-11eb-8292-29420aadc116.png)

### Setting up a host domain

On windows, you should be able to access the admin app via `http://app.uservitals.local:8910/` or your local host http://0.0.0.0:8910/

#### Preview migrate commands

Run the new migrate command with `yarn run prisma migrate dev --preview-feature --schema ./api/db/schema.prisma`

More info on Prisma preview migrate - https://www.prisma.io/docs/concepts/components/prisma-migrate

### Requirements

The insights page should show a list of all the feedback, with the ability to click into the article. The following views/functionality are ideal:

- List view of feedback
- Add feedback with a form (text, user, date created)
- Feedback should presist using a database to store them
- Contacts page with a list of users and the number of insights that they have given

The following models should be present in your application:

- Feedback model
- User model
- story? team?

Bonus items:

- Edit existing feedback(Such as text, user, date)
- Update seed data with the new models that are added
