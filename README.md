


![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# Server Side Calculator

## Description

_Duration: 2 Day Sprint_

Server Side Calculator helps the user do simple math from anywhere in the world. Users can do addition, subtraction, multiplication and division. Simply use your keyboard or the provided user interface to enter 2 numbers (can be decimal, at the current state of the program it's not possible to start a number with . ie .45 would need to be 0.45) and 1 operator ONLY. So input format would be [number][operator][number], ie 5.6+7.99. The user will then have to click the [=] button to get the result. The result will be displayed below the numeric buttons, and a list of previous calculations will be appended as more calculations are performed. The most recent calculation equation will be append to the bottom of the list.
The input box can be cleared of its content by clicking the [C] button.


## Screen Shot

![Screenshot](images/noInputUI.jpg)
Server Side Calculator.

![Screenshot](images/withInputUI.jpg)
Server Side Calculator with inputs.


### Prerequisites

Link to software that is required to develop this website.

- [javascript](https://www.javascript.com/)
- [css]
- [html]
- [jquery]
- [git](https://git-scm.com/)
- [github](https://github.com/)

## Installation


1. Go to https://github.com/tormodsletteboe/weekend-jquery-server-calculator
2. Fork that repo into your own github account.
3. Copy the ssh address
4. In your terminal navigate to a folder you want to clone into.
5. Run `git clone [ssh address]` in your terminal
6. cd into the cloned folder and run `code .` in your terminal to open the project in vscode.
7. Make sure express and body-parser is installed. To do so in your terminal run 'npm install'. Npm will look at your dependecies and install needed libraries. If this does not work try 'npm install express' and npm install body-parser'.
8. To start the server run 'node server/server.js' in termial, or if npm init -y was run, the user can add a start in the script

## Usage


1. Type in first name, last name, ID, title and annual salary.
2. Click the submit button.
3. An Employee will then be added to the table and a Total Monthly Cost will be calculated.
4. User can add more employees to the table by filling in the inputs and clicking submit again.
5. A new employee will then be added to the table and a Total Monthly Cost will be calculated.
6. If Total Monthly Cost exceeds $20,000 USD, that labels background color will change to red.
7. To get the Total Monthly Cost below $20,000 USD, an employee or multiple employees have to be deleted from the table.
8. Simply click the delete button of the employee to remove. That employee will be removed from the table and a new Total Monthly Cost will be calculated. If the new Total Monthly Cost drops below $20,000 USD the background color will change back to white.


## Built With

javascript, css, html, jquery, git and github.com


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Edan Schwartz, Liz Kerber, Daniel Legan, Tia Theisen and Alina Trukhina)

## Support
If you have suggestions or issues, please email me at [tormod.slettebo@gmail.com]

