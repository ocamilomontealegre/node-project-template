#!/bin/bash

update_json_field() {
  field=$1
  new_value=$2

  node -e "
  const { readFileSync, writeFileSync } = require('node:fs');
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

  packageJson.$field = '$new_value';

  writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  console.log('$field updated to:', packageJson.$field);
  "
}

update_pkg() {
  echo "Select one of the following options to update in package.json"
  echo "1) Project name"
  echo "2) Version"
  echo "3) Description"
  echo "4) Exit"

  read -r -p "Enter your choise [1-4]: " choice

  if [ "$choice" != "1" ] && [ "$choice" != "2" ] && [ "$choice" != "3" ] && [ "$choice" != "4" ]; then
    echo "Invalid choice! Please select 1, 2, 3, or 4"
    echo "Exiting. No changes were made"
    exit 0
  fi

  if [ "$choice" -eq 1 ]; then
    read -r -p "Enter new project name: " name
    name=${name:-"node_project_template"}
    update_json_field "name" "$name"
  fi

  if [ "$choice" -eq 2 ]; then
    read -r -p "Enter new project version: " version
    version=${version:-"1.0.0"}
    update_json_field "version" "$version"
  fi

  if [ "$choice" -eq 3 ]; then
    read -r -p "Enter new project description: " description
    description=${description:-"Typescript & Express template"}
    update_json_field "description" "$description"
  fi

  if [ "$choice" -eq 4 ]; then
    echo "Exiting. No changes were made"
    exit 0
  fi
}

update_pkg
