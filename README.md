# Employee Monitoring Dashboard

Employee Monitoring Dashboard is a web app that allows employees to monitor registered employees in real-time using websockets(django channels).

The Employee Monitoring Dashboard app provides basic user login and registration functionality.

The app is divided into two parts: Server (Django) and Client (ReactJs)

By default, a table showing all employee details will be presented to the user upon successful login.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [django](https://www.djangoproject.com/), [MySQL](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/) and [nodejs](https://nodejs.org/en/).

## Cloning the repository

To clone from the repository:
```
git clone https://github.com/kaelfdl/employee-monitoring-dashboard.git
```

## Installing Employee Monitoring Dashboard

To install Employee Monitoring Dashboard, follow these steps:

For MacOS/linux:

Create a python virtual environment to install the dependencies.
```
cd /path/to/employee-monitoring-dashboard
python -m venv venv
source ./venv/bin/activate
```

Navigate to the root project directory and install the dependencies.
```
cd /path/to/employee-monitoring-dashboard
pip install -r requirements.txt
```

Then, navigate to the frontend directory and install the dependencies.
```
cd /path/to/employee-monitoring-dashboard/frontend
npm install
```
Configure an .env file to connect the django app to the MySQL server.
```
cd /path/to/employee-monitoring-dashboard
vim .env
```
Then, place the following variables in the .env file.
```
DATABASE_NAME=your_database_name
DATABASE_USER=user_name
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

## Using Employee Monitoring Dashboard

To use the web app, follow these steps:

Run the Django REST API server:
```
cd /path/to/employee-monitoring-dashboard
python manage.py runserver
```

On a new terminal,

Start the react server:
```
cd /path/to/employee-monitoring-dashboard/frontend
npm start
```

Then, on your browser, navigate to http://127.0.0.1:3000/

## User Actions

A user can signup by providing an email, a username, a password, a first and last name.

Upon successful signup, the user will automatically be logged in and presented with the dashboard.

An existing user  They will remain logged in unless they choose to logout. 

## Contact

If you want to contact me you can reach me at <gabryel.flordelis@gmail.com>

## License

This project uses the following license: [MIT License](https://github.com/kaelfdl/employee-monitoring-dashboard/blob/master/LICENSE).