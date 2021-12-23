## README

### Resources

RedwoodJS tutorial: https://learn.redwoodjs.com/docs/tutorial/welcome-to-redwood/

RedwoodJS documentation: https://redwoodjs.com/docs/introduction

Prisma documentation: https://www.prisma.io/docs/

Tailwind CSS: https://tailwindcss.com/

SVG Icons: https://heroicons.com/

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

#### Run migrations

Run the migrate command. This will create a sqlite database and create the database tables from our `./api/db/schema.prisma` file. This command can be used to create new migrations and create tables too.

```terminal
yarn rw prisma migrate dev
```

#### Run the application.

```terminal
yarn rw dev
```

Go to http://localhost:8910/dashboard to see the application.

#### Demo Companies and Seed data

When you ran your migrate command above, the ./scripts/seed.js file was ran and populated the Feedback table with sample data.

You can see this on the feedback page of the app.
![image](https://user-images.githubusercontent.com/70818495/111852816-cd20b980-88ee-11eb-8292-29420aadc116.png)

## Tasks

After the running the application, you should see 4 sample feedback items listed on the /feedback page. There is also a /dashboard page.

Your task is to expand the functionality of this application with typical operations a user would expect. This involves creating new items from a form, deleting existing items, updating a feedback item.

Complete the following user stories of the application below, taking care for UI/UX design, accounting for errors the user may make, and implementing good quality code that is maintainable.

**User Stories**

- As a user, I should be able to click on a feedback item from the list view and view a detail page of that feedback item located at url similar to `/feedback/{id}/detail`
- As a user, I can create a new feedback item by clicking the "Add insight" via a form. This page should be located at `/feedback/new`. This feedback should be saved to the database and visible on the feedback list page.
- As a user, I can click the edit button and update an existing feedback item via a form.
- As a user, I can delete a feedback item. A button or icon should take me to `/feedback/{id}/delete/` which will ask for my confirmation if I want to delete the item. After confirming, I should be taken back to the feedback list where I can see the item has been removed.

**Bonus items**
- Create a User model and associate feedback items with a user. A user foreign key field should exist on the Feedback model.
- Update the existing forms to show a dropdown of users, and allow creating a feedback item assigned to a user.
- Create a contacts page with a list of users and the number of feedback items that they have given.
- Update seed data script. The script should create a sample of users, with their associated feedback too.

The following models should be present in your application:

- Feedback model
- User model
