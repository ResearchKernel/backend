Research Kernel Backend REST API
==================================

---

## Introduction

This section comprises of the core heart of the ResearchKernel i.e our backend.

### What Database are we using?

We are using three Databases, serving different functionality for our product. Following is the explanation of why those database is necessary for us.

| Database      | Database Type | Purpose                                                                                                                                                                                                                                                               |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ElasticSearch | NoSQL         | We store all the metadata of research papers into the ElasticSearch and we also use this for our Search Engine. This is our core database where all the information of research papers (Title, Abstract, authors,...etc) are stored and served to the website.        |
| Neo4j         | Graph         | We are building the Knowledge Graph of research papers we have in ElasticSearch, this database also stores our recommendation system result. Our short term goal is to combine our Knowledge graph and ElasticSearch that will make our search research more relevant |
| MySQL         | SQL           | We are planing to provide personalised recommendations and notifications, we are storing all the user data into our MySQL database as of now. [See Sequelize Docs](http://docs.sequelizejs.com/)                                                                      |


## What you should know to get started ?

As we are using node.js for our backend development so proficiency in node.js is a must. We are using three database, we do have diverse tasks and features to implement, you should know at least one database before-hand. 

## What are we focusing on right now ?

We are more focused on building ElasticSearch and MySQL REST APIs as those databases contains the soul of our product. Neo4j is our second priority as we are not actively working on our graph database.


## How to access the database for developing REST APIs?

We share database credentials to our committers only. Below is a small chunk of our all production database dumps and collaborators can use those to build APIs or suggested features. 

MySQL, ElasticSearch, Neo4j

---
## Project Structure 

To be added.

## Github Branch Structure  

We have three main branches, and temporary feature branches with short lifespan. 

| Branch      | Purpose                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Master      | This is the branch we will use in production servers                                                              |
| Staging     | This is a backup branch for Master and for testing production code.                                               |
| Development | This is the branch where all the feature branches will merge.                                                     |
| Features    | These branches are for developing new feature that will be integrated to our product, and have a short life span. |


## Guidelines for Collaborators 

1. Select task on Trello 
2. Inform to your committer and they will assign you the task on Trello  
3. Create a feature branch from development.
4. Push a PR to development.


Need help @Tushar Mudgal

This is a straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

---

Getting Started
---------------
```sh
# clone it
git clone https://github.com/ResearchKernel/backend.git
cd backend

# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```
# Setup MySQL on your local machine
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04)
- [Mac](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/osx-installation-pkg.html)
- [Windows](https://dev.mysql.com/downloads/windows/installer/)
- Start MySQL server on your local machine.
    - For Mac: ``mysql.server start``
    - For Other OS: see appropriate commands.
- Now create development database using following commands.
    - Open MySQL from CLI (Run command ``mysql``).
    - ``CREATE DATABASE researchkernel_development``.
- Now open the project in any editor (I prefer VSCode ;)
    - Create a new file ``.env`` in project's root.
    - Copy contents of ``.env.example`` into ``.env``.
    - Edit database config in ``.env`` according to your MySQL config.
    - Start the node server again.
    - **You're good to go.**

License
-------

MIT
