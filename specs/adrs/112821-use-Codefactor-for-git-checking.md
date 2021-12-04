# Use Codefactor for git review

## Context and Problem Statement
We need a tool to check the quality of the code for this project for every commit. It shall track new 
and fixed issues for every commit and pull request. An effective code review prevents bugs and errors
from getting into the project by improving code quality at an early stage of the software development process.

## Decision Drivers
* Easy to use
* Does not impact the workflow
* works easy with Github

## Considered Options
* CodeFactor
* sonarQube

## Decision Outcome
Chosen option 1: Because it is easier to user and it is free(important). It create and track 
issues or comments directly from code file or project issues pages. CodeFactor will update status for GitHub  Pull Requests as well.
It also integrates with Slack to send code quality notifications for every commit in branch or pull request.