#! /usr/local/bin/sh


# Check if the user provided exactly one argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <newString>"
    exit 1
fi

# Assign the argument to a variable
newString=$1

# Define the old string to be replaced
oldString="express-typescript-template"  # Replace with the actual old string

# Perform the find and replace operation
if [[ $(uname) == "Darwin" ]]; then
    find . -maxdepth 1 -type f -exec sed -i '' -e "s|${oldString}|${newString}|g" {} +
elif [[ $(uname) == "Linux" ]]; then
    find . -maxdepth 1 -type f -exec sed -i -e "s|${oldString}|${newString}|g" {} +
else
    echo "Only Linux or Darwin (Mac) supported... exiting"
fi

rm ./rename_project.sh

