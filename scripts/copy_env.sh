#!/bin/bash

copy_env() {
  source_file="../.env.example"
  destination_file="../.env"


  touch "$destination_file"
  if [ $? -eq 0 ]; then
    echo "Successfully created $destination_file"
  else
    echo "Failed to create file"
    exit 1
  fi


  cp "$source_file" "$destination_file"
  if [ $? -eq 0 ]; then
    echo "Successfully copied content from $source_file"
  else
    echo "Failed to copy content"
    exit 1
  fi
}

copy_env
