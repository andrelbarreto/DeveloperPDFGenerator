# DeveloperPDFGenerator
Homework for NodeJS Module of Norhtwestern University Coding Bootcamp.

This repository contains files that use node js modules to obtain developer username on github, then proceeds to ask their favorite color. Using information contained on their github accounts, it generates a PDF file with links to their github account, LinkedIN, and several details as number of stars and followers.

![](DeveloperProfileCreator.gif)

Setup
Once logged in with GitHub account, clone the repo locally using link
   git clone https://github.com/andrelbarreto/DeveloperPDFGenerator.git 
   Also see: Cloning a repository.
   
Usage
  This application allows a user to generate a github profile in PDF format based on prompts and stored user inputs using the command-line.
  A project manager or developer lead can use the application to generate team profiles quickly for documentation that will go to stakeholders or department heads without having to navigate to external profiles provided by each team member. The user will also be able to choose a color that closest matches a project theme - developers may update colors for company/department branding palette or additional tailoring.

When the command line prompts are complete, pdf will save a DeveloperPDF_"color choosen".PDF file on local folder.

The generated template will include:

-Public repository name
-Number of followers
-Total GitHub stars
-GitHub follows count
-Location (link to Google maps)
-Blog (link to website)
-GitHub Profile (link to website)

Technologies
This project was built using:

Node.js
NPM
electron
